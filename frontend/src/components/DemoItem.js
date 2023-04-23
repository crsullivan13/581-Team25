/*
Name: DemoItem.js
Description: The sub component for the demo page, contains the info for each model
Programmers: Connor Sullivan, Amith Panuganti
Creation Date: 11/05/22
Revisions:
	11/05/22 - Initial build of the file
Revisions:
    1/18/23
        Programmer: Amith Panuganti
        Edit: Add Route for Decision Tree Demo
    1/19/23
        Programmer: Amith Panuganti
        Edit: Fix problem with decision tree not loading
    1/21/23
        Programmer: Amith Panuganti
        Edit: Change Decision Tree Regressions to Decision Tree Classification
              I believe that using a classification model for be a better fit for the project
    4/23/23
        Programmer: Amith Panuganti
        Edit: Remove Deicision Tree from Demo Item. There is a seperate demo for the tree
Preconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//imports
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import { useState } from 'react';
import configData from '../config/config.json'
import {useAuth} from "../contexts/AuthContext"
import Modal from 'react-bootstrap/Modal'
import DecisionTree from './Tabs/DecisionTree';
import FigLinearRegres from './Tabs/FigLinearRegres';
import FigLogisticRegres from './Tabs/FigLogisticRegres';
import DecisionTreeDemo from './Tabs/DecisionTreeDemo';
import { Chart } from "react-google-charts";
import LogisticRegressionPart, { LogisticRegressionPart1After, LogisticRegressionPart1Front
                                 , LogisticRegressionPart2Front, LogisticRegressionPart2After 
                                 , LogisticRegressionPart3Front} from './Tabs/LogisticRegressionDemo';

function DemoItem(props){
    //need auth context to get uuid
    const { currentUser } = useAuth()

    //states for data
    const [XData, setXData] = useState();
    const [YData, setYData] = useState();
    const [model_data, setModelData] = useState({});

    //sate for returned values
    const [ReturnedModel, setReturnedModel] = useState()

    const [show, setShow] = useState(false);
	const [requestError, setReqError] = useState();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    const data = [
        ["Diameter", "Age"],
        [8, 37],
        [4, 19.5],
        [11, 52],
        [4, 22],
        [3, 16.5],
        [6.5, 32.8],
        [14, 72],
      ];
      
      const options = {
        title: "Age of sugar maples vs. trunk diameter, in inches",
        hAxis: { title: "Diameter" },
        vAxis: { title: "Age" },
        legend: "none",
        trendlines: { 0: {} },
      };

     const data2 = [
        ["Generation", "Descendants"],
        [0, 1],
        [1, 33],
        [2, 269],
        [3, 2013],
      ];
      
      const options2 = {
        title: "Descendants by Generation",
        hAxis: { title: "Generation", minValue: 0, maxValue: 3 },
        vAxis: { title: "Descendants", minValue: 0, maxValue: 2100 },
        trendlines: {
          0: {},
        },
      };

      const options3 = {
        title: "Descendants by Generation",
        hAxis: { title: "Generation", minValue: 0, maxValue: 3 },
        vAxis: { title: "Descendants", minValue: 0, maxValue: 2100 },
        trendlines: {
          0: {
              type: "exponential",
          },
        },
      };

    //currently not in use, but could set the data values
    let dataSetChange = () => {
        let dataSet = document.getElementById('dataSetInput').value;
        if(dataSet != 'None'){
            console.log(document.getElementById('dataSetInput').value)
            console.log(props.modelType)
            switch(props.modelType){
                case "Linear Regression":
                    if(dataSet === 'Set One'){
                        //set x data from config file
                        setXData(configData.LINEAR_DEMO_DATA.ONE.X);
                        //set y data from config file
                        setYData(configData.LINEAR_DEMO_DATA.ONE.y);
                        //return the text info fro the model
                    } else {
                            //set x data from config file
                        setXData(configData.LINEAR_DEMO_DATA.TWO.X);
                        //set y data from config file
                        setYData(configData.LINEAR_DEMO_DATA.TWO.y);
                        //return the text info fro the model
                    }

                    break;
                case "Logistic Regression":
                    if(dataSet === 'Set One'){
                        //set x data from config file
                        setXData(configData.LOGISTIC_DEMO_DATA.ONE.X);
                        //set y data from config file
                        setYData(configData.LOGISTIC_DEMO_DATA.ONE.y);
                        //return the text info fro the model
                    } else {
                            //set x data from config file
                        setXData(configData.LOGISTIC_DEMO_DATA.TWO.X);
                        //set y data from config file
                        setYData(configData.LOGISTIC_DEMO_DATA.TWO.y);
                        //return the text info fro the model
                    }
                    break;
                 case "General Model Training":
                    if(dataSet === 'Set One'){
                        //set x data from config file
                        setXData(configData.DTREE_DEMO_DATA.ONE.X);
                        //set y data from config file
                        setYData(configData.DTREE_DEMO_DATA.ONE.y);
                        //return the text info fro the model
                    } else {
                            //set x data from config file
                        setXData(configData.DTREE_DEMO_DATA.TWO.X);
                        //set y data from config file
                        setYData(configData.DTREE_DEMO_DATA.TWO.y);
                        //return the text info fro the model
                    }
                    break;
                default:
            }
		}
    }

    //internal component, this sets the data that we want to use and the text to display
    let DemoType = () =>
	{
		//check the state representing the kind of model
		switch(props.modelType){
			case "Linear Regression":
                //dataSetChange()
                //return the text info fro the model
				return(<><p> {configData.DEMOS.LINEAR_TXT_ONE} <br/> <br/>{configData.DEMOS.LINEAR_TXT_TWO} <br/><br/> {configData.DEMOS.LINEAR_TXT_THREE}</p><Chart
                chartType="ScatterChart"
                width="80%"
                height="400px"
                data={data}
                options={options}
                />
                <p>One trait to always remember about a linear regression model is that it assumes the data follows a linear trend.
                    In the above scatter plot, you can see that the data is very linear and therefore well suited for a linear regression model.</p>
                <Chart
                chartType="ScatterChart"
                width="80%"
                height="400px"
                data={data2}
                options={options2}
                />    
                <p>If you compare the previous plot with this plot, you can clearly see how linear regression starts to struggle with data that is not linear.
                    The above data would be better fit by a polynomial line, therefore linear regression will fail to properly predict values for this data set.</p>
                    <Chart
                chartType="ScatterChart"
                width="80%"
                height="400px"
                data={data2}
                options={options3}
                /> 
                <p>Below is a visual aid. With this, you can move data points and the line itself to get an idea of how the data can affect whether or not
                    linear regression is a good model to use:</p><FigLinearRegres height="300px" width="300px"/> </>);
                
				break;

			case "Logistic Regression":
                //dataSetChange()
				return(<><LogisticRegressionPart 
                        front={<LogisticRegressionPart1Front></LogisticRegressionPart1Front>}
                        back={<LogisticRegressionPart1After></LogisticRegressionPart1After>}
                        modle="Logistic Regression Demo Part 1"
                        X={configData.LOGISTIC_DEMO_DATA.ONE.X}
                        Y={configData.LOGISTIC_DEMO_DATA.ONE.Y}/>
                        <h1 className='w-100 mt-2'>Sigmoid Function</h1>
                        <LogisticRegressionPart 
                        front={<LogisticRegressionPart2Front></LogisticRegressionPart2Front>}
                        back={<LogisticRegressionPart2After></LogisticRegressionPart2After>}
                        modle="Logistic Regression Demo Part 2"
                        X={configData.LOGISTIC_DEMO_DATA.ONE.X}
                        Y={configData.LOGISTIC_DEMO_DATA.ONE.Y}/>
                        <h1 className='w-100 mt-2'>Strengths and Weaknesses</h1>
                        <LogisticRegressionPart 
                        front={<LogisticRegressionPart3Front></LogisticRegressionPart3Front>}
                        back={<LogisticRegressionPart2After></LogisticRegressionPart2After>}
                        modle="Logistic Regression Demo Part 3"
                        X={configData.LOGISTIC_DEMO_DATA.ONE.X}
                        Y={configData.LOGISTIC_DEMO_DATA.ONE.Y}/></>);
				break;
			case "General Model Training":
                //dataSetChange()
				return(<><p>{configData.DEMOS.GENERAL_TXT}</p></>);
				break;
			default:

		}
	}

    let image;
    //http request builder, sender and reciever
    let handleTrain =  () => {
            if(document.getElementById('dataSetInput').value != 'None'){
                //log data for debug
		        console.log(model_data);
				//url for training
				let url = "http://127.0.0.1:5000//fit"

                    //set the fields for the json
                    model_data["model"] = props.modelType
					model_data["X"] = XData
					model_data["y"] = YData
					model_data["uuid"] = currentUser.uid

                    //make request json string, then log for debug
					let jsonString = JSON.stringify(model_data)
					console.log(jsonString)

                    //create the request object, set the url and request type, set the body
					let xhr = new XMLHttpRequest()
					xhr.open("POST", url, false)
                    xhr.onload = function() {
                        if(xhr.status === 200) {
                            let jsonResponse = JSON.parse(xhr.responseText)
                            if(jsonResponse.hasOwnProperty('figure'))
                            {
                                const image = "data:image/png;base64,"+jsonResponse.figure;
                                let element = <img alt="Figure" src={image}></img>
                                setReturnedModel(element)
                            } else {
                                var response = "Error: " + jsonResponse.Error 
                                setReturnedModel(response)
                            }
                        } else {
                            let error = 'Error ' + xhr.status + ': ' + xhr.statusText;
							handleReqError(error);
                        }
                    }

                    xhr.onerror = function() {
						let error = 'Network error. Request was not made (most likely a CORS error).';
						handleReqError(error);
					}

					xhr.send(jsonString)
            }else {
                alert("Select data set first")
            }
	}

    let handleReqError = (error) => {
		setReqError(error)
		handleShow();
	}

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Request Error!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{requestError}</Modal.Body>
            </Modal>

            <Container>
                <Row>
                    <h1 className='w-100 mt-2'>{props.modelType}</h1>
                    {/*internal component render*/}
                    <DemoType />
                </Row>
                <Row>
                    <h3 className='w-100 mt-2'>Select a data set to demo</h3>
                    {/*simple drop down for data set selection*/}
                    <Form.Select id="dataSetInput" aria-label="Model Select" onChange={dataSetChange}>
                        <option>None</option>
                        <option>Set One</option>
                        <option>Set Two</option>
                    </Form.Select>
                </Row>
                <Row>
		            {/*button to begin training*/}
                    <br></br>
                    <Button type="button" onClick={handleTrain}>Train</Button>
                </Row>
                <Row>
                <h3 className='w-100 mt-2'>Loss for this demo set's trained model</h3>
                <br></br>
                {/*show return values*/}
	            <div>{ReturnedModel}</div>
                </Row>
                {image}
            </Container>
        </>
    )

}

export default DemoItem;
