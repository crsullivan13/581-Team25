/*
Name: MetricsSelect.js
Description: This is a component that shows a drop down selection for different Metrics. When a user selects one of the options, more options appear next to the selection
Programmers: Griffin Keeter
Creation Date: 9/25/22
Revisions:
Preconditions: None
Errors: None
Side Effects: Will eventually communciate with the database to update stored models
Invariants: None
Faults: None
*/

//imports
import React, { Component } from "react"
import MetricsOptions from './MetricsOptions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//the component class inherits from React.Component so it can use props
class MetricsSelect extends React.Component {
	
	
	handleMetricsSelect = (event) => {
		//the handler for the selection of a metric - updates the selected metric state
		this.setState({selectedMetric: event.target.value}); //this also causes the component to re-render
		
	}
	
	//initializes the state and constructs the component
	constructor(props){
		super(props);
		this.state = {
			metrics: [],
			selectedMetric: "default", //sets the metric that is selected by default
		};
	}

	//this function is called after the component is inserted into the DOM, after the first render cycle
	componentDidMount() {
		this.setState({
			metrics: [{name: 'default'}, {name: 'default2'}] //adds two default options for metrics to record
		});
	}
	

	//the render function populates the selection options and checks which one is selected to determine which options 
	//should be displayed
	render () {
		const { metrics } = this.state; //metrics represents the state in the next lines
		
		//populate the selection options
		let metricsList = metrics.length > 0 && metrics.map((item, i) => {
			return (<option key={i} value={item.name}>{item.name}</option>) //adds the options to the dropdown
		}, this);

		//the html that is rendered includes the select input and the additional options
		return (	
			<Container>
			<Row>
			<Col>
				{/*the drop down component where users can select what metric to use*/}
				<select id="metricssel" onChange={this.handleMetricsSelect}>{metricsList}</select>			
			</Col>
			<Col>
				{/*additional options for selected metric*/}
				<div><span>options for {this.state.selectedMetric}:</span>< MetricsOptions /></div>
			</Col>
			</Row>
			</Container>	
		);		
	}
}


export default MetricsSelect;
