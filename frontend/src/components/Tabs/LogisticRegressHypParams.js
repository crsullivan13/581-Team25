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
import React from "react"
import {useState, useEffect} from "react"
import { Form, Button, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput";

// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function LogisticRegressHypParams(props) {

  //TODO - add handlers for each hyperparameter input
   //TODO - add checks on the validity of each input for each input
  let penalty_change = ()=>{
    let val = document.getElementById("penalty").value;
    props.model_data_p["penalty"] = val;
  }
  let dual_change = ()=>{
    let val = document.getElementById("dual").value;
    props.model_data_p["dual"] = (val.toLowerCase() == "true");
  }
  let tol_change = ()=>{
    let val = document.getElementById("tol").value;
    props.model_data_p["tol"] = Number(val);
  }
  let C_change = ()=>{
    let val = document.getElementById("C").value;
    props.model_data_p["C"] = Number(val);
  }
  let fit_intercept_change = ()=>{
    let val = document.getElementById("fit_intercept").value;
    props.model_data_p["fit_intercept"] = (val.toLowerCase() == "true");
  }
  let intercept_scaling_change = ()=>{
    let val = document.getElementById("intercept_scaling").value;
    props.model_data_p["intercept_scaling"] = Number(val);
  }
  let class_weight_change = ()=>{
    let val = document.getElementById("class_weight").value;
    props.model_data_p["class_weight"] = val;
  }
  let random_state_change = ()=>{
    let val = document.getElementById("random_state").value;
    props.model_data_p["random_state"] = parseInt(val);
  }
  let solver_change = ()=>{
    let val = document.getElementById("solver").value;
    props.model_data_p["solver"] = val;
  }
  let max_iter_change = ()=>{
    let val = document.getElementById("max_iter").value;
    props.model_data_p["max_iter"] = parseInt(val);
  }
  let multi_class_change = ()=>{
    let val = document.getElementById("multi_class").value;
    props.model_data_p["multi_class"] = val;
  }
  let verbose_change = ()=>{
    let val = document.getElementById("verbose").value;
    props.model_data_p["verbose"] = parseInt(val);
  }
  let warm_start_change = ()=>{
    let val = document.getElementById("warm_start").value;
    props.model_data_p["warm_start"] = (val.toLowerCase() == "true");
  }
  let n_jobs_change = ()=>{
    let val = document.getElementById("n_jobs").value;
    props.model_data_p["n_jobs"] = parseInt(val);
  }
  let l1_ratio_change = ()=>{
    let val = document.getElementById("l1_ratio").value;
    props.model_data_p["l1_ratio"] = Number(val);
  }


  React.useEffect(() => {
    // Runs after the first render() lifecycle
    //set default values:*/
    props.model_data_p["model"] = "Logistic Regression";
    penalty_change() //call the handler for criterion*/
    dual_change()//call the handler for splitter*/
    tol_change() //call the handler for max_depth*/
    C_change() //call the handler for min_samples_split*/
    fit_intercept_change() //call the handler for min_samples_leaf*
    intercept_scaling_change() //call the handler for min_weight_frac_leaf*
    class_weight_change() //call the handler for max_features*/
    random_state_change() //call the handler for random_state*/
    solver_change() //call the handler for max_leaf_nodes*/
    max_iter_change()//call the handler for min_impurity_decrease*/
    verbose_change()//call the handler for ccp_alpha_change}*/
    warm_start_change();//call the handler for ccp_alpha_change}*/
    n_jobs_change();//call the handler for ccp_alpha_change}*/
    l1_ratio_change();//call the handler for ccp_alpha_change}*/

  }, []);


  //Return following HTML code, containing all the inputs
  return(
    <Form.Group>
      <Row>
      <Form.Label>Logistic Regression Hyperparameters</Form.Label>{/* There are descriptions of each hyperparameter in regressions.py*/}
      <Col>
        <Form.Label>Penalty</Form.Label>{/* The penalty hyperparameter*/}
        <Form.Select id="penalty" onChange={penalty_change} defaultValue="l2">
          <option>l1</option>{/*Options for the penalty hyperparameter*/}
          <option>l2</option>
          <option>elasticnet</option>
          <option>none</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Dual</Form.Label>{/*The dual hyperparameter*/}
        <Form.Select id="dual" onChange={dual_change} defaultValue="False">
          <option>True</option>{/*True and false options for dual*/}
          <option>False</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Tolerance</Form.Label><br/>{/*Tolerance Hyperparameter*/}
        <input id="tol" onChange={tol_change} type="number" placeholder="0.00001"></input>{/*numerical input for tolerance*/}
      </Col>
      <Col>
        <Form.Label>C</Form.Label>{/*C hyperparameter*/}
        <br/>
        <input id="C" onChange={C_change} type="number" placeholder="1.0"></input> {/*Numerical input for C*/}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Fit Intercept</Form.Label>{/*Fit intercept hyperparameter*/}
        <Form.Select id="fit_intercept" onChange={fit_intercept_change} defaultValue="True">
          <option>True</option>{/*True/false options for fit intercept*/}
          <option>False</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Intercept Scaling</Form.Label>{/*Intercept Scaling */}
        <input id="intercept_scaling" onChange={intercept_scaling_change} type="number" placeholder="1.0"></input>{/*numerical input for intercept scaling*/}
      </Col>
      <Col>
        <Form.Label>Class Weight</Form.Label>{/*class weight hyperparameter - Weights associated with classes in the form {class_label: weight}. If not given, all classes are supposed to have weight one.*/}
        <Form.Select id="class_weight" onChange={class_weight_change} defaultValue="None">{/**/}
          <option>None</option>{/*options for class weight*/}
          <option>Balanced</option>
          <option>Custom</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Random State</Form.Label>{/*random state hyperparameter Used when solver == ‘sag’, ‘saga’ or ‘liblinear’ to shuffle the data.*/}
        <input id="random_state" onChange={random_state_change} type="number" placeholder="-1"></input>{/*numerical input*/}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Solver</Form.Label>{/*solver hyperparameter - Algorithm to use in the optimization problem. Default is ‘lbfgs’. To choose a solver, you might want to consider the following aspects:*/}
        <Form.Select id="solver" onChange={solver_change} defaultValue="lbfgs">
          <option>newton-cg</option>{/*options for solver hyperparameter*/}
          <option>lbfgs</option>
          <option>liblinear</option>
          <option>sag</option>
          <option>saga</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Max Iterations</Form.Label><br/>{/*Max iterations - Maximum number of iterations taken for the solvers to converge.*/}
        <input id="max_iter" onChange={max_iter_change} type="number" placeholder="100"></input>{/*numerical input*/}
      </Col>
      <Col>
        <Form.Label>Multi Class</Form.Label>{/*Multi Class - If the option chosen is ‘ovr’, then a binary problem is fit for each label. For ‘multinomial’ the loss minimised is the multinomial loss fit across the entire probability distribution, even when the data is binary. */}
        <Form.Select id="multi_class" onChange={multi_class_change} defaultValue="auto">
          <option>auto</option>{/*options*/}
          <option>ovr</option>
          <option>multinomial</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Verbose</Form.Label><br/>{/*Verbose hyperparameter - For the liblinear and lbfgs solvers set verbose to any positive number for verbosity.*/}
        <input id="verbose" onChange={verbose_change} type="number" placeholder="0"></input>{/*numerical input*/}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Warm Start</Form.Label>{/*Warm start hyperparameter - When set to True, reuse the solution of the previous call to fit as initialization, otherwise, just erase the previous solution.*/}
        <Form.Select id="warm_start" onChange={warm_start_change} defaultValue="False">
          <option>True</option>{/*true/false for warm start*/}
          <option>False</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>N Jobs</Form.Label><br/>{/*N Jobs hyperparameterNumber of CPU cores used when parallelizing over classes if multi_class=’ovr’”. This parameter is ignored when the solver is set to ‘liblinear’ regardless of whether ‘multi_class’ is specified or not. None means 1 unless in a joblib.parallel_backend context. -1 means using all processors. See Glossary for more details.*/}
        <input id="n_jobs" onChange={n_jobs_change} type="number" placeholder="1"></input>
      </Col>
      <Col>
        <Form.Label>L1 Ratio</Form.Label><br/>{/**the Elastic-Net mixing parameter, with 0 <= l1_ratio <= 1. */}
        <input id="l1_ratio" onChange={l1_ratio_change} type="number" placeholder="1"></input>
      </Col>
      </Row>
    </Form.Group>
    );
}

//Export LogisticRegressHypParams for Dashboard
export default LogisticRegressHypParams;
