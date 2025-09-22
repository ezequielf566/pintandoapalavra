/* Service Worker - Cache First */
const CACHE_NAME = 'app-v6'; // incrementa a versão quando mudar algo
const OFFLINE_URL = '/offline.html';

// Lista das páginas (1 a 102)
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  ...PAGES
];

// Instala e faz cache inicial
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(PRECACHE.map((url) => cache.add(url)))
    )
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

// Estratégia de busca
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    // 1️⃣ tenta no cache
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      // 2️⃣ busca online
      const fresh = await fetch(req);

      // só guarda no cache se for resposta completa (não 206)
      if (fresh && fresh.ok && fresh.status === 200) {
        const clone = fresh.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, clone);
      }
      return fresh;
    } catch {
      // 3️⃣ se offline → mostra fallback
      if (req.mode === 'navigate') {
        const offline = await caches.match(OFFLINE_URL);
        return offline || new Response('Offline', { status: 503 });
      }
    }
  })());
});

// Força update imediato
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
