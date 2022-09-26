/*
Name: DataInput.js
Description: Tab where user can upload data files to be used for training, also 
Programmers: Griffin Keeter
Creation Date: 9/23/2022
Revisions: 9/24 - added buttons for feature, data, and label file upload, and a button for submit
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None


*/

//imports
import React from "react"
import { useState } from 'react';


//Returns the page for Inputting Data
//Inputs: None
//Output: Form to Input Data
function DataInput() {

	//the states that keep track of the selected files and whether files have been selected
	
	//These states keep track of the Training file
	const [selectedTrainFile, setSelectedTrainFile] = useState();//keeps track of what training file is selected
	const [isTrainFileSelect, setIsTrainFileSelec] = useState(false);//keeps track of whether a training file is selected
	
	//these track the label file
	const [selectedLabelFile, setSelectedLabelFile] = useState();//keeps track of what label file is selected
	const [isLabelFileSelect, setIsLabelFileSelec] = useState(false);//keeps track of whether a label file is selected
	
	
	//these track the feature file
	const [selectedFeatureFile, setSelectedFeatureFile] = useState();//keeps track of what feature file is selected
	const [isFeatureFileSelect, setIsFeatureFileSelec] = useState(false);//keeps track of whether a label file is selected

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
	
	//the html contains the three file inputs and a submit button
  return (
	
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
	<button onClick={handleSubmit}>Submit</button>
	
    	</div>
	
  );
}

export default DataInput;
