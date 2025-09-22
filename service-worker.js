/* Service Worker - Cache First (definitivo) */
const CACHE_NAME = 'app-v5'; // nova versão para forçar update
const OFFLINE_URL = '/offline.html';

// 🔒 Lista de páginas do app (102 SVGs)
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

// Instalação: salva em cache os arquivos principais
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativação: limpa versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

// Fetch: estratégia Cache First
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;

      try {
        const fresh = await fetch(event.request);

        // ✅ Só salva no cache se for resposta completa (200 OK)
        if (fresh && fresh.ok && fresh.status === 200) {
          const clone = fresh.clone();
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, clone);
        }

        return fresh;
      } catch (err) {
        // 🚨 Offline e sem cache → mostra offline.html
        if (event.request.mode === 'navigate') {
          return await caches.match(OFFLINE_URL);
        }
      }
    })()
  );
});

// Atualização imediata do SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
