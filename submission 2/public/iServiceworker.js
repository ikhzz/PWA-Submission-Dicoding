importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if(workbox) {
  console.log('workbox is invoked')
} else {
  console.log('workbox is lost somewhere')
}
workbox.precaching.precacheAndRoute([
  {url : "/", revision : 1},
  {url : "index.html", revision : 1},
  {url : "manifest.json", revision : 1},
  {url : "pages/home.html", revision : 1},
  {url : "pages/teams.html", revision : 1},
  {url : "pages/matches.html", revision : 1},
  {url : "pages/bookmark.html", revision : 1},
  {url : "pages/error.html", revision : 1},
  {url : "css/materialize.min.css", revision : 1},
  {url : "css/style.css", revision : 1},
  {url : "js/materialize.min.js", revision : 1},
  {url : "js/script.js", revision : 1},
  {url : "js/sw-register.js", revision : 1},
  {url : "js/indexDB.js", revision : 1},
  {url : "js/config.js", revision : 1},
  {url : "img/logo.JPG", revision : 1},
  {url : "img/maskable_192x192.png", revision : 1},
  {url : "img/pwa-192x192.png", revision : 1},
  {url : "img/pwa-512x512.png", revision : 1},
  {url : "img/error.png", revision : 1},
  {url : "img/football.svg", revision : 1},
  {url : "img/loading.gif", revision : 1},
]);

workbox.routing.registerRoute(
  new RegExp(/\.(?:png|gif|jpg|jpeg|svg)$/),
  workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
          new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
          }),
      ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/teams/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com' || 'https://fonts.gstatic.com' || 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts'),
  workbox.strategies.cacheFirst({
    cacheName: 'fonts',
    plugins: [
      new workbox.expiration.Plugin({maxEntries: 20}),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({maxEntries: 20}),
    ],
  }),
);

self.addEventListener('push', event => {
  let msg;
  if (event.data) {
    msg = event.data.text();
  } else {
    msg = 'Push message no payload';
  }
  const options = {
    body: msg,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Football', options)
  );
});