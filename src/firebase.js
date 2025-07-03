// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDX3E5-BC9q4gHG_TU6QUsH3dINuQIQ3Dk",
  authDomain: "vice-motorsports.firebaseapp.com",
  projectId: "vice-motorsports",
  storageBucket: "vice-motorsports.firebasestorage.app",
  messagingSenderId: "641581622986",
  appId: "1:641581622986:web:de72c3a39926e7bda4b633",
  measurementId: "G-GCT0V6R6CW"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db   = getFirestore(app)
