/*
Name: ModelOptions.js
Description:This is a component that includes additional options for the Model selections
Programmers: Griffin Keeter
Creation Date: 9/25/22
Revisions:
Preconditions: None
Errors: None
Side Effects: Will communicate with the database to update stored models
Invariants: None
Faults: None
*/

//imports
import React, { Component } from "react"

class ModelOptions extends React.Component {
	constructor(props){
		super(props);
	}
	//the options include one text input and a drop down with two options
	render(){
		return (
		<span>
		<form>
		<label>name:
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


export default ModelOptions;
