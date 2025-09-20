/* Service Worker - versão universal para Vercel (Cache First + Update)
   📌 Como funciona:
   - Na primeira vez: baixa todos os arquivos listados no PRECACHE (pode demorar um pouco).
   - Depois: abre instantâneo do cache.
   - Se adicionar novas páginas (ex: 81, 82…), aumente o número no Array.from
     e troque o CACHE_NAME (ex: 'app-v3' → 'app-v4') para forçar atualização. 
*/

const CACHE_NAME = 'app-v3';  // ⬅️ Troque a versão sempre que adicionar/editar arquivos
const OFFLINE_URL = '/offline.html';

// Lista de arquivos a serem baixados logo na instalação
const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  // ⬅️ Aqui estão todas as páginas (1 até 80).
  // Se adicionar mais, só mudar o número 80 → 100, por exemplo.
  ...Array.from({ length: 80 }, (_, i) => `/app/assets/pages/${i + 1}.svg`)
];

// Instalação: baixa e guarda tudo do PRECACHE
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativação: remove caches antigos e ativa o novo imediatamente
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

// Intercepta todas as requisições GET
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    if (cached) {
      // ⚡ Entrega rápido do cache
      // 🔄 Atualiza em segundo plano se tiver internet
      fetch(req).then((fresh) => {
        if (
          fresh &&
          fresh.ok &&
          fresh.status === 200 &&
          !req.url.startsWith('chrome-extension://') &&
          fresh.type !== 'opaqueredirect' // evita cache de respostas parciais
        ) {
          cache.put(req, fresh.clone());
        }
      }).catch(() => { /* ignora erros de rede */ });

      return cached;
    }

    try {
      // Se não tiver no cache → busca online
      const fresh = await fetch(req);
      if (
        fresh &&
        fresh.ok &&
        fresh.status === 200 &&
        !req.url.startsWith('chrome-extension://') &&
        fresh.type !== 'opaqueredirect'
      ) {
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (e) {
      // Se falhar (offline), entrega a página offline
      if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        const offline = await caches.match(OFFLINE_URL);
        if (offline) return offline;
      }
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});

// Mensagem para aplicar update imediatamente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
