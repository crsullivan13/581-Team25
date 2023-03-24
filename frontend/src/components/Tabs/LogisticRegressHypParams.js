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
import {Tooltip as ReactTooltip} from 'react-tooltip'
import HyperparamInfo from './HyperparamInfo'

import './tooltipstyle.css'
import './Training.css';

// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function LogisticRegressHypParams(props) {

  const [show, setShow] = useState(false);

  //TODO - add handlers for each hyperparameter input
   //TODO - add checks on the validity of each input for each input
  let penalty_change = ()=>{
    let val = document.getElementById("penalty").value;
    props.model_data_p["penalty"] = val;
    console.log(props.model_data_p["penalty"]);
  }
  let dual_change = ()=>{
    let val = document.getElementById("dual").value;
    props.model_data_p["dual"] = (val.toLowerCase() === "true");
    console.log(props.model_data_p["dual"]);
  }
  let tol_change = ()=>{
    let val = document.getElementById("tol").value;
    props.model_data_p["tol"] = Number(val);
    console.log(props.model_data_p["tol"]);
  }
  let C_change = ()=>{
    let val = document.getElementById("C").value;
    props.model_data_p["C"] = Number(val);
    console.log(props.model_data_p["C"]);
  }
  let fit_intercept_change = ()=>{
    let val = document.getElementById("fit_intercept").value;
    props.model_data_p["fit_intercept"] = (val.toLowerCase() === "true");
    console.log(props.model_data_p["fit_intercept"]);
  }
  let intercept_scaling_change = ()=>{
    let val = document.getElementById("intercept_scaling").value;
    //props.model_data_p["intercept_scaling"] = Number(val);
    console.log(props.model_data_p["intercept_scaling"]);
  }
  let class_weight_change = ()=>{
    let val = document.getElementById("class_weight").value;
    props.model_data_p["class_weight"] = val;
    console.log(props.model_data_p["class_weight"]);
  }
  let random_state_change = ()=>{
    let val = document.getElementById("random_state").value;
    props.model_data_p["random_state"] = parseInt(val);
    console.log(props.model_data_p["random_state"]);
  }
  let solver_change = ()=>{
    let val = document.getElementById("solver").value;
    props.model_data_p["solver"] = val;
    console.log(props.model_data_p["solver"]);
  }
  let max_iter_change = ()=>{
    let val = document.getElementById("max_iter").value;
    props.model_data_p["max_iter"] = parseInt(val);
    console.log(props.model_data_p["max_iter"]);
  }
  let multi_class_change = ()=>{
    let val = document.getElementById("multi_class").value;
    props.model_data_p["multi_class"] = val;
    console.log(props.model_data_p["multi_class"]);
  }
  let verbose_change = ()=>{
    let val = document.getElementById("verbose").value;
    props.model_data_p["verbose"] = parseInt(val);
    console.log(props.model_data_p["verbose"]);
  }
  let warm_start_change = ()=>{
    let val = document.getElementById("warm_start").value;
    props.model_data_p["warm_start"] = (val.toLowerCase() === "true");
    console.log(props.model_data_p["warm_start"]);
  }
  let n_jobs_change = ()=>{
    let val = document.getElementById("n_jobs").value;
    props.model_data_p["n_jobs"] = parseInt(val);
    console.log(props.model_data_p["n_jobs"]);
  }
  let l1_ratio_change = ()=>{
    let val = document.getElementById("l1_ratio").value;
    props.model_data_p["l1_ratio"] = Number(val);
    console.log(props.model_data_p["l1_ratio"]);
  }

  let toggleHide = ()=>{
    if(show === false){
      document.getElementById("hideable").style.display = 'block';
    }else{
      document.getElementById("hideable").style.display = 'none';
    }
    setShow(!show);
    console.log("visible : "+show);
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

    document.getElementById("hideable").style.display = 'none';
    console.log(props.model_data_p);
  }, []);


  //Return following HTML code, containing all the inputs
  return(
    <Form.Group id="form_input">
      <ReactTooltip className="info_tooltip" effect="solid" html={true} multiline={true}/>
      <Row>
      <Col>
      
        <Form.Label>Penalty</Form.Label>{/* The penalty hyperparameter*/}
        <Form.Select id="penalty" data-tip={"<p>Penalty Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "penalty")} onChange={penalty_change} defaultValue="l2">
          <option>l1</option>{/*Options for the penalty hyperparameter*/}
          <option>l2</option>
          <option>elasticnet</option>
          <option>none</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Dual</Form.Label>{/*The dual hyperparameter*/}
        <Form.Select id="dual" data-tip={"<p>Dual Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "dual")} onChange={dual_change} defaultValue="False">
          <option>True</option>{/*True and false options for dual*/}
          <option>False</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Tolerance</Form.Label><br/>{/*Tolerance Hyperparameter*/}
        <input id="tol" data-tip={"<p>Tolerance Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "tol")} onChange={tol_change} type="number" defaultValue="0.00001"></input>{/*numerical input for tolerance*/}
      </Col>
      <Col>
        <Form.Label>C</Form.Label>{/*C hyperparameter*/}
        <br/>
        <input id="C" data-tip={"<p>C Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "C")} onChange={C_change} type="number" defaultValue="1.0"></input> {/*Numerical input for C*/}
      </Col>
      </Row>
      <div id="hideable">
      <Row>
      <Col>
        <Form.Label>Fit Intercept</Form.Label>{/*Fit intercept hyperparameter*/}
        <Form.Select id="fit_intercept" data-tip={"<p>Fit Intercept Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "fit_intercept")} onChange={fit_intercept_change} defaultValue="True">
          <option>True</option>{/*True/false options for fit intercept*/}
          <option>False</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Intercept Scaling</Form.Label>{/*Intercept Scaling */}
        <br/>
        <input id="intercept_scaling" data-tip={"<p>Intercept Scaling Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "intercept_scaling")} onChange={intercept_scaling_change} type="number" defaultValue="1.0"></input>{/*numerical input for intercept scaling*/}
      </Col>
      <Col>
        <Form.Label>Class Weight</Form.Label>{/*class weight hyperparameter - Weights associated with classes in the form {class_label: weight}. If not given, all classes are supposed to have weight one.*/}
        <Form.Select id="class_weight" data-tip={"<p>Class Weight Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "class_weight")} onChange={class_weight_change} defaultValue="balanced">{/**/}
          <option>none</option>{/*options for class weight*/}
          <option>balanced</option>
          <option>custom</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Random State</Form.Label>{/*random state hyperparameter Used when solver == ‘sag’, ‘saga’ or ‘liblinear’ to shuffle the data.*/}
        <br/>
        <input id="random_state" data-tip={"<p>Random State Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "random_state")} onChange={random_state_change} type="number" defaultValue="2"></input>{/*numerical input*/}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Solver</Form.Label>{/*solver hyperparameter - Algorithm to use in the optimization problem. Default is ‘lbfgs’. To choose a solver, you might want to consider the following aspects:*/}
        <Form.Select id="solver" data-tip={"<p>Solver Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "solver")} onChange={solver_change} defaultValue="lbfgs">
          <option>newton-cg</option>{/*options for solver hyperparameter*/}
          <option>lbfgs</option>
          <option>liblinear</option>
          <option>sag</option>
          <option>saga</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Max Iterations</Form.Label>{/*Max iterations - Maximum number of iterations taken for the solvers to converge.*/}
        <br/>
        <input id="max_iter" data-tip={"<p>Max Iterations Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "max_iter")} onChange={max_iter_change} type="number" defaultValue="100"></input>{/*numerical input*/}
      </Col>
      <Col>
        <Form.Label>Multi Class</Form.Label>{/*Multi Class - If the option chosen is ‘ovr’, then a binary problem is fit for each label. For ‘multinomial’ the loss minimised is the multinomial loss fit across the entire probability distribution, even when the data is binary. */}
        <Form.Select id="multi_class" data-tip={"<p>Multi Class Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "multi_class")} onChange={multi_class_change} defaultValue="ovr">
          <option>auto</option>{/*options*/}
          <option>ovr</option>
          <option>multinomial</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Verbose</Form.Label>{/*Verbose hyperparameter - For the liblinear and lbfgs solvers set verbose to any positive number for verbosity.*/}
        <br/>
        <input id="verbose" data-tip={"<p>Verbose Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "verbose")} onChange={verbose_change} type="number" defaultValue="0"></input>{/*numerical input*/}
      </Col>
      </Row>
      <Row>
      <Col>
        <Form.Label>Warm Start</Form.Label>{/*Warm start hyperparameter - When set to True, reuse the solution of the previous call to fit as initialization, otherwise, just erase the previous solution.*/}
        <Form.Select id="warm_start" data-tip={"<p>Warm Start Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "warm_start")} onChange={warm_start_change} defaultValue="False">
          <option>True</option>{/*true/false for warm start*/}
          <option>False</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>N Jobs</Form.Label><br/>{/*N Jobs hyperparameterNumber of CPU cores used when parallelizing over classes if multi_class=’ovr’”. This parameter is ignored when the solver is set to ‘liblinear’ regardless of whether ‘multi_class’ is specified or not. None means 1 unless in a joblib.parallel_backend context. -1 means using all processors. See Glossary for more details.*/}
        <input id="n_jobs" data-tip={"<p>N Jobs Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "n_jobs")} onChange={n_jobs_change} type="number" defaultValue="1"></input>
      </Col>
      <Col>
        <Form.Label>L1 Ratio</Form.Label><br/>{/**the Elastic-Net mixing parameter, with 0 <= l1_ratio <= 1. */}
        <input id="l1_ratio" data-tip={"<p>L1 Ratio Hyperparameter:</p>" + HyperparamInfo("LogisticRegression", "l1_ratio")} onChange={l1_ratio_change} type="number" defaultValue="1"></input>
      </Col>
      <Col>
      </Col>
      </Row>
      </div>

    <Row>
		{/*button to toggle visibility*/}
	  <Button type="button" onClick={toggleHide}>{show ? ("Show Less") : ("Show More")}</Button>
	  </Row>
    </Form.Group>

    );
}

//Export LogisticRegressHypParams for Dashboard
export default LogisticRegressHypParams;
