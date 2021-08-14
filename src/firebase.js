import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAJ2GZrqN3jZFmlSY5BnZ7tuemSU_dpzlQ",
    authDomain: "discord-clone-ridvan.firebaseapp.com",
    projectId: "discord-clone-ridvan",
    storageBucket: "discord-clone-ridvan.appspot.com",
    messagingSenderId: "197939237745",
    appId: "1:197939237745:web:a115ca14499319db931cd0",
    measurementId: "G-MM5VD09J37"
};
if(!firebase.app.length){
    firebase.initializeApp(firebaseConfig)
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();


export {auth,provider}
export default db
