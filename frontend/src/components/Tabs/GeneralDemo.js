/*
Name: GeneralDemo.js
Description: Creates structure for all demos
Programmers: Amith Panuganti
Creation Date: 2/23/23
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions:
    Date: 2/23/22
    Author: Amith Panuganti
    Description: Added Components For All Demos
*/

//Import react
import React from "react";
import { useState } from 'react';
import {Button } from 'react-bootstrap';

//Create a component for general demo component
function GeneralDemoPart(props)
{
    //Keeps track of when training is completed or not
    const [training, setTraining] = useState(false)

    //Create function to change state of training 
    const onChangeTraining = (newTraining) => {
        //Set training to be newTraining
        setTraining(newTraining)
    }

    return(
        <div>
		<p>
			In this section, we'll cover the basics of model training. Machine learning is all about taking a set of "input variables" and predicting some sort of output.
		</p>
            {props.front}
            <GeneralDemoTrain
            model={props.model}>
            </GeneralDemoTrain>
            {(training === true)
            ? <>{props.back}</>
            : <></>
            }
        </div>
    )
}

//Create a component for training a model for any demo
function GeneralDemoTrain(props)
{
    //Will store/show the results of training the model
    const [results, setResults] = useState()

    //Will disable the button to prevent any further training
    const [button, setButton] = useState(false)

    //Define training function 
    let handleTrain = () => {
        //Create dictionary to for training
        let model_data = {
            "X": props.X,
            "y": props.y,
            "model": props.model
        }

        //Set url for training 
        let url = "http://127.0.0.1:5000/Demo"

        //Make request json string
        let jsonString = JSON.stringify(model_data)

        //Create object that will handling sending and recieving information 
        let xhr = new XMLHttpRequest()

        //Create POST request to url
        xhr.open("POST", url, false)

        //Create onload function to handle loading
        xhr.onload = function() {
            //If status of xhr is 200
            if(xhr.status === 200)
            {
                //Get repsonse from xhr
                let jsonResponse = JSON.parse(xhr.responseText)

                //Create list of tags
                let tags = []

                //Grab image from jsonResponse
                const image = "data:image/png;base64,"+jsonResponse.figure;

                //Create image tag
                let imageTag = <img alt="Figure" key="Figure" src={image}></img>

                //Create loss tag
                let lossTag = <p key="Loss">Loss: {jsonResponse.loss}</p>

                //Add both imageTage and lossTag to tags
                tags.push(imageTag)
                tags.push(lossTag)

                //If jsonResponse has accuracy property
                if(jsonResponse.hasOwnProperty("accuracy"))
                {
                    //Create tag for accuracy
                    let accuracyTag = <p key="Accuracy">Accuracy: {jsonResponse.accuracy}</p>

                    //Push tag to tags
                    tags.push(accuracyTag)
                }

                //Set results
                setResults(tags)

                //Disable button
                setButton(true)

                //Handle training in parent component
                props.onChangeTraining(true)
                
            }
            //Otherwise
            else
            {
                //Alert the user
                let error = "Error: " + xhr.responseText
                alert(error)
            }
        }

        //Send string
        xhr.send(jsonString)
    }

    return(
        <>
        <Button type="button" onClick={handleTrain} disabled={button}>Train</Button>
        <div>
            {results}
        </div>
        </>
    )
}

export default GeneralDemoPart
