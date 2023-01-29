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

import { useState, useEffect} from 'react';
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

  //state that is a list of models that have been created, just one for now
  const [model_list, setModelList] = useState([]);
  


  let getModelNames = () => {
    //"https://team-25-362714.uc.r.appspot.com/get_models"
    //"http://127.0.0.1:5000/get_models" - for local testing
    let url = "https://team-25-362714.uc.r.appspot.com/get_models"

			//setup http request
			let xhr = new XMLHttpRequest()
			//post request with above url
			xhr.open("GET", url)
			//send the request with the json string as body
      let user_data = {
        "id" : 1,
      }
			xhr.send(JSON.stringify(user_data))
			
			//called when http request finished
			xhr.onload = function() {
				//when we get a 200 we do some parsing to display the output
				if(xhr.status == 200) {
					let msg = "Request was successful"
          //TODO handle req result using code in Training.js
					//handleReqResult(msg)
					
					//Parse the response 
					var jsonResponse = JSON.parse(xhr.responseText)
          setModelList(jsonResponse["names"])
          console.log(model_list)
				} else {
					//get here if we get and error status from the http response
					let error = 'Error ' + xhr.status + ': ' + xhr.statusText;
          console.log(error);
					//pass the error to our error handler, will be displayed in the modal
					//handleReqResult(error);
				}
			}

			//this is called when the http is unable to be sent, means a network error
			xhr.onerror = function() {
				//set error to what this network issue generally is
				let error = 'Network error. Request was not made (most likely a CORS error).';
				//display it in the modal
				//handleReqResult(error);
			}
  }


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
      xhr.open("POST", url, false)
      xhr.send(jsonString)

      console.log(xhr.response)

      setModelOutput(xhr.response)
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
        }, dynamicTyping: true
      });
  }

  let makeOptionFromArray = (X) => {
    return <option key={X}>{X}</option>
  }

  //initializes the available models to run
  useEffect(()=>{
    getModelNames()
  }, [])

  //Returns the following html
  return (
    //Retrieve names of models from the database, then when the run button is pressed call the predict method from the backend.
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

      {model_list.map(makeOptionFromArray)}
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
