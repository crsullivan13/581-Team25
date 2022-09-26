/*
Name: Training.js
Description: Tab which allows users to select a model, change hyperparameters, and choose what metrics will be recorded
Programmers: Griffin Keeter
Creation Date: 9/24/22
Revisions:
Preconditions: None
Errors: None
Side Effects: When the begin training button is pressed, the training will start in the gce
Invariants: None
Faults: None
*/

//imports
import React from "react"
import ModelSelect from "./ModelSelect"
import HyperparameterSelect from "./HyperparameterSelect"
import MetricsSelect from "./MetricsSelect"

import './Training.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Training() {

	let handleTrain = () => {
	}

	//this page currently has areas to choose and adjust options for the model, the hyperparameters, and the recorded metrics
  return (
	<Container>
	<Row>
		{/*option to choose model to train*/}
		Choose Model:
		<ModelSelect />
	</Row>

	<Row>
		{/*option to choose hyperparameter to edit*/}
		Change Hyperparameters:
		<HyperparameterSelect />
	</Row>
	
	<Row>
		{/*option to choose what metrics to record*/}
		Choose Recorded Metrics:
		<MetricsSelect />
	</Row>
	<Row>
		{/*button to begin training*/}
	<button onClick={handleTrain}>Begin Training</button>
	</Row>
	</Container>
	
  );
}

export default Training;
