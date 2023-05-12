import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getDatabase, ref, set, update, onValue, push } from 'firebase/database';


import {
    API_KEY, AUTH_DOMAIN,
    PROJECT_ID, STORAGE_BUCKET,
    MESSAGING_SENDER_ID, APP_ID, DATABASE_URL
}
    from '@env';
import { Recipe } from "../types/types";


const firebaseConfig = {

    apiKey: API_KEY,

    authDomain: AUTH_DOMAIN,
  
    projectId: PROJECT_ID,
  
    storageBucket: STORAGE_BUCKET,
  
    messagingSenderId: MESSAGING_SENDER_ID,
  
    appId: APP_ID,
  
    databaseURL: DATABASE_URL,

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


export default { app }  ;  