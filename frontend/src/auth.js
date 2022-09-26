/*
Name: auth.js
Description: Handles authorization
Programmers: Amith Panuganti 
Creation Date: 9/21/22
Revisions:
    9/21/22
        Revision: Handles authorization
        Author: Amith Panuganti 
Preconditions: Firebase must be set up
Postconditions: None
Errors: 
    loginWithEmailPassword - Invalid signin due to incorrect email and/or password
Side Effects: None
Invariants: None
Faults: None
*/

//Import auth form firebase js
import {auth, db} from './firebase.js';

//Import several other functions from firebast/firestor
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';

//Login's the user with email and password
//Inputs: Email - User's Email
//        Password - User's Passowrd
const logInWithEmailAndPassword = async (email, password) => {
    //Authorizes if both the emial and password are correct
    //Place in try block catch if the authorization is incorrect
    try
    {
        //Signs the user with email and password
        await signInWithEmailAndPassword(auth, email, password);
      
    } 
    //If an error is caught
    catch (err)
    {
        //Console log the error
        console.error(err);

        //Alert the user with the message
        alert(err.message);
    }
};

//Register's the user with their email and password
//Inputs: name, email, password
//Error: Failure to create user with emial and password
const registerWithEmailAndPassword = async (email, password) => {
    //Create user with emial and password 
    try{
        //Create user with email and password in database
        await createUserWithEmailAndPassword(auth, email, password);
    }
    //If an error is caught
    catch(err)
    {
        //Console log the err
        console.error(err);

        //Alert the user with the er
        alert(err.message);
    }
};

//Logot the user
const logout_auth = () => {
    signOut(auth);
};

//Export all functions and db for future use
export {auth, logInWithEmailAndPassword, registerWithEmailAndPassword, logout_auth};

