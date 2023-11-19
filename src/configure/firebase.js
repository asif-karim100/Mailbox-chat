import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase, ref } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDpz3VHHFjkB3rmJAUyrjEzdadCgV-mKL8",
  authDomain: "ecomerce-auth-b67bd.firebaseapp.com",
  databaseURL: "https://ecomerce-auth-b67bd-default-rtdb.firebaseio.com",
  projectId: "ecomerce-auth-b67bd",
  storageBucket: "ecomerce-auth-b67bd.appspot.com",
  messagingSenderId: "299409949045",
  appId: "1:299409949045:web:d43e0adf654c378d6c933c",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const databaseRef = ref(db);
