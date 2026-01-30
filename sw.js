const CACHE_NAME = 'ec-driver-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon-512.png'
];

// 1. Install & Cache Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Network/Cache Fetch Logic
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 3. --- NEW: Listen for Push Notifications ---
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body || 'New job assigned!',
    icon: 'icon-512.png',
    badge: 'icon-512.png',
    vibrate: [200, 100, 200],
    data: {
      url: 'https://ogpoopdogg.github.io/driverapp/index2.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'E&C Dispatch', options)
  );
});

// 4. --- NEW: Open App when Notification is Clicked ---
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow(event.notification.data.url);
    })
  );
});
