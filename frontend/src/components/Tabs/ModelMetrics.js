/*
Name: ModelMetrics.js
Description: Output metrics of a model after training
Programmers: Amith Panuganti
Creation Date: 9/25/22
Revisions:
	9/25/22: 
        Revision: Impliment Interface for Model Metrics
        Author: Amith Panuganti 
Preconditions: Model must finish training before metrics
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//Import React
import React from "react"
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, Button, Container } from "react-bootstrap";

import { useState, useEffect} from 'react';



// Return HTML Page of Model Metrics
//Input: None
//Output: HTML Page of Model Metrics
function ModelMetrics() {

  let default_metrics = {
    "explained_variance_score": 0,
    "max_error": 0,
    "mean_pinball_loss":0,
    "verbose":0,
    "figure": 0
  };
   //state that is a list of models that have been created, just one for now
  const [model_list, setModelList] = useState([]);
   //The current selected model
  const [model_selected, setModelSelected] = useState("");
  const [m_metrics, setM_Metrics] = useState(default_metrics);
  const [fig, setFig] = useState("");

   let base_url = "http://127.0.0.1:5000/"

  let getMetrics = (model_id) => {
    let url = base_url + "get_metrics"
    let xhr = new XMLHttpRequest()
      //post request with above url
      xhr.open("POST", url)
      //send the request with the json string as body
      let model_data = {
        "model_id" : model_id,
      }
      console.log(model_data)
      xhr.send(JSON.stringify(model_data))

      //called when http request finished
      xhr.onload = function() {
        //when we get a 200 we do some parsing to display the output
        if(xhr.status == 200) {
          let msg = "Request was successful"
          //TODO handle req result using code in Training.js
          //handleReqResult(msg)
          
          console.log("response - " + xhr.responseText)

          //Parse the response 
          var jsonResponse = JSON.parse(xhr.responseText)
          console.log(jsonResponse)
          if(jsonResponse != null){
            setM_Metrics(jsonResponse)
            //Create image that serves as sourc
            const image = "data:image/png;base64,"+jsonResponse.figure;
              
            //Create imag tab 
            let element = <img alt="Figure" src={image}></img>
            setFig(element)
          }
          
        } else {
          //get here if we get and error status from the http response
          let error = 'Error ' + xhr.status + ': ' + xhr.statusText;
          console.log(error);
          //pass the error to our error handler, will be displayed in the modal
          //handleReqResult(error);
        }
      }
  
      //this is called when the http is unable to be sent, means a network error
      xhr.onerror = function() {
        //set error to what this network issue generally is
        let error = 'Network error. Request was not made (most likely a CORS error).';
        //display it in the modal
        //handleReqResult(error);
      }
  }


   let getModelNames = () => {
    //"https://team-25-362714.uc.r.appspot.com/get_models"
    //"http://127.0.0.1:5000/get_models" - for local testing
    let url = base_url + "get_models"
  
      //setup http request
      let xhr = new XMLHttpRequest()
      //post request with above url
      xhr.open("GET", url)
      //send the request with the json string as body
      let user_data = {
        "id" : 1,
      }
      xhr.send(JSON.stringify(user_data))
      
      //called when http request finished
      xhr.onload = function() {
        //when we get a 200 we do some parsing to display the output
        if(xhr.status == 200) {
          let msg = "Request was successful"
          //TODO handle req result using code in Training.js
          //handleReqResult(msg)
          
          //Parse the response 
          var jsonResponse = JSON.parse(xhr.responseText)
          setModelList(jsonResponse["names"])
          let first_name = jsonResponse["names"][0]
          if(first_name != null){//this initializes the page to show the metrics of the first model
            console.log(first_name)
            getMetrics(first_name)
          }
        } else {
          //get here if we get and error status from the http response
          let error = 'Error ' + xhr.status + ': ' + xhr.statusText;
          console.log(error);
          //pass the error to our error handler, will be displayed in the modal
          //handleReqResult(error);
        }
      }
  
      //this is called when the http is unable to be sent, means a network error
      xhr.onerror = function() {
        //set error to what this network issue generally is
        let error = 'Network error. Request was not made (most likely a CORS error).';
        //display it in the modal
        //handleReqResult(error);
      }
  }

  let makeOptionFromArray = (X) => {
    return <option key={X}>{X}</option>
  }
  let model_changed  = (event) => {
    let doc_id = event.target.value;
    console.log(doc_id);
    setModelSelected(doc_id.toString());

    //display the metrics
    let new_metrics = getMetrics(doc_id.toString());
    if(new_metrics != null){
      setM_Metrics(new_metrics);
    }else{
      setM_Metrics(default_metrics);
      setFig("")
    }
  }

  //initializes the available models to run
  useEffect(()=>{
    getModelNames()
    //get the id, then get the model metrics
  }, [])
  //Return following HTML code
  return (
  <>
  <Container>
    
    <Form>
      {/* Create a new Form Group For Getting Model */}
      <Form.Group className="mb-3" controlId="modelChoice">
      {/* Label For Choose Model */}
      <h2>Choose Model</h2>
      {/* Create element for user to choose Model */}
      <Form.Select aria-label="Model Select" onChange={model_changed}>
        {/* Placeholder for actual model */}
  
        {model_list.map(makeOptionFromArray)}
      </Form.Select>
      </Form.Group>
    </Form>
    <h2>Regression Metrics:</h2>
    <p>Explained variance score: {m_metrics["explained_variance_score"]}</p>
    <p>Max Error: {m_metrics["max_error"]}</p>
    <p>Mean Pinball Loss: {m_metrics["mean_pinball_loss"]}</p>
    <h2>Classification Metrics:</h2>
    <h2>Figures:</h2>
    {fig}
    <h2>Verbose Output:</h2>
    {m_metrics["verbose"]}
    </Container>
  </>
  );
}

//Export ModelMetrics for Dashboard
export default ModelMetrics;
