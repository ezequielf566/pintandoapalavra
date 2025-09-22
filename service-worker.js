/* Service Worker - Cache First */
const CACHE_NAME = 'app-v5'; // versão nova para forçar update
const OFFLINE_URL = '/offline.html';

// Lista de páginas para pré-cache (1 a 102)
const PAGES = Array.from({ length: 102 }, (_, i) => `/app/assets/pages/${i + 1}.svg`);

const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...PAGES
];

// Instala e salva no cache inicial
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

// Ativa e remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)));
    self.clients.claim();
  })());
});

// Busca arquivos (cache first)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    // 1️⃣ Tenta servir do cache
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      // 2️⃣ Busca online
      const fresh = await fetch(req);

      // 🚨 Só salva no cache se for resposta COMPLETA (200 OK)
      if (fresh && fresh.ok && fresh.status === 200) {
        const clone = fresh.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, clone);
      }

      return fresh;
    } catch (err) {
      // 3️⃣ Se offline e não tiver no cache → mostra offline.html
      if (req.mode === 'navigate') {
        return caches.match(OFFLINE_URL);
      }
      return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
  })());
});

// Força atualização imediata
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
