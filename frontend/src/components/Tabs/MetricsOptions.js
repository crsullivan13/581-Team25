/*
Name: MetricsOptions.js
Description: This is a component that includes additional options for the Metrics selections
Programmers: Griffin Keeter
Creation Date: 9/24/22
Revisions:
Preconditions: None
Errors: None
Side Effects: Will eventually communicate with the database to update models that are stored there
Invariants: None
Faults: None
*/

//imports
import React, { Component } from "react"

class MetricsOptions extends React.Component {
	constructor(props){//calls the superclass constructor
		super(props);
	}	
	//the options include one text input and a drop down with two options
	render(){
		return (
		<span>
		<form>
		<label>name:
			{/*name of the metric*/}
			<input type="text"/>
		</label>
		<br/>
		<label>type:
			{/*two options for a drop down*/}
			<select>
			<option>option1</option>
			<option>option2</option>
			</select>
		</label>
		</form>
		</span>
		);
	}
}


export default MetricsOptions;
