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

// Background Notification Handler
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || "E&C Dispatch";
  const notificationOptions = {
    body: payload.notification.body || "New Job Assigned",
    icon: 'icon-512.png',
    badge: 'icon-512.png',
    vibrate: [200, 100, 200]
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Cache logic for offline use
const CACHE_NAME = 'ec-driver-v2';
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['index.html', 'manifest.json', 'icon-512.png'])));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((res) => res || fetch(event.request)));
});
