/*
Name: LogisitcRegressionDemo.js
Description: Creates demo for logistic regression demo
Programmers: Amith Panuganti
Creation Date: 2/7/22
Preconditions: Used for logistic regression demo
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions:
*/

 /*
    The logistic regression will be divided into different sections
    1. Review what the user should already know, linear regressions
    Show how linear regressions is not good for classification
    Provide example of not being applicable
    2. Interactive Part #1: Let user create linear regressions model with example
    Return the loss the show case just how bad the model is 
    3. Explain through example why linear regressions is a bad idea.
    Suggest alternative by properly introudcing losgistic regression.
    Explain what it is used for, and how it works
    4. Interactive Part #2: Let user create logsitic regression model with example
    Return the loss and graph to show how good the model is
    5. Interactive Part #3: Example of logistic regression multinomial style
    6. Interactive Part #4: Example of logisitc regression that will not work
    */


//Import react
import React from "react";
import { useState } from 'react';
import {Button } from 'react-bootstrap';

//Create part 1 before
function LogisticRegressionPart1Front(props)
{
    //Create dictionary for table
    const dataset = [
        {temperature:40, feel:"Cold", class:0},
        {temperature:45, feel:"Cold", class:0},
        {temperature:50, feel:"Cold", class:0},
        {temperature:55, feel:"Cold", class:0},
        {temperature:60, feel:"Cold", class:0},
        {temperature:65, feel:"Hot", class:1},
        {temperature:70, feel:"Hot", class:1},
        {temperature:75, feel:"Hot", class:1},
        {temperature:80, feel:"Hot", class:1},
        {temperature:85, feel:"Hot", class:1}
    ]

    //Return statement
    return(
        <>
        <div>
            <p>
              Linear Regression is good for a type of machine learning called regression. Regression is the process of determining how the values of a series of variables affect the value of 1 varible. 
              However, what linear regression is not good at is classification. Classifcation is the process of assigning objects into different groups called classes based on its features which are a series of variables that represents the object. 
              Each class is represented by a set of distinct features that makes its objects different from other objects. For example, if we have a series of shapes, each shape have a distin t characteristcs, such as the number of sides, that makes it different from 
              some shapes but similar to other shapes. So, we can develop class shapes based on the number of sides, such as the triangle class for 3 sides of the rectangle class for 4 sides, and assign each shape a class based on the number of sides. 

            </p>
            <p>
              So, why is linear regression is not good fo classification? Well, linear regression is a regression model. So, it assumes that the value we are trying to predict, our output variable, based on the values of a set of varaibles, our inputs variables, can take on any number.
              This can range from negative numbers to decimal number. Essentially, our output variable can take on a infinite number of values. Asa result, any set of input variables with different values can lead to any value for the output variable. 
              However, classifcation involves a limited number of class rather an infinite amount of them. As a result, the output variable, which will represent a class, can only be a certain number of avlues. As a result, 
              only a specific set of input variables will lead to a certain value. 
            </p>
            <p>
                For example, lets say that I have a heater at home that controls the temperature of the house. 
                I want to know what temperatures make the house feel cold or hot so that I can control whether
                I want be cold or hot. 
            </p>
            <p>
                For this example, we are going to use the following dataset
            </p>
            <table>
                <tbody>
                <tr>
                    <th>Temperature</th>
                    <th>Cold or Hot</th>
                </tr>
                {dataset.map ((val, key) => {
                    return (
                        <tr key = {key}>
                            <td>
                                {val.temperature}
                            </td>
                            <td>
                                {val.feel}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <p>
                However, we need to convert both hot and cold into classes for classification.
                Each class is assigned an integer value starting for 0. In this case, we set the cold class to be 0
                and hot class to be 1. 
            </p>
            <p>
                After assigning each cold and hot value a class, we having the following dataset:
            </p>
            <table>
                <tbody>
                <tr>
                    <th>Temperature</th>
                    <th>Class</th>
                </tr>
                {dataset.map ((val, key) => {
                    return (
                        <tr key = {key}>
                            <td>
                                {val.temperature}
                            </td>
                            <td>
                                {val.class}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </>
    )
}

//Create Part 1 After Training
function LogisticRegressionPart1After(props)
{
    return(
        <div>
        <p>From the graph, you can see that the linear regression is not a good fit for the data. 
            While the line cross a few points, it cannot go through all the points on the graph
            This is because there are multiple points on the graph that contain the same graph. 
            This contradicts with the main assumption of regression, in which differnt inputs will
            lead to different outputs.
        </p>
        <p>
            In the end, linear regression is not a good idea for classification. Then, what other model
            can we use for classification? This is where logistic regresion comes in.
        </p>
        </div>
    )
}

//Create component for LogsticiRegressionPart
function LogisticRegressionPart(props)
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
            <LogisticRegressionTrain 
            training={training} 
            onChangeTraining={onChangeTraining} 
            X={props.X} 
            y={props.y} 
            model={props.model}>
            </LogisticRegressionTrain>
            {(training === true)
            ? <>{props.back}</>
            : <></>
            }
        </div>
    )
}
//Create component for training a logistic regression demo 
function LogisticRegressionTrain(props)
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
        let url = "http://127.0.0.1:5000/logisticRegressionDemo"

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

//Export default
export default LogisticRegressionPart
export {LogisticRegressionPart1Front, LogisticRegressionPart1After}