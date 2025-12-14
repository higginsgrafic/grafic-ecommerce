// Service Worker per GRÀFIC PWA
const CACHE_NAME = 'grafc-v1';
const urlsToCache = [
  '/',
  '/logo-grafc.png',
  '/favicon.png',
  '/cart-icon.png',
  '/cart-icon-full.png',
  '/manifest.json'
];

// Instal·lació del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Recursos guardats a la caché');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activació del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Eliminant caché antiga');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratègia: Network First, fallback to Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la resposta per guardar-la a la caché
        const responseClone = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      })
      .catch(() => {
        // Si la xarxa falla, intentar servir des de la caché
        return caches.match(event.request);
      })
  );
});
