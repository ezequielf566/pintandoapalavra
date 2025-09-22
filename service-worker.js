/* Service Worker - Cache First */
const CACHE_NAME = 'app-v5'; // nova versão para forçar update
const OFFLINE_URL = '/offline.html';

// Ajustado para 102 páginas
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

// Instala e pré-carrega
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

// Estratégia Cache First
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        const fresh = await fetch(event.request);

        if (fresh && fresh.ok) {
          const clone = fresh.clone(); // 🔑 clona antes
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, clone);
        }

        return fresh;
      } catch (err) {
        if (event.request.mode === 'navigate') {
          return await caches.match(OFFLINE_URL);
        }
      }
    })()
  );
});

// Força update imediato
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
