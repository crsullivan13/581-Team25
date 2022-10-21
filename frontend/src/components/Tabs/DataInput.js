/*
Name: DataInput.js
Description: Tab where user can upload data files to be used for training, also 
Programmers: Griffin Keeter, Connor Sullivan
Creation Date: 9/23/2022
Revisions: 9/24 - added buttons for feature, data, and label file upload, and a button for submit
10/11 - add ability to unparse the csv file into JSON, for now the data goes no where, it will eventually be stored as a state
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None


*/

//imports
import Papa from "papaparse";
import React from "react"
import { useState } from 'react';
import { Form, Button, Container } from "react-bootstrap";


//Returns the page for Inputting Data
//Inputs: None
//Output: Form to Input Data
function DataInput() {
	//data input
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

	//this function handles the even that is triggered when someone changes the file they want to use
	let changeTrainHandler = (event) => {

		//these two lines update the state of the page
		setSelectedTrainFile(event.target.files[0]);	//sets the selected file
		setIsTrainFileSelec(true);	//a file has been selected, so this is set to true
	}

	//this function handles the even that is triggered when someone changes the file they want to use
	let changeLabelHandler = (event) => {

		//these two lines update the state of the page
		setSelectedLabelFile(event.target.files[0]);//sets the selected file
		setIsLabelFileSelec(true);//a file has been selected, so this is set to true
	}

	let changeFeatureHandler = (event) => {

		//these two lines update the state of the page
		setSelectedFeatureFile(event.target.files[0]);//sets the selected file
		setIsFeatureFileSelec(true);//a file has been selected, so this is set to true
	}
	


	//this function will be used to upload/apply the data to train the model - it will need to be sent to the GCE
	let handleSubmit = () => {
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

	//the html contains the three file inputs and a submit button
  return (
	<Container>
		{/* A form group used to separate different sections of the form - one for training data upload, one for label upload, one for feature upload*/}
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

		<Button type="button" onClick={handleSubmit}>Submit</Button>{/*The button that is pressed to submit the data*/}
	</Container>
	
  );
}

export default DataInput;
