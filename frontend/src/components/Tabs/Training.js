/*
Name: Training.js
Description: Tab which allows users to select a model, change hyperparameters, and choose what metrics will be recorded
Programmers: Griffin Keeter, Connor Sullivan
Creation Date: 9/24/22
Revisions:
	10/11/22 - TEMPORARY CHANGES: bring data input into this page for now for S2 POC, add ability to see returned model
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
import Papa from "papaparse";

import './Training.css';
import { Form, Button, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput";

import { useState } from 'react';
import { warning } from "@remix-run/router";

function Training() {

	//the states that keep track of the selected files and whether files have been selected
	
	//These states keep track of the Training file
	const [selectedTrainFile, setSelectedTrainFile] = useState();//keeps track of what training file is selected
	const [isTrainFileSelect, setIsTrainFileSelec] = useState(false);//keeps track of whether a training file is selected
	//trainData stores the content of the training file
	const [trainData, setTrainData] = useState();
	
	//these track the label file
	const [selectedLabelFile, setSelectedLabelFile] = useState();//keeps track of what label file is selected
	const [isLabelFileSelect, setIsLabelFileSelec] = useState(false);//keeps track of whether a label file is selected
	//labelData stores the content of the label file
	const [labelData, setLabelData] = useState();
	
	//these track the feature file
	const [selectedFeatureFile, setSelectedFeatureFile] = useState();//keeps track of what feature file is selected
	const [isFeatureFileSelect, setIsFeatureFileSelec] = useState(false);//keeps track of whether a label file is selected
	//featureData stores the content of the feature file
	const [featureData, setFeatureData] = useState();

	//track state of returned model
	const [returnedModel, setReturnedModel] = useState("model here after trained");
	const [isModelReturned, setIsModelReturned] = useState(false);

	//state that represents the kind of model being trained
	const [ModelType, setModelType] = useState("Linear Regression");


	//this function handles the even that is triggered when someone changes the file they want to use
	let changeTrainHandler = (event) => {

		//these two lines update the state of the page
		setSelectedTrainFile(event.target.files[0]);	//sets the selected file
		setIsTrainFileSelec(true);	//a file has been selected, so this is set to true
		//parseCSV parses the train file, then updates the trainingData state
		parseCSV(event.target.files[0], 'train');
	}

	//this function handles the even that is triggered when someone changes the file they want to use
	let changeLabelHandler = (event) => {

		//these two lines update the state of the page
		setSelectedLabelFile(event.target.files[0]);//sets the selected file
		setIsLabelFileSelec(true);//a file has been selected, so this is set to true
		//the label file is parsed, then the labelData state is updated
		parseCSV(event.target.files[0], 'label');
	}

	//handles changing features file
	let changeFeatureHandler = (event) => {

		//these two lines update the state of the page
		setSelectedFeatureFile(event.target.files[0]);//sets the selected file
		setIsFeatureFileSelec(true);//a file has been selected, so this is set to true
		//the feature file is parsed and the featureData state is updated
		parseCSV(event.target.files[0], 'feature');
	}

	//on click function for training button
	let handleTrain = () => {
				//url for training
				let url = "https://team-25-362714.uc.r.appspot.com/fit"

				//catches case where no files selected, TODO add state to avoid needing this
				try{
					//call the csv parser
					parseCSV(selectedTrainFile, 'train')
					parseCSV(selectedLabelFile, 'label')
			
					//setup js object in the json format
					let data = {
						X: trainData,
						y: labelData
					}
			
					//turn object into json object
					let jsonString = JSON.stringify(data)
			
					//print for debugging
					console.log(jsonString)
					console.log(data);
			
					//create http request object
					let xhr = new XMLHttpRequest()
					//build out the header
					xhr.open("POST", url)
					//send with json object
					xhr.send(jsonString)

					//output response for debugging
					console.log(xhr.response)

					//try to parse the respnse, if we can't then log that
					try{
						let model = JSON.parse(xhr.response)

						//output resonse for debugging
						console.log(model)

						//set the model so we can output it
						setReturnedModel(model)

						//change state
						setIsModelReturned(true)
					} catch {
						console.log("couldn't parse json response")
					}
				} catch {
					alert("no files selected")
				}
	}


		//simple function to parse a csv into json, takes in the file and the input type to set the correct state
		let parseCSV = (file, type) => {
			return Papa.parse(file,
				{
					complete: function(results) {
						if(type == 'train')
						{
							//update the trainData state
							setTrainData(results.data)
						}
						else if(type == 'label')
						{
							//update the trainData state
							setLabelData(results.data)
						}
					}
				});
		}

	let modelTypeChanged = () =>
	{
		let modelType = document.getElementById("modelTypeInput").value;
		setModelType(modelType);//page should update
	}
	let HyperparameterOptions = () =>
	{
		
		//check the state representing the kind of model
		switch(ModelType){
			case "Linear Regression":
				return(
				<Form.Group>
					<Row>
					<Form.Label>Linear Regression Hyperparameters</Form.Label>
					<Col>
						<Form.Label>Dual</Form.Label>
						<Form.Select>
							<option>True</option>
							<option>False</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Tolerance</Form.Label>
						<input type="text" value="0.001"></input>
					</Col>
					<Col>
						<Form.Label>C</Form.Label>
						<input type="text" value="0.001"></input>
					</Col>
					<Col>
						<Form.Label>Dual</Form.Label>
						<Form.Select>
							<option>True</option>
							<option>False</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Max Iterations</Form.Label>
						<input type="text" value="1"></input>
					</Col>
					<Col>
						<Form.Label>Fit Intercept</Form.Label>
						<input type="text" value="1"></input>
					</Col>
					</Row>
				</Form.Group>
				);
				break;
			case "Decision Tree":
				return(
					<Form.Group>
						<Form.Label>Decision Tree Hyperparameters</Form.Label>
						<Col>
						
						</Col>
					</Form.Group>
					);
				break;
			case "MNIST Classifier":
				return(
					<Form.Group>
						<Form.Label>MNIST Classifier Hyperparameters</Form.Label>
						<Col>
						
						</Col>
					</Form.Group>
					);
			default:

		}
		//check state of kind of model
	}
	//this page currently has areas to choose and adjust options for the model, the hyperparameters, and the recorded metrics
  return (


	<>

	<Container>

		<Form.Group className="mb-3" controlId="trainingUpload">
		<Form.Label>Upload Training Data File</Form.Label>
		<Form.Control type="file" name="file" onChange={changeTrainHandler}></Form.Control>{/* File input for Training data */}
		</Form.Group>

		<Form.Group className="mb-3" controlId="labelUpload">{/* A form group used to separate different sections of the form*/}
		<Form.Label>Upload Label File</Form.Label>
		<Form.Control type="file" name="file" onChange={changeLabelHandler}></Form.Control>{/* */}
		</Form.Group>

		<Form.Group className="mb-3" controlId="featureUpload">{/* A form group used to separate different sections of the form*/}
		<Form.Label>Upload Feature Data File</Form.Label>
		<Form.Control type="file" name="file" onChange={changeFeatureHandler}></Form.Control>{/*The file input for the feature handler*/}
		</Form.Group>


	<Row>
		{/*option to choose model to train*/}
		<Form.Label>Choose type of model to train:</Form.Label>
		<Form.Select id="modelTypeInput" aria-label="Model Select" onChange={modelTypeChanged}>
      	{/* Placeholder for actual model */}
			<option>Linear Regression</option>
			<option>Decision Tree</option>
			<option>MNIST Classifier</option>
    	</Form.Select>
	</Row>

	<Row>
		{/*option to choose hyperparameter to edit*/}
		<Form.Label>Set additional hyperparameters:</Form.Label>
		<HyperparameterOptions />
	</Row>
	
	<Row>
		{/*option to choose what metrics to record*/}
		Choose Recorded Metrics:
		<Form.Select multiple={true}>
			<option>Error</option>
			<option>Metric 2</option>
			<option>Metric 3</option>
		</Form.Select>
	</Row>
	<Row>
		{/*button to begin training*/}
	<Button type="button" onClick={handleTrain}>Train</Button>
	</Row>

	<br></br>
	{returnedModel}
	</Container>

	
	</>
  );
}

export default Training;
