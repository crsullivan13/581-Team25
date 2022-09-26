/*
Name: Login.js
Description: Comp for the login page, basically a carbon copy of the sign up page
Programmers: Connor Sullivan
Creation Date: 9/24/22
Revisions:
    I wrote this all in one sitting
Preconditions: None
Postconditions: None
Errors: 
    errors from login failures in auth can propogate up but are handled here
Side Effects: None
Invariants: None
Faults: None
*/

//import what we need
import React, {useRef, useState} from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { logInWithEmailAndPassword } from "../auth"
import { Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

//the component getting exported
export default function Login() {
    //setup all refs, and states and nag object
	const emailRef = useRef()
	const passwordRef = useRef()
    const { login } = useAuth()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    //same idea as the signup page, handles the form submit
	async function handleSubmit(e) {
        //don't let the DOM re load
		e.preventDefault()

		try {
            //blank error field
			setError("")
            //let DOM know we are loading
			setLoading(true)
            //call auth login async
			await login(emailRef.current.value, passwordRef.current.value)
            //if successful login we end up rendering the dashboard page
            navigate("/")
		} catch {
            //if login fails show this error
			setError("Failed to log in")
		}

        //not loading anymore once all of the above happens
		setLoading(false)
	}

    //buckle up

    //container, card and div tags are just for structure, card and container come from bootstrap because it makes styling easy
    //error line is for grabbin the error field and displaying it
    //frm tags are for the fields, they each have their specific refs
    //log in button trigger the submission
    //very bottom div is some text with a link that lets you go to the sign up page
	return (
		<>
		<Container className="d-flex align-items-center justify-content-center"
		style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
			<Card>
				<Card.Body>
					<h2 className="w-100 text-center mt-2">Log In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
													<Form.Label>Password</Form.Label>
													<Form.Control type="password" ref={passwordRef} required />
											</Form.Group>
						<Button disabled={loading} className="w-100 mt-4" type="submit">
							Log In
						</Button>
					</Form>
				</Card.Body>
			</Card>
			
			<div className="w-100 text-center mt-2">
				Don't have an account? <Link to="/signup">Sign Up</Link>
			</div>
			</div>
		</Container>
		</>
	)
}