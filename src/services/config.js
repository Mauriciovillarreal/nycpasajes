import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "nycpasajes.firebaseapp.com",
  projectId: "nycpasajes",
  storageBucket: "nycpasajes.firebasestorage.app",
  messagingSenderId: "386623031914",
  appId: "1:386623031914:web:e5b42395bdca53660b5813"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, addDoc, getDocs, query, where }