/*
Name: MultiLayerPerceptronClassHypParams.js
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
import './tooltipstyle.css'


// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function MultiLayerPerceptronClassHypParams(props) {
  //TODO - add checks on the validity of each input for each input


  let hidden_layer_sizes_change = ()=>{ //handler for input change on the hidden layer sizes parameter
    let val = document.getElementById("hidden_layer_sizes").value;
    let str_arr = val.split(",");
    let num_arr = str_arr.map((val)=>{return parseInt(val)}); //the input is split into an array and converted to an array of integer
    props.model_data_p["hidden_layer_sizes"] = num_arr;

  }
  let activation_change = ()=>{ //handler for input change on the activation selection
    let val = document.getElementById("activation").value;
    props.model_data_p["activation"] = val;

  }
  let solver_change = ()=>{ //handler for input change on the solver
    let val = document.getElementById("solver").value;
    props.model_data_p["solver"] = val;

  }
  let alpha_change = ()=>{ //handler for input change on the alpha
    let val = document.getElementById("alpha").value;
    props.model_data_p["alpha"] = val;

  }
  let batch_size_change = ()=>{ //handler for input change on the batch_size
    let val = document.getElementById("batch_size").value;
    props.model_data_p["batch_size"] = val;
  }
  let learning_rate_change = ()=>{ //handler for input change on the batch_size
    let val = document.getElementById("learning_rate").value;
    props.model_data_p["learning_rate"] = val;
  }
  let power_t_change = ()=>{ //handler for input change on the batch_size
    let val = document.getElementById("power_t").value;
    props.model_data_p["power_t"] = val;
  }
  let max_iter_change = ()=>{ //handler for input change on the batch_size
    let val = document.getElementById("max_iter").value;
    props.model_data_p["max_iter"] = val;
  }
  let shuffle_change = ()=>{ //handler for input change on the batch_size
    let val = document.getElementById("shuffle").value;
    props.model_data_p["shuffle"] = (val.toLowerCase() == "true");
  }
  let random_state_change = ()=>{
    let val = document.getElementById("random_state").value;
    props.model_data_p["random_state"] = parseInt(val);
  }
  let tol_change = ()=>{
    let val = document.getElementById("tol").value;
    props.model_data_p["tol"] = val;
  }
  let verbose_change = ()=>{ //handler for input change on the batch_size
    let val = document.getElementById("verbose").value;
    props.model_data_p["verbose"] = (val.toLowerCase() == "true");
  }
  let warm_start_change = ()=>{ //handler for input change on the batch_size
    let val = document.getElementById("warm_start").value;
    props.model_data_p["warm_start"] = (val.toLowerCase() == "true");
  }
  let momentum_change = ()=>{
    let val = document.getElementById("momentum").value;
    props.model_data_p["momentum"] = val;
  } 
  let nesterovs_momentum_change = ()=>{
    let val = document.getElementById("nesterovs_momentum").value;
    props.model_data_p["nesterovs_momentum"] = (val.toLowerCase() == "true");
  }
  let early_stopping_change = ()=>{
    let val = document.getElementById("early_stopping").value;
    props.model_data_p["early_stopping"] = (val.toLowerCase() == "true");
  }
  let validation_fraction_change = ()=>{
    let val = document.getElementById("validation_fraction").value;
    props.model_data_p["validation_fraction"] = val;
  }
  let beta_1_change = ()=>{
    let val = document.getElementById("beta_1").value;
    props.model_data_p["beta_1"] = val;
  }
  let beta_2_change = ()=>{
    let val = document.getElementById("beta_2").value;
    props.model_data_p["beta_2"] = val;
  }
  let epsilon_change = ()=>{
    let val = document.getElementById("epsilon").value;
    props.model_data_p["epsilon"] = val;
  }
  let n_iter_no_change_change = ()=>{
    let val = document.getElementById("n_iter_no_change").value;
    props.model_data_p["n_iter_no_change"] = parseInt(val);
  }
  let max_fun_change = ()=>{
    let val = document.getElementById("max_fun").value;
    props.model_data_p["max_fun"] = parseInt(val);
  }

  React.useEffect(() => {
    // Runs after the first render() lifecycle
    //set default values:*/
    props.model_data_p["model"] = "Decision Tree Classifier";
    hidden_layer_sizes_change() //call the handler for hiddenlayer sizes*/
    activation_change();//for the activation
    solver_change();//for solver
    alpha_change();//
    batch_size_change();//
    learning_rate_change();//
    power_t_change();
    max_iter_change();
    shuffle_change();
    random_state_change();
    tol_change();
    verbose_change();
    warm_start_change();
    momentum_change();
    nesterovs_momentum_change();
    early_stopping_change();
    validation_fraction_change();
    beta_1_change();
    beta_2_change();
    epsilon_change();
    n_iter_no_change_change();
    max_fun_change();
  }, []);


  //Return following HTML code
  return(
    <Form.Group>
      <ReactTooltip className="info_tooltip" effect="solid" html={true} multiline={true}/>
      <Row>
      <Col>
        <Form.Label>Hidden Layer Sizes</Form.Label>{/**Label for hidden layer sizes */}<br/>
        <input id="hidden_layer_sizes" data-tip={HyperparamInfo("MultiLayerPerceptron", "crit")} onChange={hidden_layer_sizes_change} defaultValue="100," />{/**select input for criterion */}
      </Col>
      <Col>
        <Form.Label>Activation</Form.Label>{/**Label for activation */}
        <Form.Select id="activation" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} onChange={activation_change} defaultValue="relu">{/**selection for activation function for hidden layers */}
          <option>identity</option>{/** */}
          <option>logistic</option>
          <option>tanh</option>
          <option>relu</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Solver</Form.Label>{/**Label for activation */}
        <Form.Select id="solver" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} onChange={solver_change} defaultValue="adam">{/**selection for activation function for hidden layers */}
          <option>lbfgs</option>{/** */}
          <option>sgd</option>
          <option>adam</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Alpha</Form.Label>{/**Label for alpha - strength of the l2 regularization term */}<br/>
        <input id="alpha" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={alpha_change} defaultValue="0.0001" />{/**selection for activation function for hidden layers */}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Batch Size</Form.Label>{/**Label for batch sizes*/}<br/>
        <input id="batch_size" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={batch_size_change} defaultValue="200" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
        <Form.Label>Learning Rate</Form.Label>{/**Label for batch sizes*/}
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <Form.Select id="learning_rate" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} onChange={learning_rate_change} defaultValue="constant">{/**selection for activation function for hidden layers */}
          <option>constant</option>{/** */}
          <option>invscaling</option>
          <option>adaptive</option>
        </Form.Select>

      </Col>
      <Col>
        <Form.Label>Power T</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="power_t" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={power_t_change} defaultValue="0.5" />{/**selection for activation function for hidden layers */}

      </Col>
      <Col>
        <Form.Label>Max Iter</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="max_iter" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={max_iter_change} defaultValue="200" />{/**selection for activation function for hidden layers */}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Shuffle</Form.Label>{/*The shuffle hyperparameter*/}
        <Form.Select id="shuffle" data-tip={HyperparamInfo("LogisticRegression", "dual")} onChange={shuffle_change} defaultValue="True">
          <option>True</option>{/*True and false options for shuffle*/}
          <option>False</option>
        </Form.Select>
      </Col>
 
      <Col>
        <Form.Label>Random State</Form.Label>{/*The shuffle hyperparameter*/}<br/>
        <input id="random_state" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={random_state_change} defaultValue="0" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
        <Form.Label>Tolerance</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="tol" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={tol_change} defaultValue="0.0001" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
      <Form.Label>Verbose</Form.Label>{/*The verbose hyperparameter*/}
        <Form.Select id="verbose" data-tip={HyperparamInfo("LogisticRegression", "dual")} onChange={verbose_change} defaultValue="False">
          <option>True</option>{/*True and false options for verbose*/}
          <option>False</option>
        </Form.Select>      
      </Col>
      </Row>
      <Row>
      <Col>
      <Form.Label>Warm Start</Form.Label>{/*The verbose hyperparameter*/}
        <Form.Select id="warm_start" data-tip={HyperparamInfo("LogisticRegression", "dual")} onChange={warm_start_change} defaultValue="False">
          <option>True</option>{/*True and false options for verbose*/}
          <option>False</option>
        </Form.Select>      
      </Col>
      <Col>
        <Form.Label>Momentum</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="momentum" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={momentum_change} defaultValue="0.9" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
      <Form.Label>Nesterov's Momentum</Form.Label>{/*The verbose hyperparameter*/}
        <Form.Select id="nesterovs_momentum" data-tip={HyperparamInfo("LogisticRegression", "dual")} onChange={nesterovs_momentum_change} defaultValue="True">
          <option>True</option>{/*True and false options for verbose*/}
          <option>False</option>
        </Form.Select>      
      </Col>
      <Col>
      <Form.Label>Early Stopping</Form.Label>{/*The verbose hyperparameter*/}
        <Form.Select id="early_stopping" data-tip={HyperparamInfo("LogisticRegression", "dual")} onChange={early_stopping_change} defaultValue="False">
          <option>True</option>{/*True and false options for verbose*/}
          <option>False</option>
        </Form.Select>
      </Col>
      </Row>
      <Row>
      <Col>
        <Form.Label>Validation_fraction</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="validation_fraction" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={validation_fraction_change} defaultValue="0.1" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
        <Form.Label>Beta 1</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="beta_1" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={beta_1_change} defaultValue="0.9" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
        <Form.Label>Beta 2</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="beta_2" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={beta_2_change} defaultValue="0.999" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
        <Form.Label>Epsilon</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="epsilon" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={epsilon_change} defaultValue="0.00000001" />{/**selection for activation function for hidden layers */}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>N Iter No Change</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="n_iter_no_change" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={n_iter_no_change_change} defaultValue="10" />{/**selection for activation function for hidden layers */}
      </Col>
      <Col>
        <Form.Label>Max Number of Loss Function Calls</Form.Label>{/**Label for batch sizes*/}<br/>
        {/*{‘constant’, ‘invscaling’, ‘adaptive’}, default=’constant’*/}
        <input id="max_fun" data-tip={HyperparamInfo("DecisionTreeRegression", "splitter")} type="number" onChange={max_fun_change} defaultValue="15000" />{/**selection for activation function for hidden layers */}
      </Col>
      </Row>
    </Form.Group>
    );
}

//Export DecisionTreeHypParams for Dashboard
export default MultiLayerPerceptronClassHypParams;
