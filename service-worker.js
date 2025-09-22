/* Service Worker - Cache First */
const CACHE_NAME = 'app-v5'; // incrementa versão para forçar update
const OFFLINE_URL = '/offline.html';

const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

// Instala e faz pré-cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativa e remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

// Estratégia de busca: Cache First
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        // ✅ Já está no cache → usa direto
        return cached;
      }
      // 🔄 Se não tiver → busca online e salva no cache
      return fetch(req).then((fresh) => {
        if (fresh && fresh.ok && fresh.status === 200) {
          const responseToCache = fresh.clone(); // ✅ clona antes de salvar
          caches.open(CACHE_NAME).then(cache => cache.put(req, responseToCache));
        }
        return fresh; // 🔥 usa o original para a resposta
      }).catch(() => {
        // 🚨 Se offline e não tiver cache → mostra offline.html
        if (req.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

// Forçar atualização imediata quando receber comando
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
