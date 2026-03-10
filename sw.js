/**
 * AmarTech Service Worker v2.1
 * Fix Safari: ne jamais intercepter les navigations document (redirections)
 */
const CACHE_NAME = 'amartech-v2.1';
const STATIC_ASSETS = [
  './icon-192.png',
  './icon-512.png',
  './manifest.json'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activation — nettoyage anciens caches
self.addEventListener('activate', event => {
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

  // IMPORTANT: ne jamais intercepter les navigations document (fix Safari redirects)
  if (event.request.mode === 'navigate') {
    return; // laisse le browser gérer nativement
  }

  // API calls — Network only
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

  // Icônes et manifest — Cache first
  if (url.pathname.match(/\.(png|json)$/)) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(resp => {
          if (resp.status === 200) {
            caches.open(CACHE_NAME).then(c => c.put(event.request, resp.clone()));
          }
          return resp;
        });
      })
    );
    return;
  }

  // Tout le reste — network direct
  event.respondWith(fetch(event.request));
});
