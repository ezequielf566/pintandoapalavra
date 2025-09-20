/* Service Worker - Cache First Instantâneo + Update em segundo plano */
const CACHE_NAME = 'app-v4';  // incrementado para forçar atualização
const OFFLINE_URL = '/offline.html';

// Lista fixa com os 80 SVGs + arquivos principais
const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...Array.from({ length: 80 }, (_, i) => `/assets/pages/${i + 1}.svg`)
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
      // ✅ entrega do cache instantânea
      event.waitUntil(
        fetch(req).then((fresh) => {
          if (
            fresh &&
            fresh.ok &&
            fresh.status === 200 &&
            !req.url.startsWith('chrome-extension://')
          ) {
            cache.put(req, fresh.clone());
          }
        }).catch(() => { /* ignora erro de rede */ })
      );
      return cached;
    }

    // Se não tem cache → tenta rede
    try {
      const fresh = await fetch(req);
      if (
        fresh &&
        fresh.ok &&
        fresh.status === 200 &&
        !req.url.startsWith('chrome-extension://')
      ) {
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
