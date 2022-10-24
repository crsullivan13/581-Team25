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
import { Form, Button, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput";

// Return The html form with hyperparameter options
//Input: None
//Output: HTML Page of hyperparamater inputs
function DecisionTreeHypParams(props) {

  //TODO - add checks on the validity of each input for each input


  let crit_change = ()=>{
    let val = document.getElementById("crit").value;
    props.model_data_p["criterion"] = val;
  }

  let splitter_change = ()=>{
    let val = document.getElementById("splitter").value;
    props.model_data_p["splitter"] = val;
  }

  let max_depth_change = () =>{
    let val = document.getElementById("max_depth").value;
    props.model_data_p["max_depth"] = parseInt(val);
  }

  let min_samples_split_change = () =>{
    let val = document.getElementById("min_samples_split").value;
    props.model_data_p["min_samples"] = parseInt(val);
  }

  let min_samples_leaf_change = () =>{
    let val = document.getElementById("min_samples_leaf").value;
    props.model_data_p["min_samples_leaf"] = parseInt(val);
  }

  let min_weight_frac_leaf_change = () =>{
    let val = document.getElementById("min_weight_frac_leaf").value;
    props.model_data_p["min_weight_fraction_leaf"] = Number(val);
  }
  
  let max_features_change = () =>{
    let val = document.getElementById("max_features").value;
    props.model_data_p["max_features"] = parseInt(val);
  }

  let random_state_change = () =>{
    let val = document.getElementById("random_state").value;
    props.model_data_p["random_state"] = parseInt(val);
  }

  let max_leaf_nodes_change = () =>{
    let val = document.getElementById("max_leaf_nodes").value;
    props.model_data_p["max_leaf_nodes"] = parseInt(val);
  }

  let min_impurity_decrease_change = () =>{
    let val = document.getElementById("min_impurity_decrease").value;
    props.model_data_p["min_impurity_decrease"] = Number(val);
  }

  let ccp_alpha_change = () =>{
    let val = document.getElementById("ccp_alpha").value;
    props.model_data_p["ccp_alpha"] = Number(val);
  }


  React.useEffect(() => {
    // Runs after the first render() lifecycle
    //set default values:*/
    crit_change() //call the handler for criterion*/
    splitter_change()//call the handler for splitter*/
    max_depth_change() //call the handler for max_depth*/
    min_samples_split_change() //call the handler for min_samples_split*/
    min_samples_leaf_change() //call the handler for min_samples_leaf*
    min_weight_frac_leaf_change() //call the handler for min_weight_frac_leaf*
    max_features_change() //call the handler for max_features*/
    random_state_change() //call the handler for random_state*/
    max_leaf_nodes_change() //call the handler for max_leaf_nodes*/
    min_impurity_decrease_change()//call the handler for min_impurity_decrease*/
    ccp_alpha_change()//call the handler for ccp_alpha_change}*/
  }, []);


  //Return following HTML code
  return(
    <Form.Group>
      <Form.Label>Decision Tree Hyperparameters</Form.Label>{/*Hyperparameter options for the decision tree model* */}
      <Row>
      <Col>
        <Form.Label>Criterion</Form.Label>{/**The function to measure the quality of a split.  */}
        <Form.Select id="crit" onChange={crit_change} defaultValue="squared_error">{/**select input for criterion */}
          <option>squared_error</option>{/** options*/}
          <option>friedman_mse</option>
          <option>absolute_error</option>
          <option>poisson</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Splitter</Form.Label>{/**The strategy used to choose the split at each node.  */}
        <Form.Select id="splitter" onChange={splitter_change} defaultValue="best">{/** */}
          <option>best</option>{/** */}
          <option>random</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Max Depth</Form.Label><br/>{/** The maximum depth of the tree. If None, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples.*/}
        <input id="max_depth" onChange={max_depth_change} type="number" placeholder="-1"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Min Samples Split</Form.Label><br/>{/** The minimum number of samples required to split an internal node:*/}
        <input id="min_samples_split" onChange={min_samples_split_change} type="number" placeholder="2"></input>{/** */}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Min Samples Leaf</Form.Label><br/>{/** The minimum number of samples required to be at a leaf node. */}
        <input id="min_samples_leaf" onChange={min_samples_leaf_change} type="number" placeholder="1"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Min Weight Fraction Leaf</Form.Label><br/>{/**The minimum weighted fraction of the sum total of weights (of all the input samples) required to be at a leaf node.  */}
        <input id="min_weight_frac_leaf" onChange={min_weight_frac_leaf_change} type="number" placeholder="0.0"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Max Features</Form.Label>{/**The number of features to consider when looking for the best split: */}
        <Form.Select id="max_features" onChange={max_features_change} defaultValue="">
          <option>auto</option>
          <option>sqrt</option>
          <option>log2</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Random State</Form.Label><br/>{/** Controls the randomness of the estimator. The features are always randomly permuted at each split, even if splitter is set to "best". */}
        <input id="random_state" onChange={random_state_change} type="number" placeholder="-1"></input>{/** */}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Max Leaf Nodes</Form.Label><br/>{/**Grow a tree with max_leaf_nodes in best-first fashion. Best nodes are defined as relative reduction in impurity.  */}
        <input id="max_leaf_nodes" onChange={max_leaf_nodes_change} type="number" placeholder="-1"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Min Impurity Decrease</Form.Label><br/>{/**A node will be split if this split induces a decrease of the impurity greater than or equal to this value. */}
        <input id="min_impurity_decrease" onChange={min_impurity_decrease_change} type="number" placeholder="0"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>CCP Alpha</Form.Label><br/>{/*Complexity parameter used for Minimal Cost-Complexity Pruning. The subtree with the largest cost complexity that is smaller than ccp_alpha will be chosen. By default, no pruning is performed. * */}
        <input id="ccp_alpha" type="number" onChange={ccp_alpha_change} placeholder="0"></input>{/** */}
      </Col>
      </Row>
    </Form.Group>
    );
}

//Export DecisionTreeHypParams for Dashboard
export default DecisionTreeHypParams;
