// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAB9eixwxy2bTpvPQBKH70UWQYK5QIbGF4",
    authDomain: "pantry-tracker-7e7a9.firebaseapp.com",
    projectId: "pantry-tracker-7e7a9",
    storageBucket: "pantry-tracker-7e7a9.appspot.com",
    messagingSenderId: "300993703520",
    appId: "1:300993703520:web:3642edd493d60b45749d05",
    measurementId: "G-N06F81SP8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);