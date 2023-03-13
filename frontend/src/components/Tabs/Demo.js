/*
Name: Demo.js
Description: The base component for the demo page
Programmers: Connor Sullivan
Creation Date: 11/05/22
Revisions:
	11/05/22 - Initial build of the file
Preconditions: None
Errors: None
Side Effects: New models will be trained on this page
Invariants: None
Faults: None
*/

//imports
import React from 'react';
import { Container, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import { useState } from 'react';
import DemoItem from '../DemoItem';
import { LogisticRegressionPart1Front, LogisticRegressionPart1After} from './LogisticRegressionDemo';
import LogisticRegressionPart from "./LogisticRegressionDemo"
import GeneralDemoPart from "./GeneralDemo"
import MLPDemo from './MLPDemo';

function Demo(){
    //sate to hold model type that user wants to demo, defaults to linear
    const [ModelType, setModelType] = useState('Linear Regression')

    //function to change model type when drop down option selected
    let modelTypeChange = () => {
        //grabs the value out of the form
        let modelType = document.getElementById('modelTypeInput').value;
        //sets the state
        setModelType(modelType);
    }

    return(
        <>
            <Container>
                <h1 className='w-100 mt-2'>ML Demos</h1>
                <p>This page is where you can look to gain more information about the different mdoels that we offer</p>
                <Row>
                    <h3 className='w-100 mt-2'>Which model would you like to demo?</h3>
                    {/*basic drop down form for model demo selection*/}
                    <Form.Select id="modelTypeInput" aria-label="Model Select" onChange={modelTypeChange}>
                        <option>Linear Regression</option>
                        <option>Logistic Regression</option>
                        <option>Decision Tree Classification</option>
                        <option>Multilayer Perceptron</option>
                        <option>General Model Training</option>
                    </Form.Select>
                </Row>
                <Row>
                    {/*render the component that will show the useful info on this page, modeltype as a prop*/}
                    {/*If model type is logisitc regression, then run LogisitcRegressionDemo. Otherwise, run demo item*/ }
                    {(ModelType === "Multilayer Perceptron") 
                        ? <MLPDemo></MLPDemo>
                        : <DemoItem modelType={ModelType}/>
                    }
                    
                </Row>
            </Container>
        </>
    )

}

export default Demo;
