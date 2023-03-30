/*
Name: FigLogisticRegres.js
Description: Tab which allows users to select a model, change hyperparameters, and choose what metrics will be recorded
Programmers: Griffin Keeter, Connor Sullivan, Amith Panuganti
Creation Date: 9/24/22
Revisions:
	10/11/22 - TEMPORARY CHANGES: bring data input into this page for now for S2 POC, add ability to see returned model
	11/17/22 
		Author: Amith Panuganti
		Edit: Allowed metrics to be added
	11/20/22
		Edit: Add basic http error response display in a pop up modal
Preconditions: None
Errors: None
Side Effects: When the begin training button is pressed, the training will start in the gce
Invariants: None
Faults: None
*/

//imports
import React from "react"

import Papa from "papaparse";

import './FigLogisticRegres.css';
import LogisticRegressHypParams from "./LogisticRegressHypParams"
import DecisionTreeHypParams from "./DecisionTreeHypParams"
import DecisionTreeClassifierHypParams from "./DecisionTreeClassifierHypParams"
import MultiLayerPerceptronClassHypParams from "./MultiLayerPerceptronClassHypParams"
import MultiLayerPerceptronRegressHypParams from "./MultiLayerPerceptronRegressHypParams"
import NaiveBayesClassifierHypParams from "./NaiveBayesClassifierHypParams"
import SequentialModel from "./SequentialModelHypParams"
import GenericHypParams from "./GenericHypParams"
import { Form, Button, Container, ModalHeader } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Modal from 'react-bootstrap/Modal'

import { useState, useEffect } from 'react';

import {useAuth} from "../../contexts/AuthContext"


import { useRef } from 'react'



const FigLogisticRegres = props => {
	const canvasRef = useRef(null);
	const [equation, setEquation] = useState("");
	const [error, setError] = useState("");
	const [coef1, setCoef1] = useState(3);
	const [coef2, setCoef2] = useState(2);
	let msdown = false;
	let shiftdown = false;
	let dataPtSelected = "na";

	let px;
	let py;
	let nx;
	let ny;


	let calcFunc = (x, ctx) => {
		x = x - (ctx.canvas.width/2);
		x = x/55;
		let exp = -(coef1 + (coef2*x));
		let y = -150/(1+Math.pow(2.71, exp)) + 30;
		y = y + (ctx.canvas.height/2);
		return y;
	}

	let origin = [50, 50];

	let dataPts = {
		"p1": [20, 20],
		"p2": [34, 35],
		"p3": [60, 20],
		"p4": [34, 65],
	};


	let calcError = () => {
		let dist = 0;
		for(let key in dataPts){
			let datax = dataPts[key][0];
			let datay = dataPts[key][1];

			dist = dist + Math.pow(calcFunc(datax) - datay, 2);
		}
		dist = Math.round(dist*100)/100;
		setError(dist);
	}



	let dataPoints = (ctx) => {
		ctx.fillStyle = '#000000';
		for(let key in dataPts){
			if(key == dataPtSelected){
				ctx.beginPath();
				ctx.arc(dataPts[key][0], dataPts[key][1], 6, 0, 2*Math.PI);
				ctx.stroke();
			}else{
				ctx.beginPath();
				ctx.arc(dataPts[key][0], dataPts[key][1], 3, 0, 2*Math.PI);
				ctx.stroke();
			}
		}
	}

	const releasing = (ctx) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.fillStyle = '#000000'
		dataPoints(ctx);
	}

	const changeCoef1 = (e) => {
		let val = e.target.value/100;
		val -= 0.5;
		setCoef1(val*10);
	}
	const changeCoef2 = (e) => {
		let val = e.target.value/100;
		val -= 0.5;
		setCoef2(val*10);
	}
	const update = (ctx) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.lineWidth = 5;
		ctx.fillStyle = 'blue';
		ctx.strokeStyle = 'blue';

		//draw curve
		ctx.beginPath();
		ctx.moveTo(0, calcFunc(0, ctx));
		for(let i = 0; i < ctx.canvas.width; i += 10){
			let y = calcFunc(i, ctx);
			ctx.lineTo(i, y);
		}
		ctx.stroke();
	}

	const mouseDown = (e) =>{
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		console.log("called");
		let x = e.clientX - canvas.getBoundingClientRect().left;
		let y = e.clientY - canvas.getBoundingClientRect().top;
		msdown = true;
			//check if data point is under mouse:
			for(let key in dataPts){
				if(Math.abs(dataPts[key][0]-x) < 10 && Math.abs(dataPts[key][1]-y) < 10){
					dataPtSelected = key;
				}
			}
		update(ctx);
		dataPoints(ctx);
	}
	const mouseUp = (e) =>{
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		msdown = false;

			for(let key in dataPts){
				dataPtSelected = "na";
			}
		update(ctx);
		dataPoints(ctx);
	}
	
	const mouseMove = (e) =>{
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		if(dataPtSelected != "na"){
			let x = e.clientX - canvas.getBoundingClientRect().left;
			let y = e.clientY - canvas.getBoundingClientRect().top;
			dataPts[dataPtSelected] = [x, y];
		}
		update(ctx);
		dataPoints(ctx);
	}

	useEffect(() => {
		
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		origin = [ctx.canvas.width/2, ctx.canvas.height/2];

		update(ctx);
		dataPoints(ctx);


	});


	return (
		<div id="div_top">
			<p>Click and drag the line, and press shift to change the intercept of the line.</p>
			<p>Click and drag the data points to see how the error changes</p>
			<canvas id="canv" ref={canvasRef} {...props} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}/><br/>
			Coefficient 1: <input type="range" onChange={changeCoef1}/><br/>
			Coefficient 2: <input type="range" onChange={changeCoef2}/>
			<p>Squared Error: {error}</p>
		</div>
	);
}

export default FigLogisticRegres;
