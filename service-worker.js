/* Service Worker - Cache First (v6 corrigido) */
const CACHE_NAME = 'app-v6'; // nova versão para forçar update
const OFFLINE_URL = '/offline.html';

// garante exatamente 102 páginas
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

// Instala e salva no cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE)
    )
  );
});

// Ativa e limpa versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
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
        // ✅ Usa direto do cache
        return cached;
      }

      // 🔄 Se não tiver → busca online e salva
      return fetch(req).then((fresh) => {
        // só cacheia respostas completas (200)
        if (fresh && fresh.ok && fresh.status === 200) {
          const clone = fresh.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return fresh;
      }).catch(() => {
        // 🚨 Se offline e não tiver cache → mostra offline.html
        if (req.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

// Permite forçar update via postMessage
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
