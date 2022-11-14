/*
Name: MultiLayerPerceptronHypParams.js
Description: A collection of inputs that will change the parent state - the inputs are the hyperparameters for the decision tree classifier model
Programmers: Griffin Keeter
Creation Date: 11/13/22
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
import ReactTooltip from 'react-tooltip'
import HyperparamInfo from './HyperparamInfo'


// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function MultiLayerPerceptronHypParams(props) {

  //TODO - add checks on the validity of each input for each input


  let crit_change = ()=>{
    let val = document.getElementById("crit").value;
    props.model_data_p["criterion"] = val;
    console.log(props.model_data_p["criterion"]);
  }

  
  React.useEffect(() => {
    // Runs after the first render() lifecycle
    //set default values:*/
    props.model_data_p["model"] = "Decision Tree Classifier";
    crit_change() //call the handler for criterion*/
  }, []);


  //Return following HTML code
  return(
    <Form.Group>
      <ReactTooltip className="info_tooltip" effect="solid" html={true} multiline={true}/>
      <Row>
      <Col>
        <Form.Label>Criterion</Form.Label>{/**The function to measure the quality of a split.  */}
        <Form.Select id="crit" data-tip={HyperparamInfo("MultiLayerPerceptron", "crit")} onChange={crit_change} defaultValue="squared_error">{/**select input for criterion */}
          <option>squared_error</option>{/** options*/}
          <option>friedman_mse</option>
          <option>absolute_error</option>
          <option>poisson</option>
        </Form.Select>
      </Col>
      </Row>
    </Form.Group>
    );
}

//Export DecisionTreeHypParams for Dashboard
export default MultiLayerPerceptronHypParams;
