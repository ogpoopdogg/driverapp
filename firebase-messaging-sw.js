importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Must match your index.html config exactly
firebase.initializeApp({
    apiKey: "AIzaSyAKmgoXA4m3cRTmxJq4aUyva5SVvFbTNqg",
    authDomain: "eandccourier-36fcc.firebaseapp.com",
    databaseURL: "https://eandccourier-36fcc-default-rtdb.firebaseio.com",
    projectId: "eandccourier-36fcc",
    messagingSenderId: "931221081541"
});

const messaging = firebase.messaging();

// Handles the notification when the browser/app is CLOSED
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received', payload);
    
    const notificationTitle = payload.notification.title || "E&C Dispatch Alert";
    const notificationOptions = {
        body: payload.notification.body || "New job details available.",
        icon: 'icon-512.png',
        badge: 'icon-512.png',
        vibrate: [200, 100, 200],
        tag: 'job-notification',
        renotify: true,
        data: {
            // Points to your specific driver app URL
            url: 'https://ogpoopdogg.github.io/driverapp/index.html'
        }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Opens the app when the driver taps the notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
