/*
Name: Dashboard.js
Description: "Home" page, shows the logged in user and that's it
Programmers: Amith Panuganti Connor Sullivan
Creation Date: 9/24/22
Revisions:
    9/24/22:
        Revision: I wrote this all in one sitting
        Author: Connor Sullivan 
    9/24/22: 
        Revision: Fix error where a tab is printed twice
        Author: Amith Panuganti 
Preconditions: None
Postconditions: None
Errors: 
    login could fail, that error comes out of auth.js and we handle it here
Side Effects: None
Invariants: None
Faults: None
*/

//import what we need
import React, {useState} from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

//componenet
function Dashboard() {

    //set up the states and nav object
    const [error, setError] = useState("")
    const { currentUser , logout} = useAuth()
    const navigate = useNavigate()

    //async to handle logout
    async function handleLogout () {
        //clear out error field
        setError("")

        try {
            //call logout from auth
            await logout()
            //put us on the login page if logout works
            navigate("/login")
        } catch {
            //catch error if doesn't work
            setError("Log out failed")
        }
    }

    //buckle up

    //container, div and card tag are for structure
    //the card just has the users email in it right now, just to give some visual que that they are in the right account
    //we get teh email from currentUser which comes out of the authContext
	return (
        <>
            <Container className="d-flex align-items-center justify-content-center"
		    style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="w-100 text-center mt-2">Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email: </strong>{currentUser.email}
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                        <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
                </div>
            </Container>
        </>
    )
}

export default Dashboard;