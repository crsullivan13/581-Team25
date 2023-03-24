/*
Name: Dashboard.js
Description: "Home" page, shows the logged in user and that's it
Programmers: Amith Panuganti Connor Sullivan
Creation Date: 9/24/22
Revisions:
    9/24/22:
        Revision: Initial creation
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
import { Card, Button, Alert, Container, Col, Row } from "react-bootstrap"
import {useAuth} from "../contexts/AuthContext"
import { Route, useNavigate } from "react-router-dom"

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
            <div>
                <Container fluid className="dark-container" style={{height: 400}}>
                    <Row style={{"padding-top": 50}}>
                        <Col md={{ span: 5, offset: 3 }} className="blue-txt large-txt">ML For Everyone</Col>
                    </Row>
                    <Row >
                        <Col md={{ span: 4, offset: 3 }} className="white-txt medium-txt">Interactive ML demos and training tools for beginners.</Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 2, offset: 3 }}>
                            <Button href="/demos" variant="outline-info" size="lg">Get Started</Button>
                        </Col>
                        <Col >
                            <Button variant="outline-light" size="lg" onClick={handleLogout}>Logout</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            <div>
                <Container>
                    <Row style={{"padding-top": 20}}>
                        <Col className="medium-txt" md={{ span: 4, offset: 1 }}><b>Learn</b> <br></br> Use our interactive demos to build essential machine learning foundations.
                        All you need is some basic math skills and the drive to learn. Once you're done with our recourses, you'll be ready to learn how to code these
                        models yourself. </Col>
                        <Col className="medium-txt" md={{ span: 4, offset: 2 }}><b>Train</b> <br></br> Once you've learned about a model move on to training that model type.
                        Use our Google Cloud based backend to train models on data sets available through the SciKit 
                        learn libraries.</Col>
                    </Row>
                </Container>
            </div>

            {/*
            <Container className="d-flex align-items-center justify-content-center"
		    style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card className="text-center">
                    <Card.Body>
                    <Card.Title>Welcome!</Card.Title>
                        <Card.Text>
                            <h2 className="w-100 text-center mt-2">Profile</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <strong>Email: </strong>{currentUser.email}
                        </Card.Text>
                        <Button variant="primary" onClick={handleLogout}>Log Out</Button>
                    </Card.Body>
                </Card>
                </div>
            </Container>
            */}
            
        </>
    )
}

export default Dashboard;