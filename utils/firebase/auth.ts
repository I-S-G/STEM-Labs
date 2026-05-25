import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  NextOrObserver,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const authListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const logOut = () => signOut(auth);

