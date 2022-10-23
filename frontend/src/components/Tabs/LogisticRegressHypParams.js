/*
Name: LogisticRegressHypParams.js
Description: A collection of inputs that will change the parent state - the inputs are the hyperparameters for the Logisticregression model
Programmers: Griffin Keeter
Creation Date: 10/21/22
Preconditions: 
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//Import React
import {React, useState, useEffect} from "react"
import { Form, Button, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput";

// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function LogisticRegressHypParams(props) {

  //TODO - add handlers for each hyperparameter input
 
  let setModelDataLiR = () => {
    let data = {"newdatatest": "three"}
    console.log("in child: parent state is");
    console.log(props.model_data_p); //the value of the parent before being updated
    props.setModelDataLoR(data); //updated the value of the parent state
  }

  //Return following HTML code, containing all the inputs
  return(
    <Form.Group>
      <input value={props.model_data_LiR} 
               onChange={setModelDataLiR} />
      <Row>
      <Form.Label>Logistic Regression Hyperparameters</Form.Label>{/* There are descriptions of each hyperparameter in regressions.py*/}
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
}

//Export LogisticRegressHypParams for Dashboard
export default LogisticRegressHypParams;
