/* Service Worker - Cache First + suporte a caminhos relativos */
const CACHE_NAME = 'app-v7';
const OFFLINE_URL = '/offline.html';

const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(req).then((fresh) => {
        if (fresh && fresh.ok && fresh.status === 200) {
          // 🔑 Corrigido: salva tanto requests absolutos quanto relativos
          const clone = fresh.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, clone);
          });
        }
        return fresh;
      }).catch(() => {
        if (req.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
