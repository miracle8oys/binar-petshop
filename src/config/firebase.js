// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getFirestore, doc, setDoc} from "@firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbReSJwqu_asNFod0B-RZxZfhA_djLsi0",
  authDomain: "binar-petshop.firebaseapp.com",
  projectId: "binar-petshop",
  storageBucket: "binar-petshop.appspot.com",
  messagingSenderId: "635286945647",
  appId: "1:635286945647:web:d62dac649973e2e215329a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);
const storage = getStorage(app);

const signInWithGoogle = () => {
  signInWithPopup(auth, provider);
}

export {auth, db, signInWithGoogle, storage}