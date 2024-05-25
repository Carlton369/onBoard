const app = firebase.app();
const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');


const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});

const db = firebase.firestore();

const catalogue = document.getElementById('catalogue');
let catalogueRef;
let unsubscribe;

//check if user logged in
auth.onAuthStateChanged(user => {
    if (user) {
        // Database Reference
        catalogueRef = db.collection('catalogue')

        // Query
        unsubscribe = catalogueRef

            .onSnapshot(querySnapshot => {

                // Map results to an array of li elements

                const items = querySnapshot.docs.map(doc => {

                    return `<li>${doc.data().name}</li>`

                });

                catalogue.innerHTML = items.join('');

            });

    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
    }
});


/*
document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
    const db = firebase.firestore();
//show info in db
    //references the database
    const docRef = db.collection('posts').doc('firstpost');

    // Fetch the document
    docRef.get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            console.log(userData);  // This will log the data fetched from Firestore

            // Store the data in a const
            const myData = userData;

            // Print the data to the webpage
            const outputElement = document.getElementById('output');
            outputElement.innerHTML = JSON.stringify(myData);

        } else {
            console.log('No such document!');
        }
    }).catch((error) => {
        console.error('Error fetching document: ', error);
    });

})


//function for google auth
function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            document.write(`Hello! ${user.displayName}`);
            console.log(user)


        })
        .catch(console.log)
}

function googleLogout(){
    auth.signOut();
}*/
