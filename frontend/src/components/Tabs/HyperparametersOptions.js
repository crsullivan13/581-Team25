/*
Name: HyperparameterOptions.js
Description: This component shows different additional options for each hyperparameter
Programmers: Griffin Keeter
Creation Date: 9/25/22
Revisions:
Preconditions: None
Postconditions: None
Errors: None
Side Effects: will eventually communicate with the database to update the stored models that users save
Invariants: None
Faults: None
*/

//imports
import React, { Component } from "react"

class HyperparametersOptions extends React.Component {
	constructor(props){
		super(props);
	}
	//right now the options include two values and a drop down input
	render(){
		return (
		<span>
		<form>
		<label>Value 1:
			<input type="text"/>
		</label>
		<br/>
		<label>Value 2:
			<input type="text"/>
		</label>
		<br/>
		<label>type:
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


export default HyperparametersOptions;
