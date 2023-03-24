import React from "react"
import '../App.css';

import { Container, Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"


function NavigationBar() {

	//pretty straight forward, just using the bootstrap navbar component
	//handles the buttons and references for us, does some light styling through classname, bg (background) and expand (where to collapse nav)
	return (
        <Navbar bg="light" variant="light" fixed="top" style={{position: "sticky"}}>
                <Nav className="flex-column" activeKey="/linear">
                    <Nav.Link href="/linear">Linear Regression</Nav.Link>
                    <Nav.Link event-key="log-link">Logistic Regression</Nav.Link>
                    <Nav.Link event-key="dtree-link">Decision Tree Classifer</Nav.Link>
                </Nav>
        </Navbar>
  )
}

export default NavigationBar;