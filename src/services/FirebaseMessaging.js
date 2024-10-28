// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken } from 'firebase/messaging';


// const firebaseConfig = {
//   apiKey: "AIzaSyCd_0xUMB__Uf0apXSqtUGJD65NDe7nsPY",
//   authDomain: "mynestproject-34466.firebaseapp.com",
//   projectId: "mynestproject-34466",
//   storageBucket: "mynestproject-34466.appspot.com",
//   messagingSenderId: "771415235613",
//   appId: "1:771415235613:web:2d149ebc1661b3d3c9faf4",
//   measurementId: "G-9DF5RYGGF2"
// }; 

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // Function to request permission and get FCM token
// export const requestPermissionAndGetToken = async () => {
//   try {
//     // Request permission to show notifications
//     const permission = await Notification.requestPermission();
    
//     // If permission granted, get the token
//     if (permission === 'granted') {
//       const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });

//       // Check if the token was successfully retrieved
//       if (currentToken) {
//         console.log('FCM Token:', currentToken);
//         await sendTokenToServer(currentToken); // Send token to backend
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//       }
//     } else {
//       console.error('Notification permission denied');
//     }
//   } catch (error) {
//     console.error('Error getting permission for notifications', error);
//   }
// };

// // Function to send FCM token to backend
// const sendTokenToServer = async (token) => {
//   try {
//     const response = await fetch('/api/register-token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token }),
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error('Failed to send token to server');
//     }
    
//     console.log('Token sent to server successfully');
//   } catch (error) {
//     console.error('Error sending token to server', error);
//   }
// };

// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd_0xUMB__Uf0apXSqtUGJD65NDe7nsPY",
  authDomain: "mynestproject-34466.firebaseapp.com",
  projectId: "mynestproject-34466",
  storageBucket: "mynestproject-34466.appspot.com",
  messagingSenderId: "771415235613",
  appId: "1:771415235613:web:2d149ebc1661b3d3c9faf4",
  measurementId: "G-9DF5RYGGF2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
