/*
Name: AuthContext.js
Description: Gives us the users auth context
Programmers: Connor Sullivan
Creation Date: 9/24/22
Revisions:
    I wrote this all in one sitting
Preconditions: Firebase must be set up
Postconditions: None
Errors: 
    errors from auth.js could propogate up
Side Effects: None
Invariants: None
Faults: None
*/

//imports
import React, { useContext, useState, useEffect } from 'react'
import {auth} from "../firebase"
import { registerWithEmailAndPassword, logInWithEmailAndPassword, logout_auth } from "../auth"

//instatiate context object
const AuthContext = React.createContext()

//functions to allow us to access the context in other files, specifically the users info
export function useAuth() {
    //returns the auth context
    return useContext(AuthContext)
}

//react component function that does the work of setting the context
export function AuthProvider({children}) {
    //set up the states for a logged in user and loading
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //just a pass through from auth.js
    function signup(email, password) {
        return registerWithEmailAndPassword(email, password)
    }

    //just a pass through from auth.js
    function login(email, password) {
        return logInWithEmailAndPassword(email, password)
    }

    //just a pass through from auth.js
    function logout(email, password) {
        return logout_auth(email, password)
    }

    //side effect to update the user and create an auth state so we can logout and fetch user info
    useEffect(() => {
        //creating the the objects that holds the state of the authorization for a user
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            //we are no longer loading so let the DOM know it can render
            setLoading(false)
        })

        return unsubscribe
    }, [])


    //making it easy to return the funcs and user for usage in other files
    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    //return the auth context if we are not loading
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}