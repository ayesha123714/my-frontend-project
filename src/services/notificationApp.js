// NotificationApp.js
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const NotificationApp = () => {
  const [notifications, setNotifications] = useState([]);

  // Request permission and get token
  const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });

        if (currentToken) {
          console.log('FCM Token:', currentToken);
          // Send the token to your backend
          await sendTokenToServer(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } else {
        console.error('Notification permission denied');
      }
    } catch (error) {
      console.error('Error getting permission for notifications', error);
    }
  };

  // Function to send token to backend
  const sendTokenToServer = async (token) => {
    try {
      const response = await fetch('/api/register-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Failed to send token to server');
      }
      console.log('Token sent to server successfully');
    } catch (error) {
      console.error('Error sending token to server', error);
    }
  };

  // Listen for messages
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { title: payload.notification.title, body: payload.notification.body },
      ]);
    });
  }, []);

  return (
    <div>
      <button onClick={requestPermissionAndGetToken}>Subscribe to Notifications</button>
      <div id="notification-container">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            <strong>{notification.title}</strong>
            <p>{notification.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationApp;
