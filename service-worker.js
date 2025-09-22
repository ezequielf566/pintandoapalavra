/* Service Worker - Cache First v9 (corrigido) */
const CACHE_NAME = 'app-v9';
const OFFLINE_URL = '/offline.html';

// 102 páginas SVG do app
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

// Arquivos que sempre entram no cache
const PRECACHE = [
  '/', '/index.html', '/login.html', '/offline.html', '/manifest.json',
  '/icon-192.png', '/icon-512.png', '/icon-512-maskable.png',
  '/app/index.html', '/app/css/style.css',
  '/app/js/script.js', '/app/js/patch-gestures-scroll.js',
  ...PAGES
];

// Instalação do SW → pré-cache de tudo
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of PRECACHE) {
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (res?.ok) await cache.put(url, res.clone());
      } catch (err) {
        console.warn("Falhou ao pré-cachear:", url, err);
      }
    }
  })());
});

// Ativação do SW → remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    await self.clients.claim();
  })());
});

// Intercepta todas as requisições
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    // 1) Tenta pegar do cache
    const cached = await caches.match(req);
    if (cached) return cached;

    // 2) Senão, tenta buscar da rede
    try {
      const fresh = await fetch(req);
      if (fresh?.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (err) {
      // 3) Offline ou falha → usa fallback
      if (req.mode === 'navigate' || req.destination === 'document') {
        const off = await caches.match(OFFLINE_URL);
        if (off) return off;
      }
      if (req.destination === 'image' && req.url.endsWith('.svg')) {
        // devolve qualquer SVG cacheado se não achar o certo
        for (const p of PAGES) {
          const hit = await caches.match(p);
          if (hit) return hit;
        }
      }
      return Response.error();
    }
  })());
});
