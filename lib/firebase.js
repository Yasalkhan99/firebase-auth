"use client";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRMnSZ3Q2t1Q50eqG-sm-utkq5hEFxYx0",
  authDomain: "gt-test-b1259.firebaseapp.com",
  projectId: "gt-test-b1259",
  storageBucket: "gt-test-b1259.appspot.com",
  messagingSenderId: "420522582952",
  appId: "1:420522582952:web:5b798f98cbc3c9d2b3739d"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app); 