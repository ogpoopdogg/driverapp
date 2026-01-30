importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAKmgoXA4m3cRTmxJq4aUyva5SVvFbTNqg",
  authDomain: "eandccourier-36fcc.firebaseapp.com",
  databaseURL: "https://eandccourier-36fcc-default-rtdb.firebaseio.com",
  projectId: "eandccourier-36fcc",
  messagingSenderId: "777421115160", // Ensure this ID is correct
  appId: "1:777421115160:web:4475459312b988f0003070"
});

const messaging = firebase.messaging();

// This handles the notification when the app is in the background
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-512.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
