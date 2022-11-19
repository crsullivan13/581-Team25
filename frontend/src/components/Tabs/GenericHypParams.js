/*
Name: genericHypParams.js
Description: a component that can be used to render any of the model's hyperparameters, given the parameter names, type of input, and the default values 
Programmers: Griffin Keeter
Creation Date: 11/18/22
Preconditions: All of the parameter names passed in match the arguments for the methods from sklearn
Postconditions: None
Errors: None
Side Effects: Render the hyperparameter inputs
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
import ReactTooltip from 'react-tooltip'
import HyperparamInfo from './HyperparamInfo'

import './tooltipstyle.css'

// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function GenericHypParams(props) {
  React.useEffect(() => {
    // Runs after the first render() lifecycle
    //set default values:*/
  }, []);

  let MakeInputs = () => {
    let arr = [];
    let i = 0;
    for(i = 0; i < 10; i ++){
      arr.push(<p>Helo </p>);
    }
    return arr;
  }

  //Return following HTML code, containing all the inputs
  return(
    <Form.Group>
      {/*<ReactTooltip className="info_tooltip" effect="solid" html={true} multiline={true}*/}
    {MakeInputs()}
    </Form.Group>

    );
}

//Export LogisticRegressHypParams for Dashboard
export default GenericHypParams;
