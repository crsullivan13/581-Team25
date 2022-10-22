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

	//state that represents the data object that is passed into the regression method for Linear Regression
	const [linearRegressionData, setLinearRegressionData] = useState({});

	//TODO - make handlers for each hyperparameter input, and in the handlers update the data state


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
					<Form.Label>Linear Regression Hyperparameters</Form.Label>{/* There are descriptions of each hyperparameter in regressions.py*/}
					<Col>
						<Form.Label>Penalty</Form.Label>{/* The penalty hyperparameter*/}
						<Form.Select defaultValue="l2">
							<option>l1</option>{/*Options for the penalty hyperparameter*/}
							<option>l2</option>
							<option>elasticnet</option>
							<option>none</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Dual</Form.Label>{/*The dual hyperparameter*/}
						<Form.Select defaultValue="False">
							<option>True</option>{/*True and false options for dual*/}
							<option>False</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Tolerance</Form.Label><br/>{/*Tolerance Hyperparameter*/}
						<input type="number" placeholder="0.00001"></input>{/*numerical input for tolerance*/}
					</Col>
					<Col>
						<Form.Label>C</Form.Label>{/*C hyperparameter*/}
						<br/>
						<input type="number" placeholder="1.0"></input> {/*Numerical input for C*/}
					</Col>
					</Row><Row>
					<Col>
						<Form.Label>Fit Intercept</Form.Label>{/*Fit intercept hyperparameter*/}
						<Form.Select defaultValue="True">
							<option>True</option>{/*True/false options for fit intercept*/}
							<option>False</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Intercept Scaling</Form.Label>{/*Intercept Scaling */}
						<input type="number" placeholder="1.0"></input>{/*numerical input for intercept scaling*/}
					</Col>
					<Col>
						<Form.Label>Class Weight</Form.Label>{/*class weight hyperparameter - Weights associated with classes in the form {class_label: weight}. If not given, all classes are supposed to have weight one.*/}
						<Form.Select defaultValue="None">{/**/}
							<option>None</option>{/*options for class weight*/}
							<option>Balanced</option>
							<option>Custom</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Random State</Form.Label>{/*random state hyperparameter Used when solver == ‘sag’, ‘saga’ or ‘liblinear’ to shuffle the data.*/}
						<input type="number" placeholder="-1"></input>{/*numerical input*/}
					</Col>
					</Row><Row>
					<Col>
						<Form.Label>Solver</Form.Label>{/*solver hyperparameter - Algorithm to use in the optimization problem. Default is ‘lbfgs’. To choose a solver, you might want to consider the following aspects:*/}
						<Form.Select defaultValue="lbfgs">
							<option>newton-cg</option>{/*options for solver hyperparameter*/}
							<option>lbfgs</option>
							<option>liblinear</option>
							<option>sag</option>
							<option>saga</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Max Iterations</Form.Label><br/>{/*Max iterations - Maximum number of iterations taken for the solvers to converge.*/}
						<input type="number" placeholder="100"></input>{/*numerical input*/}
					</Col>
					<Col>
						<Form.Label>Multi Class</Form.Label>{/*Multi Class - If the option chosen is ‘ovr’, then a binary problem is fit for each label. For ‘multinomial’ the loss minimised is the multinomial loss fit across the entire probability distribution, even when the data is binary. */}
						<Form.Select defaultValue="auto">
							<option>auto</option>{/*options*/}
							<option>ovr</option>
							<option>multinomial</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>Verbose</Form.Label><br/>{/*Verbose hyperparameter - For the liblinear and lbfgs solvers set verbose to any positive number for verbosity.*/}
						<input type="number" placeholder="0"></input>{/*numerical input*/}
					</Col>
					</Row><Row>
					<Col>
						<Form.Label>Warm Start</Form.Label>{/*Warm start hyperparameter - When set to True, reuse the solution of the previous call to fit as initialization, otherwise, just erase the previous solution.*/}
						<Form.Select defaultValue="False">
							<option>True</option>{/*true/false for warm start*/}
							<option>False</option>
						</Form.Select>
					</Col>
					<Col>
						<Form.Label>N Jobs</Form.Label><br/>{/*N Jobs hyperparameterNumber of CPU cores used when parallelizing over classes if multi_class=’ovr’”. This parameter is ignored when the solver is set to ‘liblinear’ regardless of whether ‘multi_class’ is specified or not. None means 1 unless in a joblib.parallel_backend context. -1 means using all processors. See Glossary for more details.*/}
						<input type="number" placeholder="1"></input>
					</Col>
					<Col>
						<Form.Label>L1 Ratio</Form.Label><br/>{/**the Elastic-Net mixing parameter, with 0 <= l1_ratio <= 1. */}
						<input type="number" placeholder="1"></input>
					</Col>
					</Row>
				</Form.Group>
				);
				break;
			case "Decision Tree":
				return(
					<Form.Group>
						<Form.Label>Decision Tree Hyperparameters</Form.Label>{/*Hyperparameter options for the decision tree model* */}
						<Row>
						<Col>
							<Form.Label>Criterion</Form.Label>{/**The function to measure the quality of a split.  */}
							<Form.Select defaultValue="squared_error">{/**select input for criterion */}
								<option>squared_error</option>{/** options*/}
								<option>friedman_mse</option>
								<option>absolute_error</option>
								<option>poisson</option>
							</Form.Select>
						</Col>
						<Col>
							<Form.Label>Splitter</Form.Label>{/**The strategy used to choose the split at each node.  */}
							<Form.Select defaultValue="best">{/** */}
								<option>best</option>{/** */}
								<option>random</option>
							</Form.Select>
						</Col>
						<Col>
							<Form.Label>Max Depth</Form.Label><br/>{/** The maximum depth of the tree. If None, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples.*/}
							<input type="number" placeholder="-1"></input>{/** */}
						</Col>
						<Col>
							<Form.Label>Min Samples Split</Form.Label><br/>{/** The minimum number of samples required to split an internal node:*/}
							<input type="number" placeholder="2"></input>{/** */}
						</Col>
						</Row><Row>
						<Col>
							<Form.Label>Min Samples Leaf</Form.Label><br/>{/** The minimum number of samples required to be at a leaf node. */}
							<input type="number" placeholder="1"></input>{/** */}
						</Col>
						<Col>
							<Form.Label>Min Weight Fraction Leaf</Form.Label><br/>{/**The minimum weighted fraction of the sum total of weights (of all the input samples) required to be at a leaf node.  */}
							<input type="number" placeholder="0.0"></input>{/** */}
						</Col>
						<Col>
							<Form.Label>Max Features</Form.Label>{/**The number of features to consider when looking for the best split: */}
							<Form.Select defaultValue="">
								<option>auto</option>
								<option>sqrt</option>
								<option>log2</option>
							</Form.Select>
						</Col>
						<Col>
							<Form.Label>Random State</Form.Label><br/>{/** Controls the randomness of the estimator. The features are always randomly permuted at each split, even if splitter is set to "best". */}
							<input type="number" placeholder="-1"></input>{/** */}
						</Col>
						</Row><Row>
						<Col>
							<Form.Label>Max Leaf Nodes</Form.Label><br/>{/**Grow a tree with max_leaf_nodes in best-first fashion. Best nodes are defined as relative reduction in impurity.  */}
							<input type="number" placeholder="-1"></input>{/** */}
						</Col>
						<Col>
							<Form.Label>Min Impurity Decrease</Form.Label><br/>{/**A node will be split if this split induces a decrease of the impurity greater than or equal to this value. */}
							<input type="number" placeholder="0"></input>{/** */}
						</Col>
						<Col>
							<Form.Label>CCP Alpha</Form.Label><br/>{/*Complexity parameter used for Minimal Cost-Complexity Pruning. The subtree with the largest cost complexity that is smaller than ccp_alpha will be chosen. By default, no pruning is performed. * */}
							<input type="number" placeholder="0"></input>{/** */}
						</Col>
						</Row>
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
		<h1 className="w-100 mt-2">Choose Model To Train</h1>
		<Form.Select id="modelTypeInput" aria-label="Model Select" onChange={modelTypeChanged}>
      	{/* Placeholder for actual model */}
			<option>Linear Regression</option>
			<option>Decision Tree</option>
			<option>MNIST Classifier</option>
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
