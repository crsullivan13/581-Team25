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
function DecisionTreeHypParams() {

  //TODO - add handlers for each input

  //Return following HTML code
  return(
    <Form.Group>
      <Form.Label>Decision Tree Hyperparameters</Form.Label>{/*Hyperparameter options for the decision tree model* */}
      <Row>
      <Col>
        <Form.Label>Criterion</Form.Label>{/**The function to measure the quality of a split.  */}
        <Form.Select defaultValue="squared_error">{/**select input for criterion */}
          <option>squared_error</option>{/** options*/}
          <option>friedman_mse</option>
          <option>absolute_error</option>
          <option>poisson</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Splitter</Form.Label>{/**The strategy used to choose the split at each node.  */}
        <Form.Select defaultValue="best">{/** */}
          <option>best</option>{/** */}
          <option>random</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Max Depth</Form.Label><br/>{/** The maximum depth of the tree. If None, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples.*/}
        <input type="number" placeholder="-1"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Min Samples Split</Form.Label><br/>{/** The minimum number of samples required to split an internal node:*/}
        <input type="number" placeholder="2"></input>{/** */}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Min Samples Leaf</Form.Label><br/>{/** The minimum number of samples required to be at a leaf node. */}
        <input type="number" placeholder="1"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Min Weight Fraction Leaf</Form.Label><br/>{/**The minimum weighted fraction of the sum total of weights (of all the input samples) required to be at a leaf node.  */}
        <input type="number" placeholder="0.0"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Max Features</Form.Label>{/**The number of features to consider when looking for the best split: */}
        <Form.Select defaultValue="">
          <option>auto</option>
          <option>sqrt</option>
          <option>log2</option>
        </Form.Select>
      </Col>
      <Col>
        <Form.Label>Random State</Form.Label><br/>{/** Controls the randomness of the estimator. The features are always randomly permuted at each split, even if splitter is set to "best". */}
        <input type="number" placeholder="-1"></input>{/** */}
      </Col>
      </Row><Row>
      <Col>
        <Form.Label>Max Leaf Nodes</Form.Label><br/>{/**Grow a tree with max_leaf_nodes in best-first fashion. Best nodes are defined as relative reduction in impurity.  */}
        <input type="number" placeholder="-1"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>Min Impurity Decrease</Form.Label><br/>{/**A node will be split if this split induces a decrease of the impurity greater than or equal to this value. */}
        <input type="number" placeholder="0"></input>{/** */}
      </Col>
      <Col>
        <Form.Label>CCP Alpha</Form.Label><br/>{/*Complexity parameter used for Minimal Cost-Complexity Pruning. The subtree with the largest cost complexity that is smaller than ccp_alpha will be chosen. By default, no pruning is performed. * */}
        <input type="number" placeholder="0"></input>{/** */}
      </Col>
      </Row>
    </Form.Group>
    );
}

//Export DecisionTreeHypParams for Dashboard
export default DecisionTreeHypParams;
