// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwe0JQpQ6_g5LLHScCGD_tjmoO1EEfgno",
  authDomain: "ecommerce-nextjs-c5588.firebaseapp.com",
  projectId: "ecommerce-nextjs-c5588",
  storageBucket: "ecommerce-nextjs-c5588.appspot.com",
  messagingSenderId: "959730902815",
  appId: "1:959730902815:web:fa20ec6b5e99565160722a",
  measurementId: "G-8Z03Z36S4Y"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);