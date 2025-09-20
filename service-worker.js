/* Service Worker - Pré-cache em lotes + limpeza automática + aviso de update + modo offline forçado */
const CACHE_NAME = 'app-v8';  // 🔄 troque a versão sempre que atualizar
const OFFLINE_URL = '/offline.html';

// Essenciais + primeiros 10 SVGs
const PRECACHE = [
  '/index.html',
  OFFLINE_URL,
  '/manifest.json',
  ...Array.from({ length: 10 }, (_, i) => `/app/assets/pages/${i + 1}.svg`)
];

// Configuração de lotes
const TOTAL_PAGES = 80;   // total de SVGs atuais
const BATCH_SIZE = 10;    // quantos por vez

// 🔒 flag de modo offline forçado
let offlineForcado = false;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map(k => {
        if (k !== CACHE_NAME) {
          console.log(`🗑️ Cache antigo removido: ${k}`);
          return caches.delete(k);
        }
      })
    );
    self.clients.claim();

    // 🔥 dispara o cache dos lotes em background
    precacheInBatches();

    // 👉 avisa aos clientes que tem versão nova
    self.clients.matchAll().then(clients => {
      clients.forEach(client => client.postMessage({ type: 'NEW_VERSION' }));
    });
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

    // 🌐 Se o usuário ativou "Modo Offline forçado"
    if (offlineForcado) {
      if (cached) return cached;
      const offline = await caches.match(OFFLINE_URL);
      return offline || new Response('Offline (forçado)', { status: 503 });
    }

    // 🌐 comportamento normal (Cache First + Update)
    if (cached) {
      return cached; // entrega instantâneo do cache
    }

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
  if (event.data) {
    if (event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    if (event.data.type === 'SET_OFFLINE') {
      offlineForcado = event.data.value;
      console.log(`🌐 Modo Offline forçado = ${offlineForcado}`);
    }
  }
});
