// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbp6b0sdND_q40T_8pzOEDD3eCBh_n46Y",
  authDomain: "tpa-desktop-9cfcf.firebaseapp.com",
  projectId: "tpa-desktop-9cfcf",
  storageBucket: "tpa-desktop-9cfcf.appspot.com",
  messagingSenderId: "1076533644704",
  appId: "1:1076533644704:web:c7c63a3108657ef43968c5",
  measurementId: "G-7WE5ZFYR4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);