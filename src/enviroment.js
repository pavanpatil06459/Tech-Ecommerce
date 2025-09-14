// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARbg9s_lMdJUnJM0C_SfWqPCriK50eGSM",
  authDomain: "tech-ecommerce-51939.firebaseapp.com",
  projectId: "tech-ecommerce-51939",
  storageBucket: "tech-ecommerce-51939.firebasestorage.app",
  messagingSenderId: "943858426871",
  appId: "1:943858426871:web:d222460a0f46c5adb6c4f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
export default app;
