/*
Name: firebase.js
Description: Handles both authorization and stores data
Programmers: Amith Panuganti 
Creation Date: 9/20/22
Revisions:
    9/20/22
        Revision: Start to set up firebase in react
        Author: Amith Panuganti 
    9/21/22
        Revision: Export authentication for authentication services
        Author: Amith Panuganti 
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None

*/

// Import the functions you need from the SDKs we need
//Import initializeApp for initialization
import { initializeApp } from "firebase/app";

//Import getAnalytics for analytics
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Import getAuth for authoriztion
import { getAuth } from "firebase/auth";

//Import getFirestore for firestore, which serves as database
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //Api Key
  apiKey: "AIzaSyCyDqcCk1WNl6Vi1UAd6g213tdh9PrUGJ0",

  //Authorization domain
  authDomain: "team-25-362714.firebaseapp.com",

  //Project Id
  projectId: "team-25-362714",

  //Storage Bucked
  storageBucket: "team-25-362714.appspot.com",

  //Messaging Sender ID
  messagingSenderId: "410812165387",

  //APP id
  appId: "1:410812165387:web:1b767268e73287f96e460e",

  //Measurement ID
  measurementId: "G-HGTF2EQMF4"
};

// Initialize Firebase
//Initializes the app
const app = initializeApp(firebaseConfig);

//Set up analytics
const analytics = getAnalytics(app);

//Set up authorization
const auth = getAuth(app);

//Set up firestore
const db = getFirestore(app);

//Export auth
export {auth, db};



