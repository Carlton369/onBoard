
document.addEventListener('DOMContentLoaded', event => {
    const app = firebase.app();
    const db = firebase.firestore();

    console.log("help");
    //references the database
    //const docRef = db.collection('posts').doc('firstpost');  // Replace 'users' and 'user1' with your collection and document names

})

document.getElementById('myButton').addEventListener('click', function() {
    document.getElementById('myParagraph').textContent = 'The text has been changed!';
    console.log("sviebfxewfewifbw");
});

/*function for google auth
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
*/
