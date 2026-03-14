import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6d7hg8FACXerTXm2xM8LJOeGiu8yDXW0",
  authDomain: "to-do-list-ca2ef.firebaseapp.com",
  projectId: "to-do-list-ca2ef",
  storageBucket: "to-do-list-ca2ef.firebasestorage.app",
  messagingSenderId: "214110404987",
  appId: "1:214110404987:web:bec4dcdf75b631821f3dde",
  measurementId: "G-XZRF0JQ76E"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
