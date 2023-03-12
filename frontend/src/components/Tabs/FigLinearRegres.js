/*
Name: FigLinearRegres.js
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

import './Training.css';
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

import { motion } from "framer-motion"

import { useRef } from 'react'



const FigLinearRegres = props => {
	const canvasRef = useRef(null);
	const [equation, setEquation] = useState("");
	const [error, setError] = useState("");
	let msdown = false;
	let shiftdown = false;
	let dataPtSelected = "na";

	let px;
	let py;
	let nx;
	let ny;


	let calcFunc = (x) => {return -1;}

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

	let calcEquation = () => {
		let slope = (py-ny)/(px-nx);
		slope = Math.round(100*slope)/100;

		let intercept = origin[1] - (slope*origin[0]);
		intercept = Math.round(100*intercept)/100;
		setEquation(""+slope+"x + " + intercept);

		calcFunc = (x) => {
			let val = x*slope + intercept;
			return val;
		}
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
		ctx.beginPath();
		ctx.arc(origin[0], origin[1], 5, 0, 2*Math.PI);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(nx, ny);
		ctx.lineTo(px, py);

		ctx.stroke();
		dataPoints(ctx);
	}

	const rotate = (ctx, x, y) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.fillStyle = '#000000'
		ctx.beginPath();
		ctx.arc(origin[0], origin[1], 10, 0, 2*Math.PI);
		ctx.stroke();
		

		let dx = x - origin[0];
		let dy = y - origin[1];

		let mag = Math.sqrt(dx*dx + dy*dy);
		let ratio = Math.max(ctx.canvas.width, ctx.canvas.height)/mag;

		let multiplier = ratio*3;

		px = origin[0] + dx*multiplier;
		py = origin[1] + dy*multiplier;
		nx = origin[0] - dx*multiplier;
		ny = origin[1] - dy*multiplier; 


		ctx.beginPath();
		ctx.moveTo(nx, ny);
		ctx.lineTo(px, py);

		ctx.stroke();
		dataPoints(ctx);
	}
	const offset = (ctx, x, y) => {

		let dy = py - origin[1];
		let dy_n = ny - origin[1];

		origin[1] = y;

		py = origin[1]+dy;
		ny = origin[1]+dy_n;



		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.fillStyle = '#000000'
		ctx.beginPath();
		ctx.arc(origin[0], origin[1], 5, 0, 2*Math.PI);
		ctx.stroke();


		ctx.beginPath();
		ctx.moveTo(nx, ny);
		ctx.lineTo(px, py);

		ctx.stroke();
		dataPoints(ctx);
	}

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		origin = [ctx.canvas.width/2, ctx.canvas.height/2];

		canvas.addEventListener("mousemove", function(e){

			if(msdown && !shiftdown && dataPtSelected === "na"){
				let x = e.clientX - canvas.getBoundingClientRect().left;
				let y = e.clientY - canvas.getBoundingClientRect().top;
				rotate(ctx, x, y);
				calcEquation();
			}
			else if(shiftdown){
				let x = e.clientX - canvas.getBoundingClientRect().left;
				let y = e.clientY - canvas.getBoundingClientRect().top;
				offset(ctx, x, y);
				calcEquation();
			}
			else if(dataPtSelected != "na"){
				let x = e.clientX - canvas.getBoundingClientRect().left;
				let y = e.clientY - canvas.getBoundingClientRect().top;
				dataPts[dataPtSelected] = [x, y];
				offset(ctx, 0, origin[1]);
			}

			calcError();
		});

		canvas.addEventListener("mousedown", function(e){
			msdown = true;
			let x = e.clientX - canvas.getBoundingClientRect().left;
			let y = e.clientY - canvas.getBoundingClientRect().top;
			//check if data point is under mouse:
			for(let key in dataPts){
				if(Math.abs(dataPts[key][0]-x) < 10 && Math.abs(dataPts[key][1]-y) < 10){
					dataPtSelected = key;
				}
			}
			offset(ctx, 0, origin[1]);
		});
		canvas.addEventListener("mouseup", function(e){
			msdown = false;

			for(let key in dataPts){
				dataPtSelected = "na";
			}

			releasing(ctx);
		});
		document.addEventListener("keydown", function(e){
			if(e.key == "Shift"){
				shiftdown = true;
			}
		});
		document.addEventListener("keyup", function(e){
			if(e.key == "Shift"){
				shiftdown = false;
				releasing(ctx);
			}
		});
		nx = 0;
		px = ctx.canvas.width;
		ny = ctx.canvas.height/2;
		py = ctx.canvas.height/2;
		offset(ctx, 0, origin[1]);
	}, [])

	return (
		<div>
			<p>Click and drag the line, and press shift to change the intercept of the line.</p>
			<p>Click and drag the data points to see how the error changes</p>
			<canvas ref={canvasRef} {...props}/>
			<p>Line Equation: {equation}</p>
			<p>Squared Error: {error}</p>
		</div>
	);
}

export default FigLinearRegres;
