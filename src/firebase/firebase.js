import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAZMXOmMwpeHDKZX5jiQmDTEjNoCIl7uUo",
  authDomain: "twitter-clone-2c06b.firebaseapp.com",
  databaseURL: "https://twitter-clone-2c06b.firebaseio.com",
  projectId: "twitter-clone-2c06b",
  storageBucket: "twitter-clone-2c06b.appspot.com",
  messagingSenderId: "991460805329",
  appId: "1:991460805329:web:1e6c0d8d226bba6c1e93f0",
};

// Initialize Firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize the database (Cloud Firestore))
const db = firebaseApp.firestore();

// initialize the authentication ()
const auth = firebaseApp.auth();

const storage = firebase.storage();

export { db, auth, storage };
