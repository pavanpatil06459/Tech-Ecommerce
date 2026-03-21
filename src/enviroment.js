import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARbg9s_lMdJUnJM0C_SfWqPCriK50eGSM",
  authDomain: "tech-ecommerce-51939.firebaseapp.com",
  projectId: "tech-ecommerce-51939",
  storageBucket: "tech-ecommerce-51939.firebasestorage.app",
  messagingSenderId: "943858426871",
  appId: "1:943858426871:web:d222460a0f46c5adb6c4f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

export { auth };
export default app;