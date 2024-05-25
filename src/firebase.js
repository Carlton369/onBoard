import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9yK9Uv911HE0vZx-_aK8e51IxtS4EyFA",
    authDomain: "onboard-be6e6.firebaseapp.com",
    projectId: "onboard-be6e6",
    storageBucket: "onboard-be6e6.appspot.com",
    messagingSenderId: "19927913249",
    appId: "1:19927913249:web:4d32b3f5420ef863392460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, collection, onSnapshot };