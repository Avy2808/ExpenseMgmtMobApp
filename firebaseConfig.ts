import { initializeApp } from 'firebase/app';
// import {getAuth, RecaptchaVerifier} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyA2G6RnK_heBN7jqbd6qJBzytLJ9U2qC7Y",
    authDomain: "test-4f200.firebaseapp.com",
    projectId: "test-4f200",
    storageBucket: "test-4f200.appspot.com",
    messagingSenderId: "613579109265",
    appId: "1:613579109265:web:3a698fc8f2bf215dd66030"
};

firebase.initializeApp(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const storage=getStorage(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

