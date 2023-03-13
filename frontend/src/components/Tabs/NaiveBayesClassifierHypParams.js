/*
Name: DecisionTreeHypParams.js
Description: A collection of inputs that will change the parent state - the inputs are the hyperparameters for the decision tree model
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
import { Form, Button, Container } from "react-bootstrap"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput"
import {Tooltip as ReactTooltip} from 'react-tooltip'
import HyperparamInfo from './HyperparamInfo'


// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function NaiveBayesClassifierHypParams(props) {

  //TODO - add checks on the validity of each input for each input
  let priors_change = () =>{
    let val = document.getElementById("priors").value;
    let str_arr = val.split(",");
    let num_arr = str_arr.map((val)=>{return Number(val)}); //the input is split into an array and converted to an array of integer
    props.model_data_p["priors"] = num_arr;
  }
  let var_smoothing_change = () =>{
    let val = document.getElementById("var_smoothing").value;
    props.model_data_p["var_smoothing"] = Number(val);
  }

  React.useEffect(() => {
    // Runs after the first render() lifecycle
    //set default values:*/
    props.model_data_p["model"] = "Gaussian Naive Bayes";
    priors_change();
    var_smoothing_change();
  }, []);


  //Return following HTML code
  return(
    <Form.Group>
      <ReactTooltip className="info_tooltip" effect="solid" html={true} multiline={true}/>
      <Row>
      <Col>
        <Form.Label>Priors</Form.Label><br/>{/**The function to measure the quality of a split.  */}
        <input id="priors" data-tip={HyperparamInfo("GaussianBayesClassifier", "priors")} onChange={priors_change} defaultValue="0.4,0.5,0.6" />{/**select input for criterion */}
      </Col>
      <Col>
        <Form.Label>Var Smoothing</Form.Label><br/>{/** The maximum depth of the tree. If None, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples.*/}
        <input id="var_smoothing" data-tip={HyperparamInfo("GaussianBayesClassifier", "var_smoothing")} onChange={var_smoothing_change} type="number" defaultValue="0.00001"></input>{/** */}
      </Col>
      
      </Row>
    </Form.Group>
    );
}

//Export DecisionTreeHypParams for Dashboard
export default NaiveBayesClassifierHypParams;
