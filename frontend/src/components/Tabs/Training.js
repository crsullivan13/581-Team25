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
import Papa from "papaparse";

import './Training.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput";

import { useState } from 'react';

function Training() {

	//the states that keep track of the selected files and whether files have been selected
	
	//These states keep track of the Training file
	const [selectedTrainFile, setSelectedTrainFile] = useState();//keeps track of what training file is selected
	const [isTrainFileSelect, setIsTrainFileSelec] = useState(false);//keeps track of whether a training file is selected
	const [trainData, setTrainData] = useState();
	
	//these track the label file
	const [selectedLabelFile, setSelectedLabelFile] = useState();//keeps track of what label file is selected
	const [isLabelFileSelect, setIsLabelFileSelec] = useState(false);//keeps track of whether a label file is selected
	const [labelData, setLabelData] = useState();
	
	//these track the feature file
	const [selectedFeatureFile, setSelectedFeatureFile] = useState();//keeps track of what feature file is selected
	const [isFeatureFileSelect, setIsFeatureFileSelec] = useState(false);//keeps track of whether a label file is selected
	const [featureData, setFeatureData] = useState();

	const [returnedModel, setReturnedModel] = useState("model here after trained");
	const [isModelReturned, setIsModelReturned] = useState(false);


	//this function handles the even that is triggered when someone changes the file they want to use
	let changeTrainHandler = (event) => {

		//these two lines update the state of the page
		setSelectedTrainFile(event.target.files[0]);	//sets the selected file
		setIsTrainFileSelec(true);	//a file has been selected, so this is set to true
		parseCSV(event.target.files[0], 'train');
	}

	//this function handles the even that is triggered when someone changes the file they want to use
	let changeLabelHandler = (event) => {

		//these two lines update the state of the page
		setSelectedLabelFile(event.target.files[0]);//sets the selected file
		setIsLabelFileSelec(true);//a file has been selected, so this is set to true
		parseCSV(event.target.files[0], 'label');
	}

	let changeFeatureHandler = (event) => {

		//these two lines update the state of the page
		setSelectedFeatureFile(event.target.files[0]);//sets the selected file
		setIsFeatureFileSelec(true);//a file has been selected, so this is set to true
		parseCSV(event.target.files[0], 'feature');
	}

	let handleTrain = () => {
				//url for training
				let url = "https://team-25-362714.uc.r.appspot.com/fit"

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

				console.log(xhr.response)


				try{
					let model = JSON.parse(xhr.response)

					//output resonse for debugging
					console.log(model)

					setReturnedModel(model)

					setIsModelReturned(true)
				} catch {
					console.log("couldn't parse json response")
				}
	}


		//simple function to parse a csv into json, takes in the file and the input type to set the correct state
		let parseCSV = (file, type) => {
			return Papa.parse(file,
				{
					complete: function(results) {
						if(type == 'train')
						{
							setTrainData(results.data)
						}
						else if(type == 'label')
						{
							setLabelData(results.data)
						}
					}
				});
		}

	//this page currently has areas to choose and adjust options for the model, the hyperparameters, and the recorded metrics
  return (

	<>

	<Container>

	<div >
      Training Data File:
	<br/>
	{/*first file input for training data*/}
	<input type="file" name="file" onChange={changeTrainHandler} />
	<br/>
	Data Label File:
	<br/>
	{/*file input for label data*/}
	<input type="file" name="file" onChange={changeLabelHandler} />
	<br/>
	Feature File:
	<br/>
	{/*first file input for features*/}
	<input type="file" name="file" onChange={changeFeatureHandler} />
	<br/>

	
    	</div>


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

	<br></br>
	{returnedModel}
	</Container>

	
	</>
  );
}

export default Training;
