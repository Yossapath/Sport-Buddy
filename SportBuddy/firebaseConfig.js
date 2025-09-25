// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA16koEmnyH6WxF8J5kng2pbXp53Ji-M2w",
  authDomain: "sport-buddy-28ab2.firebaseapp.com",
  databaseURL: "https://sport-buddy-28ab2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sport-buddy-28ab2",
  storageBucket: "sport-buddy-28ab2.appspot.com",
  messagingSenderId: "371546903678",
  appId: "1:371546903678:web:0ca0c51da6fc8fbee8f42f",
  measurementId: "G-N4GGM52074"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 👈 export auth
