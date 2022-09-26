/*
Name: ModelSelect.js
Description: This is a component that shows a drop down selection for different models. When a user selects one of the options, more options appear below the selection
Programmers: Griffin Keeter
Creation Date: 9/24/22
Revisions:
Preconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//imports
import React, { Component } from "react"
import ModelOptions from "./ModelOptions"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//the component class inherits from React.Component so it can use props
class ModelSelect extends React.Component {
	
	//the handler for the selection of a model - updates the selected model state
	handleModelSelect = (event) => {
		
		this.setState({selectedModel: event.target.value});
		
	}
	
	//initializes the state and constructs the component
	constructor(props){
		super(props);
		this.state = {
			models: [],
			selectedModel: "default",
			selectedMetrics: [],
		};
	}

	//this function is called after the component is inserted into the DOM, after the first render cycle
	componentDidMount() {
		this.setState({
			models: [{name: 'default'}, {name: 'default2'}] //adds two default models
		});
	}
	

	//the render function populates the selection options and checks which one is selected to determine which options 
	//should be displayed
	render () {
		const { models } = this.state;
		
		//populate the selection options
		let modelsList = models.length > 0 && models.map((item, i) => {
			return (<option key={i} value={item.name}>{item.name}</option>) //adds the option to the dropdown
		}, this);



		//the html that is rendered includes the select input and the additional options
		return (
			<Container>
			<Row>
			<Col>
				{/*the dropdown for selecting the model*/}
				<select id="modelsel" onChange={this.handleModelSelect}>{modelsList}</select>
			</Col>
			<Col>
				{/*additional options for selected model*/}
				<div><span>options for {this.state.selectedModel}:</span>< ModelOptions /></div>
			</Col>
			</Row>
			</Container>		
		);		
	}
}


export default ModelSelect;
