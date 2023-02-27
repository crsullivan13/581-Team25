/*
Name: Training.js
Description: Tab which allows users to select a model, change hyperparameters, and choose what metrics will be recorded
Programmers: Griffin Keeter, Connor Sullivan, Amith Panuganti
Creation Date: 9/24/22
Revisions:
	10/11/22 - TEMPORARY CHANGES: bring data input into this page for now for S2 POC, add ability to see returned model
	11/17/22 
		Author: Amith Panuganti
		Edit: Allowed metrics to be added
	11/20/22
		Edit: Add basic http error response display in a pop up modal
Preconditions: None
Errors: None
Side Effects: When the begin training button is pressed, the training will start in the gce
Invariants: None
Faults: None
*/

//imports
import React from "react"

import Papa from "papaparse";

import './Training.css';
import LogisticRegressHypParams from "./LogisticRegressHypParams"
import DecisionTreeHypParams from "./DecisionTreeHypParams"
import DecisionTreeClassifierHypParams from "./DecisionTreeClassifierHypParams"
import MultiLayerPerceptronClassHypParams from "./MultiLayerPerceptronClassHypParams"
import MultiLayerPerceptronRegressHypParams from "./MultiLayerPerceptronRegressHypParams"
import NaiveBayesClassifierHypParams from "./NaiveBayesClassifierHypParams"
import SequentialModel from "./SequentialModelHypParams"
import FigLinearRegres from "./FigLinearRegres"
import GenericHypParams from "./GenericHypParams"
import { Form, Button, Container, ModalHeader } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Modal from 'react-bootstrap/Modal'

import { useState, useEffect } from 'react';

import {useAuth} from "../../contexts/AuthContext"


function Training() {

	const { currentUser } = useAuth()

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

	//state that represents the data object that is passed into the trainModel method
	//TODO - get rid of passing setModelData to children
	const [model_data, setModelData] = useState({"model":"Linear Regression"});

	//state to determine if we should show the modal or noy
	const [show, setShow] = useState(false);
	//state to carry the result we get from a response
	const [requestResult, setReqResult] = useState();

	//set either close or open for the modal state
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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

	let colors = [ 'blue', 'green', 'red' ];


	//this is called when we are training a model
	let handleTrain =  () => {
		console.log(model_data);
		//url for training
		let url = "https://team-25-362714.uc.r.appspot.com/fit"

		//make sure we have the files we need
		if(isTrainFileSelect && isLabelFileSelect){
			//set up x vector
			model_data["X"] = trainData
			//set y vector
			model_data["y"] = labelData[0]
			//we need the user id to train, for storage purposes
			model_data["uuid"] = currentUser.uid


			//turn the request data into json string
			let jsonString = JSON.stringify(model_data)

			console.log(jsonString)

			//setup http request
			let xhr = new XMLHttpRequest()
			//post request with above url
			xhr.open("POST", url)
			//send the request with the json string as body
			xhr.send(jsonString)
			
			//called when http request finished
			xhr.onload = function() {
				//when we get a 200 we do some parsing to display the output
				if(xhr.status == 200) {
					let msg = "Request was successful"
					handleReqResult(msg)
					
					//Parse the response 
					var jsonResponse = JSON.parse(xhr.responseText)

					//If the response does contain a figure
					if(jsonResponse.hasOwnProperty('figure'))
					{
						//Create image that serves as sourc
						const image = "data:image/png;base64,"+jsonResponse.figure;
						
						//Create imag tab 
						let element = <img alt="Figure" src={image}></img>

						//Set returnedModel with elemnt
						setReturnedModel(element)
					}
					//Otherwise
					else
					{
						//Create response 
						var response = "Error: " + jsonResponse.Error 

						//Set ReturnedMoDEL with response
						setReturnedModel(response)
					}
				} else {
					//get here if we get and error status from the http response
					let error = 'Error ' + xhr.status + ': ' + xhr.statusText;
					//pass the error to our error handler, will be displayed in the modal
					handleReqResult(error);
				}
			}

			//this is called when the http is unable to be sent, means a network error
			xhr.onerror = function() {
				//set error to what this network issue generally is
				let error = 'Network error. Request was not made (most likely a CORS error).';
				//display it in the modal
				handleReqResult(error);
			}
		} else {
			//make sure we set out data files before we try to train
			alert("Must select train data first")
		}
	}

	//when we get an http error this is called
	let handleReqResult = (msg) => {
		//set the state that carries the error
		setReqResult(msg)
		//show the modal
		handleShow();
	}

	let name_changed = (event) => {
		model_data["name"] = event.target.value;
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
				}, dynamicTyping: true
			});
	}

	let modelTypeChanged = () =>
	{
		setModelData({});
		let modelType = document.getElementById("modelTypeInput").value;
		setModelType(modelType);//page should update, you can get rid of this
		setModelData({"model": modelType})
	}

	let HyperparameterOptions = (props) =>
	{
		//check the state representing the kind of model
		switch(ModelType){
			case "Linear Regressor":
				console.log(model_data);
				return(<></>);
				break;
			case "Logistic Regressor":
				return(
				<LogisticRegressHypParams model_data_p = {model_data}/>//makes the setModelData function callable from the LinearRegressHypParams component
				);
				break;
			case "Decision Tree Regressor":
				return(
				<DecisionTreeHypParams model_data_p = {model_data}/>//makes the setModelData function callable from the linearRegressHypParams
				);
				break;
			case "Decision Tree Classifier":
				return(
				<DecisionTreeClassifierHypParams  model_data_p = {model_data}/>//makes the setModelData function callable from the linearRegressHypParams
				);
				break;
			case "Multilayer Perceptron Classifier":
				return(
				<MultiLayerPerceptronClassHypParams model_data_p = {model_data}/>//makes the setModelData function callable from the linearRegressHypParams
				);
				break;
			case "Multilayer Perceptron Regressor":
				return(
				<MultiLayerPerceptronRegressHypParams model_data_p = {model_data}/>//makes the setModelData function callable from the linearRegressHypParams
				);
					break;
			case "Gaussian Naive Bayes Classifier":
				return(
				<NaiveBayesClassifierHypParams model_data_p = {model_data}/>
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
			case "Sequential Model":
				return(
					<SequentialModel model_data_p = {model_data} setModelData = {setModelData}>Sequential Model</SequentialModel>
					);
			default:

		}
		//check state of kind of model
	}
	//this page currently has areas to choose and adjust options for the model, the hyperparameters, and the recorded metrics
	return (


	<div id="top-level_wrapper">
		<FigLinearRegres width="200px" height="200px"/>
	{/*This is the pop up for error displaying, we need this so we can inform the user what was wrong with their input*/}
	<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>Request Result</Modal.Title>
		</Modal.Header>
		<Modal.Body>{requestResult}</Modal.Body>
	</Modal>


	<Container id="container">
	<Row id="row">
		{/*<GenericHypParams />*/}
	
		<h1 className="w-100 mt-2">Select Training Data</h1>
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
	</Row>

	<Row>
		{/*option to choose model to train*/}
		<h1 className="w-100 mt-2">Choose Model To Train</h1>
		<Form.Select id="modelTypeInput" aria-label="Model Select" onChange={modelTypeChanged}>
      	{/* Placeholder for actual model */}
		  	<option>Linear Regressor</option>
			<option>Logistic Regressor</option>
			<option>Decision Tree Regressor</option>
			<option>MNIST Classifier</option>
			<option>Decision Tree Classifier</option>
			<option>Multilayer Perceptron Classifier</option>
			<option>Multilayer Perceptron Regressor</option>
			<option>Gaussian Naive Bayes Classifier</option>
			<option>Sequential Model</option>
    	</Form.Select>
	</Row>

	<Row>
		{/*option to choose hyperparameter to edit*/}
		<h1 className="w-100 mt-2">Hyperparameter Input</h1>
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
		<h1 className="w-100 mt-2">Model Name</h1>
		{/*input for name of new model*/}
		<input type="text" placeholder="Name" onChange={name_changed}></input>
	</Row>

	<Row>
		{/*button to begin training*/}
	<Button type="button" onClick={handleTrain}>Train</Button>
	</Row>
	{returnedModel}
	</Container>
	</div>
  );
}

export default Training;
