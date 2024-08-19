import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/messaging";
import "firebase/compat/storage";
import "firebase/compat/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAcARwU9bicS_tXk2qemetIWg-qqPshiRw",
  authDomain:  "learningfb-514d5.firebaseapp.com",
  projectId: "learningfb-514d5",
  storageBucket:  "learningfb-514d5.appspot.com",
  messagingSenderId: "272948243653",
  appId: "1:272948243653:web:5ad0363553df4cbe2f14ac",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

// Initialize Firebase
const analytics = firebase.analytics();
const messaging = firebase.messaging();
app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export default app;
export { messaging, analytics };
