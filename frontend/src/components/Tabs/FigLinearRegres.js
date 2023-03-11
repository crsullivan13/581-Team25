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





function FigLinearRegres(props) {
	const [msDown, setmsDown] = useState(false);
	const [shiftPressed, setShift] = useState(false);
	const [yPos1, setYPos1] = useState(10);
	const [yPos2, setYPos2] = useState(10);
	const [yRot, setYRot] = useState(0);

	
	
	useEffect(() => {
		const keyDownHandler = event => {
			if (event.key === 'Shift') {
				event.preventDefault();
				console.log("shift pressed");
				setShift(true);
		  	}
		};

		const keyUpHandler = event => {
			if (event.key === 'Shift') {
				event.preventDefault();
				console.log("shift rel");
				setShift(false);
			}
		};

		document.addEventListener('keydown', keyDownHandler);
		document.addEventListener('keyup', keyUpHandler);

		return () => {
			document.removeEventListener('keydown', keyDownHandler);
			document.removeEventListener('keyup', keyDownHandler);
		  };
	}, [])



	function handleMouseDown(ev) { 
		let y = ev.clientY - ev.target.parentNode.getBoundingClientRect().top;
		let x = ev.clientX - ev.target.parentNode.getBoundingClientRect().left;
		setmsDown(true);
		console.log("Mouse Pressed") 
	}
	
	function handleMouseUp(ev) { 
		console.log("mouse up")
		setmsDown(false);
	}
	
	function handleMouseMove(ev) {
		if(msDown){
			if(shiftPressed){
				let y = ev.clientY - ev.target.parentNode.getBoundingClientRect().top;
				let x = ev.clientX - ev.target.parentNode.getBoundingClientRect().left;
				let halfwidth = 0.5* (ev.target.parentNode.getBoundingClientRect().right - ev.target.parentNode.getBoundingClientRect().left);
				let halfheight = 0.5*(ev.target.parentNode.getBoundingClientRect().top - ev.target.parentNode.getBoundingClientRect().bottom);
				
				let avg_ys = 0.5 * (yPos1 + yPos2);

				let newy2 = (-halfwidth)* (y - avg_ys)/(x - halfwidth) + avg_ys;
				let newy1 = (halfwidth)* (y - avg_ys)/(x - halfwidth) + avg_ys;
				setYPos1(newy1);
				setYPos2(newy2);
				console.log(avg_ys)

			}else{
				let y = ev.clientY - ev.target.parentNode.getBoundingClientRect().top;
				let avg_ys = 0.5 * (yPos1 + yPos2);
				let y1_d = yPos1 - avg_ys;
				let y2_d = yPos2 - avg_ys;
				setYPos1(y + y1_d);
				setYPos2(y + y2_d);
				console.log(y)
			}
		}
	}

	return (
	<svg id="fig1" backgroundcolor="green" onMouseDown={(ev) => handleMouseDown(ev)} onMouseMove={(ev) => handleMouseMove(ev)} onMouseUp={(ev) => handleMouseUp(ev)}>
		<motion.line 
			style={{
				originX: "0px",
				originY: "0px"
			}}
			animate={{
				y1: yPos1,
				y2: yPos2
			}}
			transition={{
				duration: 0.1,
				ease: "easeInOut"
			}}

			x1="0" x2="300" y1="0" y2="0" stroke="blue" strokeWidth="5"
		>
		</motion.line>
	</svg>
  );
}

export default FigLinearRegres;
