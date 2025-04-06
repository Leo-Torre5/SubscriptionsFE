import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey: "AIzaSyDVX8-bVEfSzuF_mvV4yGKAAtube7lw74M",  
  authDomain: "subscriptions-99bf9.firebaseapp.com",  
  projectId: "subscriptions-99bf9", 
  storageBucket: "subscriptions-99bf9.firebasestorage.app", 
  messagingSenderId: "511373471396", 
  appId: "1:511373471396:web:abd1d725ed4d1e64928031" 
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
