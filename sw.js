// AmarTech SW v3 — minimal, no fetch interception
const CACHE = 'amartech-v3';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(k => Promise.all(k.map(c => caches.delete(c))))
    .then(() => self.clients.claim())
));
// Pas d'interception fetch — laisse tout passer normalement
