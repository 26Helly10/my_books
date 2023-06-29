// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import firestore from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnrohCcEHctxP5nH-dPLFtwyqoPDRggr0",
    authDomain: "rnbooks-3c4be.firebaseapp.com",
    projectId: "rnbooks-3c4be",
    storageBucket: "rnbooks-3c4be.appspot.com",
    messagingSenderId: "613600759669",
    appId: "1:613600759669:web:31b4ae98b818d20f8fcd3c"
};

// Initialize Firebase
export const FirebareApp = initializeApp(firebaseConfig);
export const FirebareAuth = getAuth(FirebareApp);
export const FirestoreDB = getFirestore(FirebareApp);