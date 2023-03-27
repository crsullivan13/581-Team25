/*
Name: NavigationBar.js
Description: Nav bar component
Programmers: Connor Sullivan
Creation Date: 9/24/22
Revisions:
    9/24/22
		Revision: Move this code to here from another file for modularity
		Author: Connor Sullivan
	10/22/22
		Revision: Update navbar to collapse down into a drop down
		Author: Connor Sullivan
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//import what we need
import React from "react"
import '../App.css';

import { Container, Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import { useState } from 'react'




function NavigationBar() {

	const [ModelType, setModelType] = useState('')

    //function to change model type when drop down option selected
    let modelTypeChange = (modelType) => {
        //grabs the value out of the form
        //let modelType = document.getElementById('modelTypeInput').value;
        //sets the state
        setModelType(modelType);
    }

	//pretty straight forward, just using the bootstrap navbar component
	//handles the buttons and references for us, does some light styling through classname, bg (background) and expand (where to collapse nav)
	return (
			<Navbar collapseOnSelect bg = "dark" variant = "dark" expand="lg" fixed="top" style={{position: "sticky"}}>
				<Container fluid className="justify-content-md-center">
					<Navbar.Brand href="/" className="blue-txt">ML for Everyone</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-vav' />
					<Navbar.Collapse id='responsive-navbar-nav' >
					<Nav className="me-auto" activeKey={ModelType} onSelect={(selectedKey => modelTypeChange(selectedKey))}>
						<Nav.Link href="/training" eventKey="Training">Training</Nav.Link>
						<Nav.Link href="/modelusage" eventKey="Model Usage">Model Usage</Nav.Link>
						<Nav.Link href="/modelmetrics" eventKey="Model Metrics">Model Metrics</Nav.Link>
						<Nav.Link href="/demos" eventKey="Demos">Demos</Nav.Link>
						<Nav.Link href="/datasets" eventKey="Data Sets">Data Sets</Nav.Link>
					</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
  )
}

export default NavigationBar;