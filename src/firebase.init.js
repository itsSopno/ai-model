// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU2tmdE1ptCFKyLO2oudsUhr7bpXpKQTE",
  authDomain: "ai-model-5955e.firebaseapp.com",
  projectId: "ai-model-5955e",
  storageBucket: "ai-model-5955e.firebasestorage.app",
  messagingSenderId: "1003840401949",
  appId: "1:1003840401949:web:509e57524f9b07a85dccf4",
  measurementId: "G-Z815JDF0R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;