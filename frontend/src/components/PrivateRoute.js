/*
Name: PrivateRoute.js
Description: This is just some setup to protect the routes
Programmers: Connor Sullivan
Creation Date: 9/24/22
Revisions:
    I wrote this all in one sitting
Preconditions: None
Postconditions: None
Errors: none
Side Effects: None
Invariants: None
Faults: None
*/

//import what we need
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

//pass in the children props and component
export default function PrivateRoute({children}) {
    //give us the current user
    const {currentUser} = useAuth()

    //ternary, is there a user?, is yeah give us the route we want, if not force them to the login page
    return currentUser ? children : <Navigate to="/login"/>
}