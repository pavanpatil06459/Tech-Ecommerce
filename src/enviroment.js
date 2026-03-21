import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

// 🔥 Replace these values with your own Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ KEY FIX: Session-only persistence
// Login is tied to this browser tab/session only.
// Opening the site on another device or browser will NOT auto-login.
// User must log in again each time they open the site fresh.
setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

export { auth };
export default app;
