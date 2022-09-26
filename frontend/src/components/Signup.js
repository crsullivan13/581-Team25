/*
Name: Signup.js
Description: Comp for the sign up page
Programmers: Connor Sullivan
Creation Date: 9/24/22
Revisions:
    I wrote this all in one sitting
Preconditions: None
Postconditions: None
Errors: 
    errors from signup failures in auth can propogate up but are handled here
	error on password fields not matching, just lets the user know, doesn't cause issues
Side Effects: None
Invariants: None
Faults: None
*/

//import what we need
import React, {useRef, useState} from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

//componenet functions that ends up in App.js
export default function Signup() {

	//setting up all of the hooks, references and state objects
	const emailRef = useRef()
	const passwordRef = useRef()
	const { signup } = useAuth()
	const passwordConfirmRef = useRef()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	//async registration submission
	async function handleSubmit(e) {
		//make sure react doesn't try to reload
		e.preventDefault()

		//make sure the password fields match, error out if not
		if(passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords don't match")
		}

		try {
			//make the error state blank
			setError("")
			//tell DOM we are loading
			setLoading(true)
			//call the signup from authcontext async
			await signup(emailRef.current.value, passwordRef.current.value)
			//put user on the login page after resitering
			navigate("/login")
		} catch {
			//error message shows up if the account failes
			setError("Failed to create account")
		}

		//we are no longer loading
		setLoading(false)
	}

	//i have no idea how to comment in the below block so buckle up

	//container and div elemtns are just handling styling so we have a nice looking card
	//error line is how we catch the setError and display it
	//form tags are the actual fields
	//onSubmit calls the above handle submit for contacting firebase
	//each field puts the item in the field in to the related ref for when we actually need to submit or do password comparison
	//button allows the actualy submission to happen
	return (
		<>
		<Container className="d-flex align-items-center justify-content-center"
		style={{ minHeight: "100vh" }}>
			<div className="w-100" style={{ maxWidth: "400px" }}>
			<Card>
				<Card.Body>
					<h2 className="w-100 text-center mt-2">Sign Up</h2>
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
						<Form.Group id="password-confirm">
													<Form.Label>Password Confirmation</Form.Label>
													<Form.Control type="password" ref={passwordConfirmRef} required />
											</Form.Group>
						<Button disabled={loading} className="w-100 mt-4" type="submit">
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			
			<div className="w-100 text-center mt-2">
				Have and account? <Link to="/login">Log In</Link>
			</div>
			</div>
		</Container>
		</>
	)
}
