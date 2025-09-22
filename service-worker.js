/* Service Worker - Cache First com log e fallback para 206 */
const CACHE_NAME = 'app-v7';
const OFFLINE_URL = '/offline.html';

// Gera a lista de 102 páginas SVG
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

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) {
      return cached; // ✅ já está no cache
    }

    try {
      let fresh = await fetch(req);

      // Se a resposta for 206, tenta refazer pedindo o arquivo completo
      if (fresh.status === 206) {
        console.warn('⚠️ Resposta parcial detectada, refazendo fetch sem range:', req.url);
        fresh = await fetch(req.url, { headers: { Range: 'bytes=0-' } });
      }

      if (fresh && fresh.ok && fresh.status === 200) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
        console.log('✅ Salvo no cache:', req.url);
      } else {
        console.warn('❌ Não salvo (status inválido):', req.url, fresh.status);
      }

      return fresh;
    } catch (e) {
      if (req.mode === 'navigate') {
        return await caches.match(OFFLINE_URL);
      }
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
