const CACHE_NAME = "firstpwa-v4";
const urlsToCache = [
  "/",
  "manifest.json",
  "index.html",
  "pages/home.html",
  "pages/teams.html",
  "pages/matches.html",
  "pages/bookmark.html",
  "pages/error.html",
  "css/materialize.min.css",
  "css/style.css",
  "js/materialize.min.js",
  "js/script.js",
  "js/sw-register.js",
  "js/indexDB.js",
  "js/config.js",
  "img/logo.JPG",
  "img/maskable_192x192.png",
  "img/pwa-192x192.png",
  "img/pwa-512x512.png",
  "img/error.png",
  "img/football.svg",
  "img/loading.gif",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0"
];
 
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then( cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", event => {
event.waitUntil(
    caches.keys().then(cacheNames => {
    return Promise.all(
        cacheNames.map(cacheName => {
        if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache  ${cacheName}  dihapus`);
            return caches.delete(cacheName);
        }
        })
    );
    })
);
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.match(e.request).then(res => {
          const promise = fetch(e.request).then(nRes => {
            cache.put(e.request, nRes.clone())
            return nRes
          })
        return res || promise
        })
      })
  )
})


// self.addEventListener('notificationclick', function (event) {
//   if (!event.action) {
//     // Penguna menyentuh area notifikasi diluar action
//     console.log('Notification Click.');
//     return;
//   }
//   switch (event.action) {
//     case 'yes-action':
//       console.log('Pengguna memilih action yes.');
//       // buka tab baru
//       clients.openWindow('https://google.com');
//       break;
//     case 'no-action':
//       console.log('Pengguna memilih action no');
//       break;
//     default:
//       console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
//       break;
//   }
//   event.notification.close();
// });


self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  console.log('anything happen?')
  const test = event.data.text()
  console.log(test)
  event.waitUntil(
    
    self.registration.showNotification(test),
    console.log('is anything here?')

  );
});