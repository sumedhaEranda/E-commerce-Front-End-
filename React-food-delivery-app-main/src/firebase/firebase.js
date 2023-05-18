// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwBPffJ_izCwZilGqVBmm1vjarhoZRTF4",
  authDomain: "skcompanysystem.firebaseapp.com",
  projectId: "skcompanysystem",
  storageBucket: "skcompanysystem.appspot.com",
  messagingSenderId: "356830896619",
  appId: "1:356830896619:web:1f9c9db2a1c68fc87ef9ae",
  measurementId: "G-QYZ4D92LQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
