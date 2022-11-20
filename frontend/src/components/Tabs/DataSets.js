import Papa from "papaparse";
import React from 'react'
import { useState } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import fileDownload from "js-file-download";
import Row from 'react-bootstrap/Row'
import configData from '../../config/config.json'

function DataSets() {

    const [DataSetName, changeDataName] = useState('none');

    let dataSetChange = () => {
        let dataSet = document.getElementById('dataSetInput').value;
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

    let provideCSV = () => {
        console.log(DataSetName)
        let str = DataSetName.toLowerCase()
        if(str == 'none'){
            alert('select a data set to download')
        } else {

            let url = "https://team-25-362714.uc.r.appspot.com/datasets/" + str;

            let xhr = new XMLHttpRequest()
            xhr.open('GET', url)
            xhr.send()

            xhr.onload = function() {
                if(xhr.status == 200){
                    let parsedResponse = JSON.parse(xhr.responseText);

                    let xs = parsedResponse.X;
                    let ys = parsedResponse.y;

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
                } else {
                    alert('Bad request')
                }
            }

            xhr.onprogress = function(even) {
                alert('download in progess')
            }

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
                    <Button type="button" onClick={provideCSV}>Download</Button>
                </Row>
            </Container>
        </>
    );
}

export default DataSets;