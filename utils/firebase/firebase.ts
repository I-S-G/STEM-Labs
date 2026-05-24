import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsYgqpF0Y832b3H2xOqR55ddQ-Um94r74",
  authDomain: "stem-labs-414fc.firebaseapp.com",
  projectId: "stem-labs-414fc",
  storageBucket: "stem-labs-414fc.firebasestorage.app",
  messagingSenderId: "281635045001",
  appId: "1:281635045001:web:df7771928f8fa1ab19d058",
  measurementId: "G-8NSZHBKB95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
