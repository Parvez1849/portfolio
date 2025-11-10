// ✅ src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  PhoneAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";

// ✅ Your Firebase Config (safe to keep keys public for client SDK)
const firebaseConfig = {
  apiKey: "AIzaSyA7L4PRXKQ1FIwvRCHgW8vuqzVO0QBnIs0",
  authDomain: "portfolio-generator-1ccb2.firebaseapp.com",
  projectId: "portfolio-generator-1ccb2",
  storageBucket: "portfolio-generator-1ccb2.firebasestorage.app",
  messagingSenderId: "756138029751",
  appId: "1:756138029751:web:69e12bf69cbac984219332",
  measurementId: "G-7Z123FH7V9",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth
export const auth = getAuth(app);

// ✅ Providers (for Google & Phone)
export const googleProvider = new GoogleAuthProvider();
export const phoneProvider = new PhoneAuthProvider(auth);

// ✅ Setup Invisible Recaptcha for OTP
export const setupRecaptcha = (containerId = "recaptcha-container") => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    containerId,
    {
      size: "invisible", // or 'normal' if you want to show the box
      callback: (response) => {
        console.log("Recaptcha verified ✅");
      },
    }
  );
};

// ✅ Export app instance
export default app;
