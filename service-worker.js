/* Service Worker - Cache First Instantâneo + Update em segundo plano */
const CACHE_NAME = 'app-v6';  // incrementado para forçar atualização
const OFFLINE_URL = '/offline.html';

// Pré-cache essenciais + primeiros 10 SVGs
const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...Array.from({ length: 10 }, (_, i) => `/app/assets/pages/${i + 1}.svg`)
];

// Configuração dos lotes
const TOTAL_PAGES = 80;   // total atual de SVGs
const BATCH_SIZE = 10;    // baixa 10 por vez em background

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

    // 🔥 dispara cache dos outros lotes em background
    precacheInBatches();
  })());
});

async function precacheInBatches() {
  const cache = await caches.open(CACHE_NAME);
  for (let start = 10; start < TOTAL_PAGES; start += BATCH_SIZE) {
    const batch = Array.from(
      { length: Math.min(BATCH_SIZE, TOTAL_PAGES - start) },
      (_, i) => `/app/assets/pages/${start + i + 1}.svg`
    );
    try {
      await cache.addAll(batch);
      console.log(`✅ Lote ${start + 1}–${start + batch.length} salvo`);
    } catch (err) {
      console.warn(`⚠️ Falha ao salvar lote ${start + 1}`, err);
    }
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    if (cached) {
      // ✅ entrega sempre instantânea do cache
      // 🔄 atualiza em background sem atrasar resposta
      event.waitUntil(
        fetch(req).then((fresh) => {
          if (fresh && fresh.ok && fresh.status === 200 && !req.url.startsWith('chrome-extension://')) {
            cache.put(req, fresh.clone());
          }
        }).catch(() => { /* ignora falhas de rede */ })
      );
      return cached;
    }

    // Se não tiver no cache, tenta rede
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok && fresh.status === 200 && !req.url.startsWith('chrome-extension://')) {
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
