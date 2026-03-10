/**
 * AmarTech Service Worker v2
 * Stratégie: Network First pour API, Cache First pour assets
 */
const CACHE_NAME = 'amartech-v2.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './app.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
];

// Installation — mise en cache des assets statiques
self.addEventListener('install', event => {
  console.log('[SW] Installing AmarTech v2...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS.filter(u => !u.startsWith('http'))))
      .then(() => self.skipWaiting())
  );
});

// Activation — nettoyage anciens caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating AmarTech v2...');
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // API calls — Network only (jamais en cache)
  const isApiCall = ['api.openai.com', 'api.anthropic.com', 'api.elevenlabs.io'].some(d => url.hostname.includes(d));
  if (isApiCall) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Fonts Google — Cache first
  if (url.hostname.includes('fonts.')) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
        caches.open(CACHE_NAME).then(c => c.put(event.request, resp.clone()));
        return resp;
      }))
    );
    return;
  }
  
  // Assets locaux — Cache first with network fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (resp.status === 200) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, resp.clone()));
        }
        return resp;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('./app.html');
        }
      });
    })
  );
});

// Push notifications (futur)
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: 'amartech-notif'
  });
});
