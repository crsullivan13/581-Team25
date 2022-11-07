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


function NavigationBar() {

	//pretty straight forward, just using the bootstrap navbar component
	//handles the buttons and references for us, does some light styling through classname, bg (background) and expand (where to collapse nav)
	return (
	<div className="App">
        <header className="App-header">
			<Navbar collapseOnSelect bg = "light" expand="lg">
				<Container>
					<Navbar.Brand href="/">ML for Everyone</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-vav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className="me-auto">
						{/*<Nav.Link href="/datainput">Data Input</Nav.Link>*/}
						<Nav.Link href="/training">Training</Nav.Link>
						<Nav.Link href="/modelusage">Model Usage</Nav.Link>
						<Nav.Link href="/modelmetrics">Model Metrics</Nav.Link>
						<Nav.Link href="/demos">Demos</Nav.Link>
					</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
        </header>
    </div>
  )
}

export default NavigationBar;