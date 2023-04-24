/*
Name: DecisionTreeDemo.js
Description: Creates demo for decision trees
Programmeers: Amith Panuganti 
Creation Date: 4/19/23
Preconditions: None
Post Conditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions:
    4/21/23
    Author: Amith Panuganti
    Description: Added most of the figures needed for the demo. Need interactive portion to complete it. 

    4/23/23
    Author: Amith Panuganti
    Description: Introduce Tree is Completed
*/

//Import react, GeneralDemo, Decision Tree
import React from "react"
import GeneralDemoPart from "./GeneralDemo"
import DecisionTree, {Tree, StaticTree, StructureTree, PortionTree, drawArrow} from "./DecisionTree"
import configData from '../../config/config.json'
//Contains the Deicision Tree Demo
function DecisionTreeDemo()
{
    return(
        <div>
        <h1>Decision Tree</h1>
        <IntroduceTree></IntroduceTree>
        </div>
    )
}

//Introduces the Decision Tree
function IntroduceTree()
{
    //Create a string used for static tree
    let staticTreeStr = "|--- width <= 0.80\n|   |--- class: 0\n|--- width >  0.80\n|   |--- height <= 1.75\n|   |   |--- class: 1\n|   |--- height  1.75\n|   |   |--- class: 2\n"

    //Create another string meant to point the specific structure of the tree
    let portionTreeStr = "|-- x <= 10\n|   |--- class: 0\n|--- x >  10\n|   |--- class: 1\n"

    //Create another string just for regression tree
    let regressionTreeStr = "|-- x <= 10\n|   |--- value = 1.5\n|--- x >  10\n|   |--- value = 2.5\n"

    //Create a tree using staticTreeStr, portionTreeStr, and regressionTreeStr
    let staticTree = new Tree(staticTreeStr)
    let portionTree = new Tree(portionTreeStr)
    let regressionTree = new Tree(regressionTreeStr)

    //Create a tag to store interactive tree in
    let tag = null

    //Hilights a portion of tree
    const highlightNode = (context, text, xPos, yPos) => {
        //Fill Box 
        context.beginPath()
        context.fillStyle = "green"
        context.fillRect(xPos, yPos, 80, 40)
        context.font = "12px Arial"
        context.textAlign = "center"
        context.fillStyle = "black"
        context.fillText(text, xPos+40, yPos+25)
    }
    //Higlights the left path of the tree
    const highlightLeft = (context) => {
        //Fill Root
        highlightNode(context, "x <= 10", 400, 50)

        //Draw Arrow 
        context.lineWidth = 3
        drawArrow(context, 440, 90, 390, 120, "blue")
        

        //Fill left child
        highlightNode(context, "class: 0", 350, 120)
    }

    //Higlight the right path of the tree
    const highlightRight = (context) => {
         //Fill Root
         highlightNode(context, "x <= 10", 250, 50)

         //Draw Arrow 
        context.lineWidth = 3
        drawArrow(context, 290, 90, 340, 120, "blue")
        
         //Fill right child
         highlightNode(context, "class: 1", 300, 120)
    }

    //Create a json response to backend to get tree for interactive demo
    //Get x and y input
    let features = configData.LOGISTIC_DEMO_DATA.TWO.X
    let labels = configData.DTREE_DEMO_DATA.TWO.y
    
    //Remove the second input for each feature in feature
    for(let i = 0; i < features.length; i++)
    {
        //Remove second element from array if length is 4
        if(features[i].length === 4)
        {
            features[i].splice(1, 1)
        }
    
    }
   
    //Create json request 
    let request = {
        "X": features,
        "y": labels,
        "model": "Decision Tree Classification Demo"
    }
    let jsonString = JSON.stringify(request)

    //Create url for request
    let url = "https://team-25-362714.uc.r.appspot.com/Demo"

    //Send request to backend 
    let xhr = new XMLHttpRequest()
    xhr.open("POST", url, false)

    //Handle request 
    xhr.onload = function() {
        //If status is 200
        if(xhr.status === 200)
        {
            //Get resposne 
            let response = JSON.parse(xhr.responseText)
            
            //Create interactive decision tree
            tag = <DecisionTree text={response} size={features[0].length}></DecisionTree>
        }
        //Otherwise
        else
        {
            //Set tag to message can get tree
            tag = <p>Can't get tree</p>
        }
    }

    //Send request
    xhr.send(jsonString)

    return(
        <div>
            <p>
                A Decision Tree is a machine learning model that uses a series of true or false statements about the input to determine the output. For each statement, the model will use a feature from the input and determine if it it makes the statement true or false. 
                Depending on answer will cause the model either to reach its final answer or look at more statements about the input. In contrast to a majority of machine learning models, a decision tree can be visualized. Thus, it allows us to understand how the tree understands
                the data to determine the output. 
                The following an example of a typical decision tree
            </p>
            <StaticTree tree={staticTree} width="800" xPos={600}></StaticTree>
            <p>
                A decision tree doesn't look like an actual tree, but its structure is similar to one. A tree is made up of nodes. You can think of nodes as an object that contains information or data.  
                A decision tree is compose of decision nodes, leaf nodes, the branches that connect the nodes together. 
            </p>
            <StructureTree tree={staticTree} branchColor="blue" leafColor="red" decisionColor="green"></StructureTree>
            <p>
                {/* Introduce Decision Node */}
                A decision node contains a true or false statement based on the input. They help guide the path towards the output of the tree. 
            </p>
            <PortionTree width="800" xPos={600} tree={portionTree} Color="green" toColor="Decision"></PortionTree>
            <p>
                The statement contain in the decision node has the following form. 
            </p>
            <h2 style={{textAlign:"center"}}>
                feature {"<="} value
            </h2>
            <p>
                {/* Finish Explaining */}
                Depending on the value of the feature x of the input, either the statement x is less than or equal to the value is true or false. 
                Whether the statement is true or false will determine what path the tree will take to get to the final output. 
            </p>
            <p>
                {/* Introduce Leaf Node*/}
                Leaf nodes contains the final output for our model. They are at tail ends of the tree and are all the final destiinations for all possible paths on tree. 
            </p>
            <PortionTree width="800" xPos={600} tree={portionTree} Color="green" toColor="Leaf"></PortionTree>
            <p>
                {/* Show distinction between leaf nodes */}
                The values that the leaf nodes contains are based on whether the tree is for classifcation or regression and all the training inputs that makes up that node. 
                A classification tree have leaf nodes that contains a class based on the classes of the training input that makes up the node
                Meanwhile, a regression tree contains a value that is the average of all outputs of the training inputs that makes up the node. 
            </p>

            <div style={{display:"flex"}}>
            <div>
                <h2 style={{position:"relative", left:"350px"}}>Classifcation</h2>
                <StaticTree tree={portionTree} width="550" xPos={400}></StaticTree>
            </div>
            <div>
            <h2 style={{position:"relative", left:"200px"}}>Regression</h2>
            <StaticTree tree={regressionTree} width="500" xPos={250}></StaticTree>
            </div>
            </div>
            <p>
                {/*Explain how the tree works */}
                The tree determines the output by using the decision nodes to determine if the features of the input will make the statement either true or false.  
                We start at the root and use the input to check if the first statement is true or false. 
                If the statement is true, then the tree takes the left branch and goes to the left node. Meanwhile, if the statement is false, the tree take the right branch
                and goes to the right node. We keep repeating this process for every decision node we encounter on the tree until we reach a leaf node, which contains the output. 
            </p>

            <div style={{display:"flex"}}>
            <div>
                <h2 style={{position:"relative", left:"400px"}}>x = 9 </h2>
                <StaticTree drawAdditional={highlightLeft} tree={portionTree} width="550" xPos={400}></StaticTree >
            </div>
            <div>
            <h2 style={{position:"relative", left:"250px"}}>x = 11</h2>
            <StaticTree drawAdditional={highlightRight} tree={regressionTree} width="500" xPos={250}></StaticTree >
            </div>
            </div>
                <p> 
                    {/* Introduce Interactive Tree */}
                    To have better understanding of how the tree works, here is tree to interact with it. Under the tree lies a form where you can 
                    change the values of the features on the input. Once you submit, use the features for your input to find the final output of the tree. 
                    Follow the process, go through each decision node, and click on the next node the tree should take depending on the input.
                    Keep going until you reach a leaf node containing your final answer. Try different inputs and see what paths you take on the tree. 
                </p>
                {tag}
            </div>
    );
}

export default DecisionTreeDemo