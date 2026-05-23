// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, NextOrObserver, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsYgqpF0Y832b3H2xOqR55ddQ-Um94r74",
  authDomain: "stem-labs-414fc.firebaseapp.com",
  projectId: "stem-labs-414fc",
  storageBucket: "stem-labs-414fc.firebasestorage.app",
  messagingSenderId: "281635045001",
  appId: "1:281635045001:web:df7771928f8fa1ab19d058",
  measurementId: "G-8NSZHBKB95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const db = getFirestore(app);

export const signUpWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const authListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const logOut = () => signOut(auth);