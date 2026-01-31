importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAKmgoXA4m3cRTmxJq4aUyva5SVvFbTNqg",
  authDomain: "eandccourier-36fcc.firebaseapp.com",
  databaseURL: "https://eandccourier-36fcc-default-rtdb.firebaseio.com",
  projectId: "eandccourier-36fcc",
  messagingSenderId: "777421115160",
  appId: "1:777421115160:web:4475459312b988f0003070"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationOptions = {
    body: payload.notification.body || "New Job Assigned",
    icon: 'icon-512.png',
    badge: 'icon-512.png',
    vibrate: [200, 100, 200]
  };
  self.registration.showNotification(payload.notification.title || "E&C Dispatch", notificationOptions);
});

const CACHE_NAME = 'ec-driver-v3';
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(['index.html', 'manifest.json', 'icon-512.png'])));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
