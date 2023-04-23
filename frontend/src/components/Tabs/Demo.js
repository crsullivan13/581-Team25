/*
Name: Demo.js
Description: The base component for the demo page
Programmers: Connor Sullivan, Amith Panuganti 
Creation Date: 11/05/22
Revisions:
	11/05/22 - Initial build of the file
    4/23/23 - Added Decision Tree Demo
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
import Col from 'react-bootstrap/Col'
import { useState } from 'react';
import DemoItem from '../DemoItem';
import DecisionTreeDemo from './DecisionTreeDemo';
import MLPDemo from './MLPDemo';
import { Navbar } from "react-bootstrap"
import { Nav } from "react-bootstrap"

function Demo(){
    //sate to hold model type that user wants to demo, defaults to linear
    const [ModelType, setModelType] = useState('Linear Regression')

    //function to change model type when drop down option selected
    let modelTypeChange = (modelType) => {
        //grabs the value out of the form
        //let modelType = document.getElementById('modelTypeInput').value;
        //sets the state
        setModelType(modelType);
    }

     //Make a dict of tags
     let demoTags = {
            "Decision Tree":<DecisionTreeDemo></DecisionTreeDemo>,
            "Multilayer Perceptron":<MLPDemo></MLPDemo>
     }

    return(
       
        <>
        <div id="top-level_wrapper">
            <Container fluid>
                <Row>
                    <Col md="auto">
                        <Navbar bg="light" variant="light">
                            <Container fluid>
                                <Nav navbarScroll className="flex-column" activeKey={ModelType} onSelect={(selectedKey => modelTypeChange(selectedKey))}>
                                    <h3>Demo options</h3>
                                    <Nav.Link eventKey="Linear Regression">Linear Regression</Nav.Link>
                                    <Nav.Link eventKey="Logistic Regression">Logistic Regression</Nav.Link>
                                    <Nav.Link eventKey="Decision Tree">Decision Tree</Nav.Link>
                                    <Nav.Link eventKey="Multilayer Perceptron">Multilayer Perceptron</Nav.Link>
                                    <Nav.Link eventKey="General Model Training">General Model Training</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    </Col>
                    <Col>
                        {(demoTags[ModelType] !== undefined) 
                            ? demoTags[ModelType]
                            : <DemoItem modelType={ModelType}/>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )

}

export default Demo;
