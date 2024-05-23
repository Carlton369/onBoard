document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    const db = firebase.firestore();
    //references the database
    const docRef = db.collection('users').doc('user1');  // Replace 'users' and 'user1' with your collection and document names

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

});
/*
function updatePost(e){
    const db = firebase.firestore();
    const myPost = db.collection('posts').doc('firstpost');
    myPost.update({title: e.target.value})
}*/
function getData(){
    /*const myPost = db.collection('posts').doc('firstpost');
    myPost.onSnapshot(doc => {
        const data = doc.data();
        document.write(data)
    })*/
    document.write(doc.data());
}
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

