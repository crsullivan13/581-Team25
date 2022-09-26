/*
Name: ModelMetrics.js
Description: Output metrics of a model after training
Programmers: Amith Panuganti, TODO 
Creation Date: TODO
Revisions:
    TODO
	9/25/22: 
        Revision: Impliment Interface for Model Metrics
        Author: Amith Panuganti 
Preconditions: Model must finish training before metrics
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//Import React
import React from "react"
import { Container, Form} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';

// Return HTML Page of Model Metrics
//Input: None
//Output: HTML Page of Model Metrics
function ModelMetrics() {
  //Return following HTML code
  return (
  <>
  {/* Put everything in a Container*/}
    <Container>
      {/* Create a header for Graphs */}
      <h1 className="w-100 text-center mt-2">Graphs</h1>

      {/* Create Radio Buttons To Represent Differnt Graph Choices*/}
      <Form.Check label="Loss Over Epochs" id="LossEpoch"></Form.Check>
      <Form.Check label="Accuracy Over Epochs" id="AccuracyEpoch"></Form.Check>

      {/* Create another head for Epochs Metrics*/}
      <h1 className="w-100 text-center mt-2">Epochs Metrics</h1>

      {/* Create a radio button to represent best epoch */}
      <Form.Check label="Best Epoch" id="BestEpoch"></Form.Check>

      {/* Create an input for a range of numbers */}
      <Form.Label>Range of Epochs:</Form.Label>
      <Form.Control type="text"></Form.Control>

      {/* This is temporary. Will show each epoch menu*/}
      <h1 className="w-100 text-center mt-2">Epoch #</h1>

      {/* Get a DropDown Menu to decide metrics */}
      <Dropdown>
        {/* Create button */}
        <Dropdown.Toggle id="dropdown-basic">
          Metrics
        </Dropdown.Toggle>

        {/* Drop down Menu */}
      <Dropdown.Menu>
        {/* Item for Train Loss */}
      <Dropdown.Item>Train Loss</Dropdown.Item>
       {/* Item for Validation Loss */}
       <Dropdown.Item>Validation Loss</Dropdown.Item>
        {/* Item for Test Loss */}
      <Dropdown.Item>Test Loss</Dropdown.Item>
       {/* Item for Train Accuracy */}
       <Dropdown.Item>Train Accuracy</Dropdown.Item>
        {/* Item for Validation Accuracy*/}
      <Dropdown.Item>Validation Accuracy</Dropdown.Item>
       {/* Item for Test Accuracy */}
       <Dropdown.Item>Test Accuracy</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
    </Container>
  </>
  );
}

//Export ModelMetrics for Dashboard
export default ModelMetrics;
