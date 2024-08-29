import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/messaging";
import "firebase/compat/storage";
import "firebase/compat/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAPMqNHvHoolKZDUYBhOZg3WtuUkg9oLrM",
  authDomain: "mindcare-23fd5.firebaseapp.com",
  projectId: "mindcare-23fd5",
  storageBucket: "mindcare-23fd5.appspot.com",
  messagingSenderId: "336244885835",
  appId: "1:336244885835:web:5b11422d8abd7b5dd780ce",
  measurementId: "G-XJLSKL0WG2",
  databaseUrl: "https://mindcare-23fd5-default-rtdb.firebaseio.com/",
});

// Initialize Firebase
const analytics = firebase.analytics();
const messaging = firebase.messaging();
app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export default app;
export { messaging, analytics };
