import React from "react"
import '../App.css';

import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"
import DataInput from "./Tabs/DataInput"
import Training from "./Tabs/Training"
import ModelUsage from "./Tabs/ModelUsage"
import ModelMetrics from "./Tabs/ModelMetrics"
import Dashboard from "./Dashboard";


function NavigationBar() {
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