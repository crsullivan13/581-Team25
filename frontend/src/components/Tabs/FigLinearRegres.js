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
	console.log(parseInt(props.width));
	return (
	<svg id="fig1" style={{"background-color": "green"}}>
		<motion.line 
			initial={{
				x: ""+parseInt(props.width)/2+"px",
				y: ""+parseInt(props.height)/2+"px"
			}}
			style={{
				originX: "0px",
				originY: "0px"
			}}
			animate={{
				rotate: [0, -40, -75, -20, 45, 20, 0],
				y: [100, 75, 100, 125, 100]
			}}
			transition={{
				repeat: Infinity,
				duration: 3,
				repeatType: "loop",
				ease: "easeInOut"
			}}
			x1="-500px" x2="500px" y1="0" y2="0" stroke="blue" strokeWidth="5"
		/>
		<circle cx="50" cy="50" r="5" fill="red"></circle>
		<circle cx="150" cy="10" r="5" fill="red"></circle>
		<circle cx="50" cy="110" r="5" fill="red"></circle>
		<circle cx="180" cy="100" r="5" fill="red"></circle>
		<circle cx="200" cy="120" r="5" fill="red"></circle>
	</svg>
  );
}

export default FigLinearRegres;
