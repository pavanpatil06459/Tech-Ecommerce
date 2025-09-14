// src/services/firebase.services.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARbg9s_lMdJUnJM0C_SfWqPCriK50eGSM",
  authDomain: "tech-ecommerce-51939.firebaseapp.com",
  projectId: "tech-ecommerce-51939",
  storageBucket: "tech-ecommerce-51939.appspot.com",
  messagingSenderId: "943858426871",
  appId: "1:943858426871:web:d222460a0f46c5adb6c4f2",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export default db; // ✅ Default export
