// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUMgIEb8EQVvRhKL7-Rh8bg0T8hZmPrSs",
  authDomain: "netflix-72d25.firebaseapp.com",
  projectId: "netflix-72d25",
  storageBucket: "netflix-72d25.appspot.com",
  messagingSenderId: "158565893228",
  appId: "1:158565893228:web:655311c597660174f4c449",
  measurementId: "G-XPCKM9QWJF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
