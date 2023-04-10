/*
Name: KNNHypParams.js
Description: A component containing a menu that allow user to choose hyperparameters for KNN models
Programmers: Amith Panuganti
Creation Date: 4/7/23
Preconditions: None
Postconditions: None
Errors: None
Side Effects: Render the hyperparameter inputs
Invariants: None
Faults: None
Revisions:
    Date 3/7/23
    Author: Amith Panuganti
    Description: Started making KNNHypParams

    Date: 3/8/23
    Author: Amith Panuganti
    Description: Updated KNNHyParams to only have 1 option
*/

//Import React
import React from "react"
import GenericHypParams from "./GenericHypParams"
import {IntParam, ChoiceParam} from "./GenericHypParams"

//Create a function that will store the parameters for KNN
//Input: props, contains the following properties
//model: The name of the model being used
//model_data_p: The stae of the model
function KNNHypParams(props)
{
    //Create GeneriHypParams for KNN
    return(
        <GenericHypParams model_data_p={props.model_data_p} perRow={1} model={props.model}>
            <IntParam param="k" defaultValue={5} label="Neighbors"></IntParam>
        </GenericHypParams>
    );
}

//Export KNN HypParams
export default KNNHypParams