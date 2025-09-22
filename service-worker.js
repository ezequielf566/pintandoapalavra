/* Service Worker - Cache First v7 */
const CACHE_NAME = 'app-v7';
const OFFLINE_URL = '/offline.html';

// lista de 102 páginas SVG
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

// Instala e salva no cache inicial
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Pré-cache inicial...');
      return cache.addAll(PRECACHE);
    })
  );
});

// Remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== CACHE_NAME) {
        console.log('🗑️ Removendo cache antigo:', k);
        return caches.delete(k);
      }
    }));
    self.clients.claim();
  })());
});

// Estratégia Cache First
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        return cached; // ✅ já no cache
      }

      return fetch(req).then((fresh) => {
        // só salva se a resposta for válida e completa
        if (fresh && fresh.ok && fresh.status === 200) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, fresh.clone());

            // avisa o front que foi salvo
            self.clients.matchAll().then(clients => {
              clients.forEach(client =>
                client.postMessage({ type: 'CACHED', url: req.url })
              );
            });
          });
        }
        return fresh;
      }).catch(() => {
        // se offline e navegando → mostra offline.html
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
