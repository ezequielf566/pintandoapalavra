/* Service Worker - Cache First v8 (Vercel-safe) */
const CACHE_NAME = 'app-v8';
const OFFLINE_URL = '/offline.html';

// lista de 102 páginas SVG
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/',               // importante p/ primeira visita
  '/index.html',
  '/login.html',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-512-maskable.png',
  '/app/index.html',
  '/app/css/style.css',
  '/app/js/script.js',
  '/app/js/patch-gestures-scroll.js',
  ...PAGES
];

// Instala e salva no cache inicial (tolerante a falhas individuais)
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const ok = [];
    for (const url of PRECACHE) {
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (res && res.ok) await cache.put(url, res.clone());
        else console.warn('⚠️ Falha ao pré-cachear', url, res && res.status);
      } catch (e) {
        console.warn('⚠️ Erro ao pré-cachear', url, e);
      }
    }
  })());
});

// Remove caches antigos e assume controle imediato
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    await self.clients.claim();
  })());
});

// Estratégia Cache First com fallback offline para navegação
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok && fresh.status === 200) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());

        // avisa o front que foi salvo (opcional)
        self.clients.matchAll().then(clients => {
          clients.forEach(client => client.postMessage({ type: 'CACHED', url: req.url }));
        });
      }
      return fresh;
    } catch (e) {
      // Se for navegação (document), cai na página offline
      if (req.mode === 'navigate' || (req.destination === 'document')) {
        const off = await caches.match(OFFLINE_URL);
        if (off) return off;
      }
      // tenta retornar um SVG "mais próximo" se o pedido for uma página e estivermos offline
      if (req.destination === 'image' && req.url.endsWith('.svg')) {
        // pega qualquer uma do cache
        for (const p of PAGES) {
          const hit = await caches.match(p);
          if (hit) return hit;
        }
      }
      // último recurso: nada
      return Response.error();
    }
  })());
});

// suporte a skipWaiting manual
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
