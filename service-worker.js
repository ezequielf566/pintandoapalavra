/* Service Worker - Cache First */
const CACHE_NAME = 'app-v6'; // sempre aumente o número quando alterar o SW
const OFFLINE_URL = '/offline.html';

// Lista todas as páginas do app
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

// Instalação → salva tudo no cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativação → remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

// Intercepta todas as requisições
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    (async () => {
      // 1. Tenta pegar do cache
      const cached = await caches.match(req);
      if (cached) return cached;

      // 2. Se não tiver no cache, busca online e salva
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const clone = fresh.clone(); // ⚡ clona antes de salvar
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, clone);
        }
        return fresh;
      } catch (e) {
        // 3. Se offline e sem cache → mostra offline.html
        if (req.mode === 'navigate') {
          return await caches.match(OFFLINE_URL);
        }
      }
    })()
  );
});

// Permite atualizar o SW manualmente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
