import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBplctb-cyWVoDC8hcFiFEQO0KYkL_SHr8",
  authDomain: "nycpasajes.firebaseapp.com",
  projectId: "nycpasajes",
  storageBucket: "nycpasajes.firebasestorage.app",
  messagingSenderId: "386623031914",
  appId: "1:386623031914:web:e5b42395bdca53660b5813"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)