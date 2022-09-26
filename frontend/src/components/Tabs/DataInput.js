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
	const [selectedTrainFile, setSelectedTrainFile] = useState();
	const [isTrainFileSelect, setIsTrainFileSelec] = useState(false);
	
	//these track the label file
	const [selectedLabelFile, setSelectedLabelFile] = useState();
	const [isLabelFileSelect, setIsLabelFileSelec] = useState(false);
	
	
	//these track the feature file
	const [selectedFeatureFile, setSelectedFeatureFile] = useState();
	const [isFeatureFileSelect, setIsFeatureFileSelec] = useState(false);

	//this function handles the even that is triggered when someone changes the file they want to use
	let changeTrainHandler = (event) => {

		//these two lines update the state of the page
		setSelectedTrainFile(event.target.files[0]);
		setIsTrainFileSelec(true);
		console.log(event.target.files[0]);
	}

	//this function handles the even that is triggered when someone changes the file they want to use
	let changeLabelHandler = (event) => {

		//these two lines update the state of the page
		setSelectedLabelFile(event.target.files[0]);
		setIsLabelFileSelec(true);
		console.log(event.target.files[0]);
	}

	let changeFeatureHandler = (event) => {

		//these two lines update the state of the page
		setSelectedFeatureFile(event.target.files[0]);
		setIsFeatureFileSelec(true);
		console.log(event.target.files[0]);
	}
	
	//this function will be used to upload/apply the data to train the model - it will need to be sent to the GCE
	let handleSubmit = () => {
	}
	
	//the html contains the three file inputs and a submit button
  return (
	
	  <div >
      Training Data File:
	<br/>
	<input type="file" name="file" onChange={changeTrainHandler} />
	<br/>
	Data Label File:
	<br/>
	<input type="file" name="file" onChange={changeLabelHandler} />
	<br/>
	Feature File:
	<br/>
	<input type="file" name="file" onChange={changeFeatureHandler} />
	<br/>
	<button onClick={handleSubmit}>Submit</button>
	
    	</div>
	
  );
}

export default DataInput;
