/*
Name: NavigationBar.js
Description: Nav bar component
Programmers: Connor Sullivan
Creation Date: 9/24/22
Revisions:
    9/24/22
		Revision: Move this code to here from another file for modularity
		Authort: Connor Sullivan
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

import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"


function NavigationBar() {

	//pretty straight forward, just using the bootstrap navbar component
	//handles the buttons and references for us, does some light styling through classname, bg (background) and expand (where to collapse nav)
	return (
	<div className="App">
        <header className="App-header">
		<Navbar bg = "light" expand="lg">
		<Navbar.Brand href="/">ML for Everyone</Navbar.Brand>
		<Nav className="me-auto">
			<Nav.Link href="/datainput">Data Input</Nav.Link>
			<Nav.Link href="/training">Training</Nav.Link>
			<Nav.Link href="/modelusage">Model Usage</Nav.Link>
			<Nav.Link href="/modelmetrics">Model Metrics</Nav.Link>
		</Nav>
		</Navbar>
            
        </header>
        </div>
	
  )
}

export default NavigationBar;