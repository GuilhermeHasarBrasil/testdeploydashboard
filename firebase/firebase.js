import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBKoWfkQyXlntTWFxhiQMNFIDZDUtDRC_M",
    authDomain: "hsbrsampledata-dev.firebaseapp.com",
    projectId: "hsbrsampledata-dev",
    storageBucket: "hsbrsampledata-dev.appspot.com",
    messagingSenderId: "133972279437",
    appId: "1:133972279437:web:8d12c6e63e156b55e9a2c4",
    measurementId: "G-S1EDVXDSZD"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)