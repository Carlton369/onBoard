import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth' ;
import { getFirestore } from 'firebase/firestore':

const firebaseApp = initializeApp({
    apiKey: "AIzaSyC9yK9Uv911HE0vZx-_aK8e51IxtS4EyFA",
    authDomain: "onboard-be6e6.firebaseapp.com",
    projectId: "onboard-be6e6",
    storageBucket: "onboard-be6e6.appspot.com",
    messagingSenderId: "19927913249",
    appId: "1:19927913249:web:4d32b3f5420ef863392460"
}) ;

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

onAuthStateChanged(auth,user => {
    if(user != null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});
