// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "magister-react-app.firebaseapp.com",
  projectId: "magister-react-app",
  storageBucket: "magister-react-app.appspot.com",
  messagingSenderId: "1020404754369",
  appId: "1:1020404754369:web:da839e0116980e2dfab140"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
