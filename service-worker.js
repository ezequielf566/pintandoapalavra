/* Service Worker - Cache First */
const CACHE_NAME = 'app-v7'; // nova versão
const OFFLINE_URL = '/offline.html';

// Pré-carregar páginas conhecidas (index, manifest e 102 artes)
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
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Pré-cache inicial...");
      return cache.addAll(PRECACHE).catch(err => {
        console.warn("⚠️ Erro ao adicionar no precache:", err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== CACHE_NAME) {
        console.log("🗑️ Limpando cache antigo:", k);
        return caches.delete(k);
      }
    }));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        console.log("✅ Cache hit:", req.url);
        return cached;
      }

      return fetch(req).then((fresh) => {
        if (fresh && fresh.ok && fresh.status === 200) {
          const clone = fresh.clone();
          caches.open(CACHE_NAME).then(cache => {
            // 🔎 Verificação extra para capturar assets
            let url = new URL(req.url);

            if (url.pathname.includes('/assets/pages/')) {
              console.log("💾 Salvando arte no cache:", url.pathname);
            } else {
              console.log("💾 Salvando no cache:", url.pathname);
            }

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
