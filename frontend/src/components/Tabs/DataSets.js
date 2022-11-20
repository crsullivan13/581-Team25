/*
Name: DataSets.js
Description: This is where the user can access standard data sets to play with, same sets we use in our demos
Programmers: Connor Sullivan
Creation Date: 11/18/22
Revisions:
	11/18/22 - inital build of file
Preconditions: None
Errors: None
Side Effects: Starts download of a csv file
Invariants: None
Faults: None
*/

//imports
import Papa from "papaparse";
import React from 'react'
import { useState } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import fileDownload from "js-file-download";
import Row from 'react-bootstrap/Row'
import configData from '../../config/config.json'

function DataSets() {

    //state to carry around the name of the data set that the user wants, use this for hitting proper set url
    const [DataSetName, changeDataName] = useState('none');

    //handler to pull name of data set out of form and set the state
    let dataSetChange = () => {
        //get the name from the form
        let dataSet = document.getElementById('dataSetInput').value;
        //set the state
        changeDataName(dataSet);
    }

    /* purely for testing
    let testCSV = () => {
        let xs = configData.LINEAR_DEMO_DATA.ONE.X;
        let ys = configData.LINEAR_DEMO_DATA.ONE.y;

        let i;
        let tempArr = []
        for(i = 0; i < ys.length; i++){
            let temp = [].concat(xs[i], ys[i])
            tempArr[i] = temp
        }

        let pairedData = {
            Data: tempArr
        }

        let csv = Papa.unparse(pairedData.Data)
        fileDownload(csv, DataSetName + '.csv')
    }
    */

    //main action here, starts csv download
    let provideCSV = () => {
        console.log(DataSetName)

        //make sure we are lowercase
        let str = DataSetName.toLowerCase()
        
        //if the selected set it none we can't do anything
        if(str == 'none'){
            //let the user know that they need to select a data set
            alert('select a data set to download')
        } else {

            //url, concat on the name of the set
            let url = "https://team-25-362714.uc.r.appspot.com/datasets/" + str;

            //setup http request
            let xhr = new XMLHttpRequest()
            //get request with above url
            xhr.open('GET', url)
            //send request, no body needed
            xhr.send()

            //called when the request completes
            xhr.onload = function() {
                //on a 200 we do some parsing
                if(xhr.status == 200){
                    //parse the response body
                    let parsedResponse = JSON.parse(xhr.responseText);

                    //split out the x an y vectors
                    let xs = parsedResponse.X;
                    let ys = parsedResponse.y;

                    //setup up some vlaues for the loop
                    let i;
                    let tempArr = []
                    
                    //loop over ys, pair each y(label) with an x item (data item)
                    for(i = 0; i < ys.length; i++){
                        let temp = [].concat(xs[i], ys[i])
                        tempArr[i] = temp
                    }
            
                    //put the paired up array in an object
                    let pairedData = {
                        Data: tempArr
                    }
            
                    //parse the object into a csv file
                    let csv = Papa.unparse(pairedData.Data)

                    //start the csv download
                    fileDownload(csv, DataSetName + '.csv')
                } else {
                    //anything not on a 200 and we have a bad request
                    alert('Bad request')
                }
            }

            //while request is in progess show that it is making progress
            xhr.onprogress = function(event) {
                alert('download in progess')
            }

            //this is called when the http request fails completely
            xhr.onerror = function() {
                alert('Network error')
            }
        }
    }

    return(
        <>
            <Container>
                <h1 className='w-100 mt-2'>ML Demos</h1>
                <p>This page allows you to download some standard data sets to play with</p>
                <Row>
                    {/*basic drop down form for data set selection*/}
                    <Form.Select id="dataSetInput" aria-label="Data Select" onChange={dataSetChange}>
                        <option>None</option>
                        <option>Iris</option>
                    </Form.Select>
                </Row>
                <Row>
                </Row>
            </Container>

            <Container>
                <Row>
                    {/* Button to start the download process */}
                    <Button type="button" onClick={provideCSV}>Download</Button>
                </Row>
            </Container>
        </>
    );
}

export default DataSets;