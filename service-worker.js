/* Service Worker - versão universal para Vercel (Cache First + Update) */
const CACHE_NAME = 'app-v3';  // nova versão para forçar atualização
const OFFLINE_URL = '/offline.html';

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json'
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

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    if (cached) {
      // Atualiza em segundo plano
      fetch(req).then((fresh) => {
        if (fresh && fresh.ok) {
          cache.put(req, fresh.clone());
        }
      }).catch(() => { /* ignora erros de rede */ });

      return cached; // entrega instantâneo do cache
    }

    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) {
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (e) {
      if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        const offline = await caches.match(OFFLINE_URL);
        if (offline) return offline;
      }
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
