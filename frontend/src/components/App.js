/*
Name: App.js
Description: Page handler, this ends up in the index.js as the entry point, handles routing
Programmers: Amith Panuganti, Connor Sullivan
Creation Date: 9/24/22
Revisions:
	9/24/22:
    	Revision: Initial creation
		Author: Connor Sullivan
	9/24/22:
		Revision: Fixed an error with tabs printing twice
		Author: Amith Panuganti 
	9/25/22
		Revision: Fixed an error by using actual functions
		Author: Amith Panuganti
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//import everything that we need
import React from "react"
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login"
import '../App.css';
import NavigationBar from "./NavigationBar";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import DataInput from "./Tabs/DataInput";
import ModelMetrics from "./Tabs/ModelMetrics";
import ModelUsage from "./Tabs/ModelUsage";
import Training from "./Tabs/Training";

//function that gets exported to be used as a componenet
function App() {

	//buckle up

	

	//the router tag allows us to handle page routing without using href stuff
	//wrap it in auth provider so we can ensure that the context is accessible
	//exact path is used because otherwise all routing will match the first / and then bail out
	//the private route tag wrapping the elements is to make sure we can't access those pages unless we are logged in
	//everything is pretty simple, just specify the path and pass the corresponding componenet in to the element field
	//<></> this set of tags is to say we are putting JSX in here
	return (
		<>
		<Router>
			<AuthProvider>
			
				<Routes>
					<Route exact path="/" element={<><PrivateRoute><NavigationBar /> <Dashboard /></PrivateRoute> </>} />
					<Route path="/signup" element={<Signup/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/datainput" element={<><PrivateRoute><NavigationBar /><DataInput></DataInput></PrivateRoute></>} />
					<Route path="/modelmetrics" element={<><PrivateRoute><NavigationBar /><ModelMetrics></ModelMetrics></PrivateRoute></>} />
					<Route path="/modelusage" element={<><PrivateRoute><NavigationBar /><ModelUsage></ModelUsage></PrivateRoute></>} />
					<Route path="/training" element={<><PrivateRoute><NavigationBar /><Training></Training></PrivateRoute></>} />
				</Routes>
			</AuthProvider>
		</Router>
		</>
  )
}
export default App;
