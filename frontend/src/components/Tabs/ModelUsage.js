/*
Name: ModelUsage.js
Description: Allows the user to use model they made
Programmers: Amith Panuganti
Creation Date: 9/25/22
Revisions:
	9/25/22: 
        Revision: Impliment Interface for Model Usage
        Author: Amith Panuganti 
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/
//Import React
import React from "react"
import { Form, Button, Container } from "react-bootstrap";

import { useState } from 'react';
import Papa from "papaparse";
import { useAuth } from "../../contexts/AuthContext";


//Represents the interface for Model Usage
//Inputs: None
//Output: HTML to represent Interface for Model Usage
function ModelUsage() {
	
  const {currentUser} = useAuth()


  //the states that keep track of the selected files and whether files have been selected
	
	//These states keep track of the Training file
	const [selectedTrainFile, setSelectedTrainFile] = useState();//keeps track of what training file is selected
	const [isTrainFileSelect, setIsTrainFileSelec] = useState(false);//keeps track of whether a training file is selected
  //trainData stores the parsed information from the training file
	const [trainData, setTrainData] = useState();
	
	//these track the label file
	const [selectedLabelFile, setSelectedLabelFile] = useState();//keeps track of what label file is selected
	const [isLabelFileSelect, setIsLabelFileSelec] = useState(false);//keeps track of whether a label file is selected
  //labelData stores the parsed information from the data file
	const [labelData, setLabelData] = useState();
	
	//these track the feature file
	const [selectedTestFile, setSelectedTestFile] = useState();//keeps track of what feature file is selected
	const [isTestFileSelect, setIsTestFileSelec] = useState(false);//keeps track of whether a label file is selected
  //testData stores the parsed information from the test file
	const [testData, setTestData] = useState();

  const [model_output, setModelOutput] = useState("default output");

  let changeTrainHandler = (event) => {

		//these two lines update the state of the page
		setSelectedTrainFile(event.target.files[0]);	//sets the selected file
		setIsTrainFileSelec(true);	//a file has been selected, so this is set to true
    //updates the trainData state
		parseCSV(event.target.files[0], 'train');
	}

	//this function handles the even that is triggered when someone changes the file they want to use
	let changeLabelHandler = (event) => {

		//these two lines update the state of the page
		setSelectedLabelFile(event.target.files[0]);//sets the selected file
		setIsLabelFileSelec(true);//a file has been selected, so this is set to true
		parseCSV(event.target.files[0], 'label');
	}

	let changeTestHandler = (event) => {

		//these two lines update the state of the page
		setSelectedTestFile(event.target.files[0]);//sets the selected file
		setIsTestFileSelec(true);//a file has been selected, so this is set to true
    //parses the test file, then stores the result in testData
		parseCSV(event.target.files[0], 'test');
	}


  let handleRun = () => {
    let url = "https://team-25-362714.uc.r.appspot.com/predict"
 
    if(isTestFileSelect){
      let data = {
        X: testData,
        uuid: currentUser.uid
      }

      let jsonString = JSON.stringify(data)

      console.log(jsonString)

      let xhr = new XMLHttpRequest()
      xhr.open("POST", url)
      xhr.send(jsonString)

      console.log(xhr.response)
    } else {
      alert("Must select test data first")
    }

  }

  let parseCSV = (file, type) => {
    return Papa.parse(file,
      {
        complete: function(results) {
          if(type == 'train')
          {
            setTrainData(results.data) //update Traindata state
          }
          else if(type == 'label')
          {
            setLabelData(results.data) //update LabelData state
          }
          else if(type == 'test')
          {
            setTestData(results.data) //update TestData state
          }
        }
      });
  }
  //Returns the following html
  return (
  
    //Create a Form to contain all of our inputs
  <Container>

	<Form>
    
    {/* Create a new Form Group For Getting Model */}
    <Form.Group className="mb-3" controlId="modelChoice">
    {/* Label For Choose Model */}
    <Form.Label>Choose Your Model</Form.Label>
    {/* Create element for user to choose Model */}
    <Form.Select aria-label="Model Select">
      {/* Placeholder for actual model */}
      <option disabled>Example Model</option>
    </Form.Select>
    </Form.Group>

    {/* Label for Model Usage */}
    <Form.Label>Use Model</Form.Label>
    {/* Create a Form Group For Using Model */}
    <Form.Group className="mb-3" controlId="modelUsage">

      {/* Another label for File Select */}
      <Form.Label>Test File</Form.Label>
      {/* File Select Button */}
      <Form.Control type="file" name="file" onChange={changeTestHandler}></Form.Control>

    {/* Create a button that runs the model with the input file*/}
    <Button type="button" onClick={handleRun}>Run</Button>
    </Form.Group>

    <Form.Label>Download Model</Form.Label>
    {/* Create another form group to represent downlooad model */}
    <Form.Group className="mb-3" controlId="modelDownload">
      {/* Create a label For Downloading Model */}
      
      {/* Create a button that downloads the model */}
      <Button type="button">Download</Button>
      </Form.Group>
    <Form.Label>Output</Form.Label>
		  <p>{model_output}</p>
  </Form>
  </Container>
  );
}

//Export ModelUsage for Dashboard
export default ModelUsage;
