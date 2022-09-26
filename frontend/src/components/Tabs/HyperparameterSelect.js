/*
Name: HyperparameterSelect.js
Description: This is a component that shows a drop down selection for different Hyperparameters. When a user selects one of the options, more options appear below the selection
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
import HyperparametersOptions from './HyperparametersOptions'

//these imports allow formatting in a grid layout
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//the component class inherits from React.Component so it can use props
class HyperparameterSelect extends React.Component {
	
	//the handler for the selection of a hyperparam - updates the selected hyperparam state
	handleHyperparameterSelect = (event) => {
		
		this.setState({selectedHyperparameter: event.target.value});
		
	}
	
	//initializes the state and constructs the component
	constructor(props){
		super(props);
		this.state = {
			hyperparameters: [],
			selectedHyperparameter: "hyp1",
			selectedMetrics: [],
		};
	}

	//this function is called after the component is inserted into the DOM, after the first render cycle
	componentDidMount() {
		this.setState({
			hyperparameters: [{name: 'hyp1'}, 
						{name: 'hyp2'},
						{name: 'hyp3'},
						{name: 'hyp4'}]
		});
	}
	

	//the render function populates the selection options and checks which one is selected to determine which options 
	//should be displayed
	render () {
		const { hyperparameters } = this.state;
		
		//populate the selection options
		let hyperparameterList = hyperparameters.length > 0 && hyperparameters.map((item, i) => {
			return (<option key={i} value={item.name}>{item.name}</option>)
		}, this);


		let moreHypOptions; //the component that contains extra options
	//checks which of the models was selected

		//later, different options should be made for each kind of hyperparameter, and which one is rendered and populated would be determined here
		this.state.hyperparameters.forEach((x, i) => {
			if(this.state.selectedHyperparameter === x.name){
				moreHypOptions = <span>(hyperparameter options for <span>{x.name}</span>)</span>
			}
		});


		//the html that is rendered includes the select input and the additional options
		return (	
			<Container>
			<Row>
			<Col>
				<select id="hyperparametersel" onChange={this.handleHyperparameterSelect}>{hyperparameterList}</select>
			</Col>
			<Col>
				<div><span>options for {this.state.selectedHyperparameter}:</span>< HyperparametersOptions /></div>
			</Col>
			</Row>
			</Container>		
		);		
	}
}


export default HyperparameterSelect;
