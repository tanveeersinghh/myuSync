import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtRvk1x6wVLRNZn6wy-PUuM0rtppRJDhA",
  authDomain: "myu-sync.firebaseapp.com",
  projectId: "myu-sync",
  storageBucket: "myu-sync.appspot.com",
  messagingSenderId: "517392149525",
  appId: "1:517392149525:web:6f70b7e3743d726346321c"
};
//initialise firebase
firebase.initializeApp(firebaseConfig);

//initialise services

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
