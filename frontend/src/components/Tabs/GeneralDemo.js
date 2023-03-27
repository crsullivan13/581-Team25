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
    Date: 2/23/23
    Author: Amith Panuganti
    Description: Added Components For All Demos

    Data: 3/23/23
    Author: Amith Panuganti
    Description: Modified GeneralTrain to allow for inputs 
*/

//Import react
import React from "react";
import { useState, useRef} from 'react';
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
            {props.front}
            <GeneralDemoTrain
            training={training} 
            onChangeTraining={onChangeTraining} 
            X={props.X} 
            y={props.y} 
            model={props.model}
            buttonDisable={props.buttonDisable}
            inputForm={props.inputForm}
            hasInputs={props.hasInputs}
            >
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

    //Create a state that will store the inputs for the model
    const [inputs, setInputs] = useState({})

    //Create a state that will check if the input is valid or not
    const [inputsValid, setInputsValid] = useState({})

    //Get the input form
    const InputForm = props.inputForm

    //Define training function 
    let handleTrain = () => {
        //Create dictionary to for training
        let model_data = {
            "X": props.X,
            "y": props.y,
            "model": props.model
        }

        //If props.hasInputs is true
        if(props.hasInputs === true)
        {
            //Have inputForm check in the inputs if they are valid or not
            //If they are not valid
            if(inputsValid["entry"] === false)
            {
                //Return prevent model training
                alert("Inputs are invalid. Please try again")
                return
            }

            //Add the entries in inputs to model_data
            model_data = Object.assign({}, model_data, inputs)
        }
        

        //Set url for training 
        let url = "https://team-25-362714.uc.r.appspot.com/Demo"

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

                //GO through each property in jsonResponse
                for(const property in jsonResponse)
                {
                    //If property is figure
                    if(property === "figure")
                    {
                       //Grab image from jsonResponse
                        const image = "data:image/png;base64,"+jsonResponse.figure;

                        //Create image tag
                        let imageTag = <img alt="Figure" key="Figure" src={image}></img>

                        //Add image tag
                        tags.push(imageTag)
                    }
                    //Otherwise
                    else
                    {
                        //Create a tag with the property
                        let tag = <p key={property}>{property}: {jsonResponse[property]}</p>

                        //Push tag
                        tags.push(tag)
                    }
                }

                //Set results
                setResults(tags)

                //If props.disable is true
                //D
                if(props.buttonDisable===true)
                {
                    //Disable button
                    setButton(true)
                }

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
        {
          (props.hasInputs === true)
          ? <InputForm inputsValid={inputsValid} model_data={inputs}/>
          : <></>
        }
        
        <Button type="button" onClick={handleTrain} disabled={button}>Train</Button>
        <div>
            {results}
        </div>
        </>
    )
}


export default GeneralDemoPart