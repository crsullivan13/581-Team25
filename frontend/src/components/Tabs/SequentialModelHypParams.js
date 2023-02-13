/*
Name: SequentialModelHypParams.js
Description: A collection of inputs that will change the parent state - the inputs are the hyperparameters for the Sequential model
Programmers: Griffin Keeter
Creation Date: 12/1/2022
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
import ReactTooltip from 'react-tooltip'
import HyperparamInfo from './HyperparamInfo'

import './tooltipstyle.css'
import { propTypes } from "react-bootstrap/esm/Image";

// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function SequentialModelHypParams(props) {

  const [model_data_copy, setModelDataCopy] = useState(
      {
        model:"Sequential Model",
        layers: [
          {
            type: "Dense",
            units: 1,
            use_bias: true,
            activation: "None",
          },
        ],
        type: "regression",
        batch_size: 1,
        epochs: 1,
        optimizer: "SGD",
        loss: "mean squared loss",
        learning_rate: 0.001,
        momentum: 0.0,
      }
    );




  function layerAdd() {

    setModelDataCopy(
      {
        ...model_data_copy,
        layers: [...model_data_copy.layers, 
          {
            type:"Dense",
            units: 1,
            use_bias: true,
            activation: "None",
          }
        ],
      }
    );

    
  }

  React.useEffect(() => {
    // Runs after the first render() lifecycle
    Object.keys(model_data_copy).forEach(function(key,index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object 
      props.model_data_p[key] = model_data_copy[key];
    });

  });



  

  //add event listener for each layer object
  document.addEventListener('change', function (e){
    //TODO - add checking for data input
    let value = e.target.value;
    let index = e.target.parentElement.parentElement.getAttribute('index_attr');
    let input_id = e.target.getAttribute('id');
    console.log("this is " + index);
    console.log(model_data_copy.layers);
    switch(input_id){
      case "units":
        {
        model_data_copy["layers"][index].units = value;
        }
        break;
      case "use_bias":
        {
        model_data_copy["layers"][index].use_bias = (value.toLowerCase() === "true");
        }
        break;
      case "activation":
        {
        let val2 = (value === "None") ? (null) : (value);
        model_data_copy["layers"][index].activation = value;
        }
        break;
    }
  });

  
  let batch_size_change = ()=>{
    let inp1 = document.getElementById("batch_size").value;
    let val1 = parseInt(inp1);
    setModelDataCopy({...model_data_copy, batch_size: val1});
  }
  let epochs_change = ()=>{
    let inp1 = document.getElementById("epochs").value;
    let val1 = parseInt(inp1);
    setModelDataCopy({...model_data_copy, epochs: val1});
  }
  let optimizer_change = ()=>{
    let inp1 = document.getElementById("optimizer").value;
    let val1 = inp1;
    setModelDataCopy({...model_data_copy, optimizer: val1});
  }
  let learning_rate_change = ()=>{
    let inp1 = document.getElementById("learning_rate").value;
    let val1 = Number(inp1);
    setModelDataCopy({...model_data_copy, learning_rate: val1});
  }
  let momentum_change = ()=>{
    let inp1 = document.getElementById("momentum").value;
    let val1 = Number(inp1);
    if (document.getElementById("optimizer").value != "SGD"){
      val1 = null;
    }
    setModelDataCopy({...model_data_copy, momentum: val1});
  }
  

  //Return following HTML code, containing all the inputs
  return(
    <>
    <Form.Group id="form_input">
      <ReactTooltip className="info_tooltip" effect="solid" html={true} multiline={true}/>
        
    
        <Row>
          <Col>
          <Form.Label>Batch Size</Form.Label>
          <br/>
          <input id="batch_size" onChange={batch_size_change} type="number" defaultValue="1"></input>{/*numerical input for batch size*/}
          </Col>
          <Col>
          <Form.Label>Epochs</Form.Label>
          <br/>
          <input id="epochs" onChange={epochs_change} type="number" defaultValue="1"></input>{/*numerical input for epochs*/}
          </Col>
          <Col>
          <Form.Label>Optimizer</Form.Label>
          <br/>
          <Form.Select id="optimizer" onChange={optimizer_change} defaultValue="SGD">
          <option>SGD</option>
          <option>Adam</option>
          </Form.Select>
          </Col>
          <Col>
          <Form.Label>Learning Rate</Form.Label><br/>
          <input id="learning_rate" onChange={learning_rate_change} type="number" defaultValue="0.001"></input>{/*numerical input for learning rate*/}
          </Col>
          <Col>
          <Form.Label>Momentum</Form.Label><br/>
          <input id="momentum" onChange={momentum_change} type="number" defaultValue="0.0"></input>{/*numerical input for momentum*/}
          </Col>
        </Row>
        <Row><Col><br/><br/></Col></Row>
        {/* this renders each layer's hyperparameters and creates handlers for each input */}
        {(model_data_copy["layers"]).map((layer, index) => 
        
        <div key={index.toString()}>
          <Row index_attr={index}>
            <Col>
            <Form.Label>Layer {index}:</Form.Label>
            </Col>
          <Col>
          <Form.Label>Units</Form.Label>{/* The units hyperparameter for this hyperparameter*/}
          <br/>
          <input id="units" type="number" defaultValue="1"></input> {/*Numerical input for units*/}
          </Col>

          <Col>
          {/**This input is for use_bias, which is true or false */}
          <Form.Label>Use Bias</Form.Label>
          <br/>
          <Form.Select id="use_bias" defaultValue="True">
            <option>True</option>
            <option>False</option>
          </Form.Select>
          </Col>

          <Col>
          {/**This input is for use_bias, which is true or false */}
          <Form.Label>Activation</Form.Label>
          <br/>
          <Form.Select id="activation" defaultValue="None">
            <option>None</option>
            <option>elu</option>
            <option>exponential</option>
            <option>gelu</option>
            <option>hard_sigmoid</option>
            <option>linear</option>
            <option>relu</option>
            <option>selu</option>
            <option>sigmoid</option>
            <option>softmax</option>
            <option>softplus</option>
            <option>softsign</option>
            <option>swish</option>
            <option>tanh</option>
          </Form.Select>
          </Col>
          </Row>
        </div>)}
        
        <Row>
        <Col>
        <Button id="layer_add_btn" type="button" className="add_layer" onClick={layerAdd}>Add Layer</Button>
        </Col>
        </Row>
    </Form.Group>
    </>
    );
}

//Export LogisticRegressHypParams for Dashboard
export default SequentialModelHypParams;

