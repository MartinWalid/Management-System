// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
  

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8MAxPmqOZU7QlwQU2839ndseE6N6vSkc",
  authDomain: "taskmanagementsystem-4dca9.firebaseapp.com",
  projectId: "taskmanagementsystem-4dca9",
  storageBucket: "taskmanagementsystem-4dca9.firebasestorage.app",
  messagingSenderId: "617165329906",
  appId: "1:617165329906:web:3150397e243363dbc5076b",
  measurementId: "G-20R65REG1J",
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Initialize Auth and export it
const auth = getAuth(app);

export { auth, app }; // Exporting `auth` for authentication usage