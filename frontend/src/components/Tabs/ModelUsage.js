/*
Name: ModelUsage.js
Description: Allows the user to use model they made
Programmers: Amith Panuganti, TODO 
Creation Date: TODO
Revisions:
    TODO
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

//Represents the interface for Model Usage
//Inputs: None
//Output: HTML to represent Interface for Model Usage
function ModelUsage() {
	
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
      <Form.Label>Input File</Form.Label>
      {/* File Select Button */}
      <Form.Control type="file"></Form.Control>

    {/* Create a button that runs the model with the input file*/}
    <Button type="button">Run</Button>
    </Form.Group>

    <Form.Label>Download Model</Form.Label>
    {/* Create another form group to represent downlooad model */}
    <Form.Group className="mb-3" controlId="modelDownload">
      {/* Create a label For Downloading Model */}
      
      {/* Create a button that downloads the model */}
      <Button type="button">Download</Button>
      </Form.Group>
  </Form>
  </Container>
  );
}

//Export ModelUsage for Dashboard
export default ModelUsage;
