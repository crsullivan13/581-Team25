/*
Name: genericHypParams.js
Description: a component that can be used to render any of the model's hyperparameters, given the parameter names, type of input, and the default values 
Programmers: Griffin Keeter, Amith Panuganti
Creation Date: 11/18/22
Preconditions: All of the parameter names passed in match the arguments for the methods from sklearn
Postconditions: None
Errors: None
Side Effects: Render the hyperparameter inputs
Invariants: None
Faults: None
Revisions:
    Date 3/6/23
    Author: Amith Panuganti
    Description: Update generic hyper parameters to make it possible to have mutiple hyperparameters

    Date: 3/7/23
    Author: Amith Panuganti
    Description: Add Choice Param to include a parameter with choices

    Date: 3/8/23
    Author: Amith Panuganti
    Description: Handle case when there is only 1 child
*/

//Import React
import React from "react"
import {useState, useEffect, cloneElement} from "react"
import { Form, Button, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput";
import * as ReactTooltip from 'react-tooltip'
import HyperparamInfo from './HyperparamInfo'

import './tooltipstyle.css'

// Return The html form with hyperparameter options
//Input: Props with the following items
//Input: children. The children of GenericHypParams. They contains inputs for user to input for each
//hyperparameter for a model
//Input: model - The name of the model for the set of hyperparameters
//Input: model_data_p - Contains the list of hyperparameters for a model
//Input: perRow - The number of hyperapameters per row when being shown. They also represent the number 
// of parameters will be shown first while the rest is hidden. 
//I should mention that first perRow children will be the inputs that will be shown

//Output: HTML Page of hyperparamater inputs
function GenericHypParams(props) {

  //Used to show hidden parameters
  const [show, setShow] = useState(false);

  //Go through each child and 
  React.useEffect(() => {
     //Set the model type to model_data
     props.model_data_p["model"] = props.model
  }, []);

  //Hides or shows the hidden params
  let toggleHide = ()=>{
    if(show === false){
      document.getElementById("hideable").style.display = 'block';
    }else{
      document.getElementById("hideable").style.display = 'none';
    }
    setShow(!show);
  }

  //Create a new element that will store the unhiddenParams
  let unhiddenParams = []

  //If there is only 1 child
  if(props.children.length === undefined)
  {
    //Create column with props.children[i]
    let column = cloneElement(props.children, {model_data_p : props.model_data_p, key:"Param"})
                      
    //Append it to unhiddenParam
    unhiddenParams.push(column)
  }
  else
  {
      //Go through i to number of rows
    for(let i = 0; i < props.perRow; i++)
    {
        //Create column with props.children[i]
        let column = cloneElement(props.children[i], {model_data_p : props.model_data_p, key:"Param"+i})
                      
        //Append it to unhiddenParam
        unhiddenParams.push(column)
    }
  }
  
  //Create row for unhiddenParam
  let unhiddenRow = <Row>{unhiddenParams}</Row>

  //Next, create a variable that will store the hidden params
  let hiddenParams = <></>

  //If size of children is greater than number params per row
  if(props.children.length > props.perRow && props.children.length !== undefined)
  {
     //Create list of hidden rows
     let hiddenRows = []

     //Loop until we go through the rest of the children
     let childIndex = props.perRow
     while(childIndex < props.children.length)
     {
        //Create a list of cols for params
        let hiddenParams = []

        //Loop until we finish a row
        for(let i = 0; i < props.perRow; i++)
        {
            //Create a new column for children[childIndex]
            let column = cloneElement(props.children[i+childIndex], {model_data_p : props.model_data_p, key:"Param"+(i+childIndex)})
                      
            //Add column to hiddenParams
            hiddenParams.push(column)

            //If we are at the last child
            if(i+childIndex === props.children.length - 1)
            {

              //Loop from i + 1 to props.perRow
              for(let j = i+1; j < props.perRow; j++)
              {
                 //Push Col tag to hiddenParams
                 hiddenParams.push(<Col key={"Param"+(j+childIndex)}></Col>)
              }
              //Break loop
              i = props.perRow
            }
        }

        //Create row with hiddenParams
        let hiddenRow = <Row key={"Row"+childIndex}>{hiddenParams}</Row>

        //Add it to hiddenRows
        hiddenRows.push(hiddenRow)

        //Add to childIndex
        childIndex = childIndex + 5
     }

     //Set hiddenParams
     hiddenParams = <><div id="hideable" style={{display:"none"}}>
      {hiddenRows}
      </div>
      <Row>
		  {/*button to toggle visibility*/}
	    <Button type="button" onClick={toggleHide}>{show ? ("Show Less") : ("Show More")}</Button>
	    </Row>  
      </>
     
  }
  
  //Return following HTML code, containing all the inputs
  return(
    <Form.Group id="form_input">
      {unhiddenRow}
      {hiddenParams}
    </Form.Group>

    );
}

//Returns an input for number parameters
//props inputs
//Input: model_data_p : "Contains the dictionary with the model parameters"
//Input: defaultValue: The default value for the parameter
//Input: param: A string representing the name of the paramters
//Input: label: The label for the parameter
function IntParam(props)
{
   //UseEffect function
   useEffect(() => {
      //Initialize starting value for param
      props.model_data_p[props.param] = props.defaultValue
   }, [])

   //Changes the value of the state
   let changeParam = (event) => {
      //Get the value of the event change
      let value = event.target.value

      //Set value to be proprs.model_state props.param
      props.model_data_p[props.param] = Number(value)
   }

   //Return an input value 
   return(
     <>
     <Col>
     <Form.Label>{props.label}</Form.Label>
     <br/>
     <input type="number" defaultValue={props.defaultValue} onChange={changeParam}></input>
     </Col>
     </>
   )
}

//Return an input for choices
//Input:props containing the following variables
//Input:model_data_p: The state of the model. Should be a dictionary
//Input:defaultValue: The default value for the model. Should be one of the options
//Input:options: A list of strings serving as the options
//Input:label: The label given to the input
//Input:param: The key that will store the input into model_data_p
function ChoiceParam(props)
{
  //UseEffect function
  useEffect(() => {
    //Initialize starting value for param
    props.model_data_p[props.param] = props.defaultValue
 }, [])

  //Changes the param of the model state
  let changeParam = (event) => {
      //Get the value of the event and set the model state param to the value
      props.model_data_p[props.param] = event.target.value
  }

   //Create a list of options for each choice
   let options = []

   //Go through each option in the props.options
   for(let i = 0; i < props.options.length; i++)
   {
      //Create a new option tag
      let optionTag = <option key={"Option"+(i+1)}>{props.options[i]}</option>

      //Add tag to options
      options.push(optionTag)
   }

   //Return the form select with options
   return(
    <>
    <Col>
    <Form.Label>{props.label}</Form.Label>
    <Form.Select onChange={changeParam} defaultValue={props.defaultValue}>
       {options}
    </Form.Select>
    </Col>
    </>
   );

}
//Export LogisticRegressHypParams for Dashboard
export default GenericHypParams;
export {IntParam, ChoiceParam}
