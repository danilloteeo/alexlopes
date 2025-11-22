import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR6qEijGz0VhyRTfZcDB0YLU3dWZrDU8k",
  authDomain: "barbearia-4c157.firebaseapp.com",
  projectId: "barbearia-4c157",
  storageBucket: "barbearia-4c157.firebasestorage.app",
  messagingSenderId: "639802479498",
  appId: "1:639802479498:web:cf50251095fc18d95d6e73",
  measurementId: "G-X64MNZM1QE"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);