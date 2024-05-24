
document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
    const db = firebase.firestore();

})


//function for google auth
function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)

        .then(result => {
            const user = result.user;
            document.write(`Hello! ${user.displayName}`);
            console.log(user)

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
                    //const outputElement = document.getElementById('output');
                    //outputElement.innerHTML = JSON.stringify(myData);
                    document.write("myData");
                } else {
                    console.log('No such document!');
                }
            }).catch((error) => {
                console.error('Error fetching document: ', error);
            });

        })
        .catch(console.log)
}

