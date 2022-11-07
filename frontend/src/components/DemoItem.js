/*
Name: DemoItem.js
Description: The sub component for the demo page, contains the info for each model
Programmers: Connor Sullivan
Creation Date: 11/05/22
Revisions:
	11/05/22 - Initial build of the file
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

function DemoItem(props){
    //need auth context to get uuid
    const { currentUser } = useAuth()

    //states for data
    const [XData, setXData] = useState();
    const [YData, setYData] = useState();
    const [model_data, setModelData] = useState({});

    //sate for returned values
    const [ReturnedModel, setReturnedModel] = useState()

    //currently not in use, but could set the data values
    let dataSetChange = () => {
        let dataSet = document.getElementById('dataSetInput').value;
        if(dataSet != 'None'){
            console.log(document.getElementById('dataSetInput').value)
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
                        setYData(configData.LOGTISITC_DEMO_DATA.ONE.y);
                        //return the text info fro the model
                    } else {
                            //set x data from config file
                        setXData(configData.LOGTISTIC_DEMO_DATA.TWO.X);
                        //set y data from config file
                        setYData(configData.LOGTISTIC_DEMO_DATA.TWO.y);
                        //return the text info fro the model
                    }
                    break;
                case "Decision Tree Regression":
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
				return(<><p>{configData.DEMOS.LINEAR_TXT}</p></>);
				break;
			case "Logistic Regression":
                //dataSetChange()
				return(<><p>{configData.DEMOS.LOGISTIC_TXT}</p></>);
				break;
			case "Decision Tree Regression":
                //dataSetChange()
				return(<><p>{configData.DEMOS.DTREE_TXT}</p></>);
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
				let url = "https://team-25-362714.uc.r.appspot.com/fit"

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
					xhr.send(jsonString)
                    
                    //log the response, pull out the loss value and set the return state
                    console.log(xhr.response)
					setReturnedModel(JSON.parse(xhr.response).loss)

                    //for dtree we want to display the image, if it is dtree convert the bytes to png and set the image
                    if(props.modelType === 'Decision Tree Regression'){
                        image = new Image();
                        image.src = JSON.parse(xhr.response).figure
                    } else {
                        image = '';
                    }
            }else {
                alert("Select data set first")
            }
	}

    return(
        <>
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
	            <p>{ReturnedModel}</p>
                </Row>
                {image}
            </Container>
        </>
    )

}

export default DemoItem;