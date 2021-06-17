import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';
import "firebase/auth"
var firebaseConfig = {
    apiKey: "AIzaSyDt8vFam6zEZu3pwNZzZNXIan5PTwK5rXw",
    authDomain: "wepost-9d1ef.firebaseapp.com",
    projectId: "wepost-9d1ef",
    storageBucket: "wepost-9d1ef.appspot.com",
    messagingSenderId: "443905009051",
    appId: "1:443905009051:web:d10d367d5f1d57de3bad3e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {storage,firestore,auth,provider,timestamp}