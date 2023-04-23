/*
Name: DecisionTree.js
Description: Creates interacitve tree for decision tree demo
Programmers: Amith Panuganti
Creation Date: 11/30/22
Preconditions: Only used when decision tree demo is called
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions:
    Date: 11/30/22
    Author: Amith Panugatni
    Description: Started Tree Structure to convert tree text to html tree
Revisions:
    Date: 1/19/22
    Author: Amith Panuganti
    Decscription: Finish converting text to tree structure
Revisions:
    Date 1/20/22
    Author: Amith Panuganti
    Desciprtion: Starting the drawing of the tree starting with its leafs
Revision:
    Date 1/21/22
    Author: Amith Panuganti
    Description: Allow levaes to draw arrows
Revisiion:
    Date 1/23/22
    Author: Amith Panuganti
    Description: Updated Tree Structure. Decided to use 1 canvas tag
Revision:
    Date 1/24/22
    Author: Amith Panuganti
    Description: Display decision tree on demo page
Revision:
    Date 1/29/22
    Author: Amith Panuganti
    Description: Made tree fully interactive. However, it does has some bugs that needs to be fixed
Revision:
    Date 2/3/22
    Author: Amith Panuganti 
    Description: Allows users to use the same interactive decision tree multiple times.
Revision:  
    Date 2/19/23
    Author: Amith Panuganti 
    Description: Added a decision tree that can is non interactive
Revision:
    Date 2/20/23
    Author: Amith Panuganti
    Description: Create a component to showcase the structure of a tree by hilighting its
    components
Revision:
    Date 2/21/23
    Author: Amith Panuganti
    Description: Create a component to higlight only certain structural portions of the tree 

    Date: 2/23/23
    Author: Amith Panuganti
    Description: Modify Decision Leaf to highlight the path of the tree
*/


//Import react
import React, { useRef, useEffect, useState } from "react"

//Draw the arrow
//Inputs: ctx, (fromX, fromY) starting position, (toX, oY) end position
const drawArrow = (ctx, fromX, fromY, toX, toY, color) => {
    //Start new path 
    ctx.beginPath()

    //Get the x distance at fromX to toX
    let dx = toX - fromX

    //Get the y distance at fromY to toY
    let dy = toY - fromY

    //Get the angle of the arrow
    let angle = Math.atan2(dy, dx)

    //Draw line from (fromX, fromY) to (toX, toY)
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)

    //Create the triangle portion of the arrow
    ctx.lineTo(toX - 10 * Math.cos(angle - Math.PI / 6), toY - 10 * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - 10 * Math.cos(angle + Math.PI / 6), toY - 10 * Math.sin(angle + Math.PI / 6));

    //Set stroke style and color the draw
    ctx.strokeStyle = color
    ctx.stroke()
}

//Draws the tree with out higlighting
const drawTreeNormally = (context, leaf, xPos, yPos) => {
    //Draw the tree and get XPos and YPos
    let positions = drawTree(context, leaf, xPos, yPos, "black")

    //If positions is null
    if (positions === null) {
        //Stop drawing the tree
        return
    }

    let leftXPos = positions[0]
    let rightXPos = positions[1]

    //Next, we draw the arrows to each box
    drawArrow(context, xPos + 40, yPos + 40, leftXPos + 40, yPos + 70, "black")
    drawArrow(context, xPos + 40, yPos + 40, rightXPos + 40, yPos + 70, "black")

    //Draw the box for the left and right children
    drawTreeNormally(context, leaf.leftChild, leftXPos, yPos + 70)
    drawTreeNormally(context, leaf.rightChild, rightXPos, yPos + 70)
}

//Higlihts the tree 
const highlightTree = (context, leaf, xPos, yPos, lbranchColor, rbranchColor, leafColor, decisionColor) => {
    //Determine the color to higlight the tree
    let color = decisionColor

    //Set context for the nodes
    context.lineWidth = 5

    //If type of tree is decision
    if (leaf.type === "Class") {
        //Set color to be deicsionColor
        color = leafColor
    }

    //Draws the tree and getXPos and Ypos 
    let positions = drawTree(context, leaf, xPos, yPos, color)

    //If positions is null
    if (positions === null) {
        //Stop drawing the tree
        return null
    }

    //Get lefXPos and rightXPos
    let leftXPos = positions[0]
    let rightXPos = positions[1]

    //Set linedwith of arrow
    context.lineWidth = 3
    //Draw the arrows based on branchColor
    drawArrow(context, xPos + 40, yPos + 40, leftXPos + 40, yPos + 70, lbranchColor)
    drawArrow(context, xPos + 40, yPos + 40, rightXPos + 40, yPos + 70, rbranchColor)

    highlightTree(context, leaf.leftChild, leftXPos, yPos + 70, lbranchColor, rbranchColor, leafColor, decisionColor)
    highlightTree(context, leaf.rightChild, rightXPos, yPos + 70, lbranchColor, rbranchColor, leafColor, decisionColor)
}

//Draw tree
const drawTree = (context, leaf, xPos, yPos, color) => {
    //Set the coordinates of the leaf
    leaf.xCor = xPos
    leaf.yCor = yPos

    //Firstly, begin the tree
    context.beginPath()

    //Create rect
    context.rect(xPos, yPos, 80, 40)
    context.strokeStyle = color
    context.stroke()

    //Get the text from from leaf
    let info = leaf.info

    //Add text
    context.font = "12px Arial"
    context.textAlign = "center"
    context.strokeStyle = "black"
    context.fillText(info, xPos + 40, yPos + 25)

    //If leaf has children
    if (leaf.rightChild != null && leaf.leftChild != null) {
        //Get the longestPath of both leftChild and rightChild
        let lowestPath = leaf.leftChild.longestPath
        let rightPath = leaf.rightChild.longestPath

        //If rightPath is loweer than lowestPath
        if (rightPath < lowestPath) {
            //Let lowestPath be rightPath
            lowestPath = rightPath
        }

        //Caculate the difference between the next children node
        let difference = lowestPath * 135

        //Add 20 to difference
        difference = ((difference + 20) / 2)

        //Get the xPos of the left box
        let leftXPos = (xPos + 40) - difference - 80

        //Get the rightXPos
        let rightXPos = (xPos + 40) + difference

        //Return leftXPos and rightXPos
        return [leftXPos, rightXPos]
    }
    //Otherwise if not 
    return null
}

//Create Tree Node Function
class DecisionTree extends React.Component {
    //Constructor For Class
    constructor(props) {
        //Super Construct
        super(props)


        //Get this.state
        this.state = {
            text: this.props.text,
            tree: new Tree(this.props.text),
            size: this.props.size
        }
    }

    //Render
    render() {

        return (
            <>
                <DecisionLeaf tree={this.state.tree} size={this.state.size}></DecisionLeaf>
            </>)


    }
}

//Create a component for deicision tree
function StaticTree(props) {
    //Creates a reference to canvas
    const canvasRef = useRef(null)

    //Create state for tree 
    let tree = props.tree

    //Runs child func
    const runChildFunc = (context) => {
        //If there is a draw additional funciton
        if(props.drawAdditional !== undefined)
        {
            //Run Draw Additional 
            props.drawAdditional(context)
        }
    }
    //Intial rendering
    useEffect(() => {
        //Get the reference
        const canvas = canvasRef.current

        //Get the context
        const context = canvas.getContext("2d")
        context.canvas.width = props.width

        //Get the height of canvas
        context.canvas.height = ((tree.treeDepth + 1) * 100)

        //Draw the tree
        drawTreeNormally(context, tree.root, props.xPos, 50)

        //Finish drawing the tree
        runChildFunc(context, tree)
        //Clear the rectangle
        return () => {
            //Clear reactangle
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [tree.root, tree.treeDepth, props])

    
    //Return canvas
    return (
        <canvas ref={canvasRef}></canvas>
    );
}

//Create a component that points to the structure of the tree
function StructureTree(props) {
    //Creates a reference to canvas to be use for drawing
    const canvasRef = useRef(null)

    //Create a state for the tree
    let tree = props.tree

    //Initial rendering 
    useEffect(() => {
        //Get the reference
        const canvas = canvasRef.current

        //Get the context
        const context = canvas.getContext("2d")
        context.canvas.width = "800"

        //Get the height of canvas
        context.canvas.height = ((tree.treeDepth + 1) * 100)

        //Highlight the tree
        highlightTree(context, tree.root, 600, 50, props.branchColor, props.branchColor, props.leafColor, props.decisionColor)

        //Create a key to for each color
        //Start by creating the box for the key
        context.beginPath()
        context.rect(200, 50, 200, 200)

        //Write key
        context.font = "18px Arial"
        context.strokeStyle = "black"
        context.fillText("Key", 300, 90)

        //Write Labels
        context.fillText("Decision", 275, 130)
        context.fillText("Leaf", 275, 170)
        context.fillText("Branch", 275, 210)

        //Draw boxes with their colors
        //Decision
        context.fillStyle = props.decisionColor
        context.fillRect(325, 112.5, 20, 20)

        //Leaf 
        context.fillStyle = props.leafColor
        context.fillRect(325, 170 - 17.5, 20, 20)

        //Branch
        context.fillStyle = props.branchColor
        context.fillRect(325, 210 - 17.5, 20, 20)

        context.stroke()

    })
    //Return canvas
    return (
        <canvas ref={canvasRef}></canvas>
    );
}

//Create a component that hilight only 1 portion of the tree
function PortionTree(props) {
    //Creates a reference to canvas to be use for drawing
    const canvasRef = useRef(null)

    //Create a state for the tree
    let tree = props.tree

    //Initial rendering 
    useEffect(() => {
        //Get the reference
        const canvas = canvasRef.current

        //Get the context
        const context = canvas.getContext("2d")
        context.canvas.width = props.width

        //Get the height of canvas
        context.canvas.height = ((tree.treeDepth + 1) * 100)

        //higliht Tree based on what to higlight
        switch (props.toColor) {
            //Color Left Branch
            case "Left Branch":
                highlightTree(context, tree.root, props.xPos, 50, props.Color, "black", "black", "black")
                break
            //Color Right Branch
            case "Right Branch":
                highlightTree(context, tree.root, props.xPos, 50, "black", props.Color, "black", "black")
                break
            //Color Leaf Node
            case "Leaf":
                highlightTree(context, tree.root, props.xPos, 50, "black", "black", props.Color, "black")
                break
            //Color Deicision Node
            case "Decision":
                highlightTree(context, tree.root, props.xPos, 50, "black", "black", "black", props.Color)
                break
            default:
                break
        }
    })
    //Return canvas
    return (
        <canvas ref={canvasRef}></canvas>
    );
}

//Create a component that 
//Create a block component used to store the node of a tree
function DecisionLeaf(props) {
    //Makes the tree interactive
    let [interacitve, setInteractive] = useState(null)

    //Create state that store the values for input
    let [inputs, setInputs] = useState([])

    //Store the infomration about canvas
    let [canvasInfo, setCanvasInfo] = useState(null)

    //Store the infomration about tree
    let [leaf, setLeaf] = useState(null)

    //Create state for tree 
    let tree = props.tree

    //Get size of tree
    let size = props.size

    //Create reference for canvas
    const canvasRef = useRef(null)

    //Redraws the tree
    //Takes in context, the context of the canvas 
    //And leaf, a node of the tree
    const redrawTree = (context, leaf) => {
        //Firstly, begin the tree
        context.beginPath()

        //Create rect
        context.rect(leaf.xCor, leaf.yCor, 80, 40)
        context.stroke()

        //Get the text from from leaf
        let info = leaf.info

        //Add text
        context.font = "12px Arial"
        context.textAlign = "center"
        context.fillText(info, leaf.xCor + 40, leaf.yCor + 25)

        //Next, if leaf has children s
        if (leaf.type !== "Class") {
            //Redraw tree for left and right child
            redrawTree(context, leaf.leftChild)
            redrawTree(context, leaf.rightChild)

            //Redraw arrows for the tree
            drawArrow(context, leaf.xCor + 40, leaf.yCor + 40, leaf.leftChild.xCor + 40, leaf.yCor + 70, "black")
            drawArrow(context, leaf.xCor + 40, leaf.yCor + 40, leaf.rightChild.xCor + 40, leaf.yCor + 70, "black")
        }
    }


    //Create handleChange function
    const handleChange = (event) => {
        //Get name of input
        let name = event.target.name

        //Get value 
        let value = event.target.value

        //If value is empty
        if (value === "") {
            //Replace value with 0
            event.target.value = 0

            //Set value to be 0
            value = 0
        }

        //Update value
        let newInputs = inputs
        newInputs[name] = value
        setInputs(newInputs)

    }

    //Create input tags
    let tagInputs = []
    for (let i = 0; i < size; i++) {
        //Create name
        let name = i

        //Create label name
        let labelName = "x" + name.toString() + ":"

        //Create label
        let label = <label key={labelName}>{labelName}</label>

        //Add label to inputs
        tagInputs.push(label)

        //Create input tag
        let input = <input key={name} name={name} onChange={(event) => handleChange(event)} defaultValue="0" type="number" />

        //Add input to inputs
        tagInputs.push(input)
    }

    //Intial rendering
    useEffect(() => {
        //Get the reference
        const canvas = canvasRef.current

        //Get the context
        const context = canvas.getContext("2d")
        context.canvas.width = "1000"

        //Get the height of canvas
        context.canvas.height = ((tree.treeDepth) * 100) + 25

        //Draw the tree
        drawTreeNormally(context, tree.root, 600, 50)

        //Create empty array of avlaues
        let values = []

        //Create array of 0s
        for (let i = 0; i < size; i++) {
            //Push 0 to values
            values.push(0)
        }

        //Add values to inputs
        setInputs(values)

        //Set canvasInfo
        setCanvasInfo({ xPos: 0, yPos: 0 })

        //Set leaf
        setLeaf(tree.root)

        return () => {
            //Clear reactangle
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

    }, [props.isOpen])


    //Used to make the tree interactive
    useEffect(() => {
        //If interactive is true, return false
        if (interacitve === true) {
            //Make the tree green
            const canvas = canvasRef.current
            const context = canvas.getContext("2d")

            //Set stroke style to be black
            context.strokeStyle = "black"

            //Clear reactangle
            context.clearRect(0, 0, canvas.width, canvas.height);

            //Redraw the entire tree
            redrawTree(context, tree.root)

            //Clear canvas
            context.fillStyle = "green"

            //Fill the root
            context.fillRect(600, 50, 80, 40)

            //Get the text from the root
            const text = tree.root.info

            //Fill text
            context.font = "12px Arial"
            context.textAlign = "center"
            context.fillStyle = "black"
            context.fillText(text, 640, 75)

            //Set leaf to be root
            setLeaf(tree.root)
        }

    }, [interacitve])

    //Handles when the user sumbit their answers
    const handleSubmit = (event) => {
        event.preventDefault()
        setInteractive(true)
    }

    //Hnadles when the user clicks on canvas
    const handleTreeClick = (event) => {
        //If interactive is truee
        if (interacitve === true) {
            //Get the location of the click
            let xPos = event.clientX
            let yPos = event.clientY

            //Store info into state
            setCanvasInfo(prev => { return { ...prev, xPos: xPos, yPos: yPos } })
        }
    }

    //Create effect for canvas clicks
    useEffect(() => {
        if (interacitve === true) {
            //Get canvas
            let canvas = canvasRef.current

            //Get rect
            let box = canvas.getBoundingClientRect()

            //Caculate xPos and yPos
            let xPos = canvasInfo.xPos - box.left
            let yPos = canvasInfo.yPos - box.top

            //Check where the child is
            let nextLeaf = null

            //Check what the condition is
            let condition = null

            //If click is in left box
            if (xPos >= leaf.leftChild.xCor && xPos <= (leaf.leftChild.xCor + 80) && yPos >= leaf.leftChild.yCor && yPos <= (leaf.leftChild.yCor + 40)) {
                //Set nextLeaf to be leftChild
                nextLeaf = leaf.leftChild

                //Set condtion to be left
                condition = "left"
            }
            //Otherwise if click is in right box
            else if (xPos >= leaf.rightChild.xCor && xPos <= (leaf.rightChild.xCor + 80) && yPos >= leaf.rightChild.yCor && yPos <= (leaf.rightChild.yCor + 40)) {
                //Set nextLeaft to be rightChild
                nextLeaf = leaf.rightChild

                //Set condition to be right
                condition = "right"
            }

            //If nextLeaf is not null
            if (nextLeaf != null) {
                //Get the feature name
                let index = parseInt(leaf.name.substring(1))

                //Get the value from inputs
                let value = inputs[index]

                //Check the result of condition
                let result = null

                //If coindtion is left
                if (condition === "left") {
                    result = (value <= leaf.value)
                }
                //Otherwise
                else {
                    result = (value > leaf.value)
                }

                //If result is false
                if (result === false) {
                    //Make the tree green
                    const canvas = canvasRef.current
                    const context = canvas.getContext("2d")
                    context.fillStyle = "red"

                    //Fill the root
                    context.fillRect(nextLeaf.xCor, nextLeaf.yCor, 80, 40)

                    //Get the text from the left
                    const text = nextLeaf.info

                    //Fill text
                    context.font = "12px Arial"
                    context.textAlign = "center"
                    context.fillStyle = "black"
                    context.fillText(text, nextLeaf.xCor + 40, nextLeaf.yCor + 25)
                }
                //Otherwise
                else {
                    //Make the tree green
                    const canvas = canvasRef.current
                    const context = canvas.getContext("2d")
                    context.fillStyle = "green"

                    //Fill the node
                    context.fillRect(nextLeaf.xCor, nextLeaf.yCor, 80, 40)

                    //Draw arrow to next node
                    context.lineWidth = 3
                    drawArrow(context, leaf.xCor+40, leaf.yCor+40, nextLeaf.xCor+40, nextLeaf.yCor, "blue")
                    context.lineWidth = 1

                    //Get the text from the leaf
                    const text = nextLeaf.info

                    //Fill text
                    context.font = "12px Arial"
                    context.textAlign = "center"
                    context.fillStyle = "black"
                    context.fillText(text, nextLeaf.xCor + 40, nextLeaf.yCor + 25)

                    //If nextLeaf has type class
                    if (nextLeaf.type === "Class") {
                        //We are done, make the tree not interactive anymore
                        setInteractive(false)
                    }
                    //Otherwise
                    else {
                        //Set leaf to be next leaf
                        setLeaf(nextLeaf)
                    }
                }
            }

        }

    }, [canvasInfo])

    //Return canvas tag
    return (<div>
        <canvas onClick={handleTreeClick} ref={canvasRef}></canvas>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: "10px" }}>
            {tagInputs}
            <input type="button" onClick={handleSubmit} value="Submit" />
        </div>
    </div>)
}


//Create a tree node
class TreeNode {
    //Constructor
    constructor() {
        //Parameters
        //Left Child
        this.leftChild = null

        //Right child
        this.rightChild = null

        //Store type of tree
        this.type = null

        //Depth of the tree
        this.depth = 0

        //The longest path for the tree node
        this.longestPath = 0

        //The info that will be displayed on the node
        this.info = null

        //Set parent of tree
        this.parent = null

    }

    //Set type
    setType(type) {
        //Set this type to type
        this.type = type
    }

    //Set depth
    setDepth(depth) {
        //Set depth of node
        this.depth = depth
    }

    //Insert to the tree
    insertChild(child) {
        //If leftChild is null
        if (this.leftChild == null) {
            //Set leftChild to be child
            this.leftChild = child

            //Set parent of leftChild
            this.leftChild.parent = this
        }
        //Otherwise
        else {
            //Set rightChild to be child
            this.rightChild = child

            //Set parent of right child to be null
            this.rightChild.parent = this
        }
    }

    //Get the latest child
    getLatestChild() {
        //If rightChild is null
        if (this.rightChild == null) {
            //Return left child 
            return this.leftChild
        }
        //Otherwise, if not
        return this.rightChild
    }

    //Get left child
    getLeftChiild() {
        //Return left child
        return this.leftChild
    }

    //Get right child
    getRightChild() {
        //Return right child
        return this.rightChild
    }

    //Get parent
    getParent() {
        //Return the parent
        return this.parent
    }

    //Caculate the longest path 
    caculateLongestPath() {
        //If node has no children
        if (this.leftChild == null) {
            //Set longestPath to be 0
            this.longestPath = 0
        }
        //Otherwise, if node has only 1 child
        else if (this.leftChild != null && this.rightChild == null) {
            //Caculate longestPath of left child
            this.leftChild.caculateLongestPath()

            //Set longestPath to be left child longest path + 1
            this.longestPath = this.leftChild.longestPath + 1
        }
        //Otherwise, if node has 2 children
        else {
            //Caculate the longest path of both children
            this.leftChild.caculateLongestPath()
            this.rightChild.caculateLongestPath()

            //If leftChild longest path is greater than right child longest path
            if (this.leftChild.longestPath >= this.rightChild.longestPath) {
                //Set this longestPath to be leftChild longestPath + 1
                this.longestPath = this.leftChild.longestPath + 1
            }
            //Otherwise
            else {
                //Set longestPath to be right child longest path + 1
                this.longestPath = this.rightChild.longestPath + 1
            }
        }
    }
}

//Decision Node
class DecisionNode extends TreeNode {
    //Constructor
    constructor(name, value, info, depth) {
        //Constructo as Tree Node
        super()

        //Set name to be name
        this.name = name

        //Set class to be value
        this.value = value

        //Set type as decision
        this.type = "Decision"

        //Set depth 
        this.depth = depth

        //Set parent
        this.parent = null

        //Set xCordinate of the tree
        this.xCor = 0

        //Set yCordinate of the tree
        this.yCor = 0

        //Set info 
        this.info = info
    }


}
//Class Nodes for class 
class ClassNode extends TreeNode {
    constructor(group, info, depth) {
        //Construct from Tree Node
        super()

        //Set class to be group
        this.class = group

        //Set type as class
        this.type = "Class"

        //Set depth as depth
        this.depth = depth

        //Set parent
        this.parent = null

        //Set info 
        this.info = info
    }
}

//Create a Class of the Tree
class Tree {
    //Constructs an empty tree
    constructor(treeText) {
        //Root of the tree
        this.root = null

        //The true depth of the tree
        this.treeDepth = 0

        //Create the tree
        this.createTree(treeText)

        //Get the longest path of the root
        this.root.caculateLongestPath()
    }

    //Creates the tree
    createTree(treeText) {
        //Firstly, divide up string into array of lines
        const lines = treeText.split("\n")

        //Get first line
        let firstLine = lines[0]

        //Next, we want the name of the root
        //Get the last index of |-- 
        let startIndex = firstLine.indexOf("|--- ") + 5

        //Get endIndex 
        let endIndex = firstLine.indexOf(" <=")

        //Get the info of the root
        let info = firstLine.substring(startIndex)

        //Remove feature_ from info
        info = info.replace("feature_", "x")

        //Get substring 
        let name = firstLine.substring(startIndex, endIndex)

        //Replace feature_ with name
        name = name.replace("feature_", "x")

        //Next, get startIndex of value
        startIndex = endIndex + 4

        //Get value
        let value = firstLine.substring(startIndex)

        //Convert value to float
        value = parseFloat(value)

        //Create deciion tree node
        this.root = new DecisionNode(name, value, info, 0)

        //Next, get currentNode
        let curNode = this.root

        //Create depth and set it as 0
        let depth = 0

        //Loop until we reach the end of the array
        for (let i = 1; i < lines.length - 1; i++) {
            //Create node to store the node create from the line
            let newNode = null

            //Get line 
            let line = lines[i]

            //Get index of |--- 
            let index = line.indexOf("|--- ")

            //Get info
            let info = line.substring((index + 5))

            //Divide index by 4 to get the curDepth
            let lineDepth = index / 4

            //If lineDepth is greater than treeDepth
            if (this.treeDepth < lineDepth) {
                //Set treeDepth to be lineDepth
                this.treeDepth = lineDepth
            }

            //Next, check if line contains <= or >
            //If the line does not contain <= or >
            if (line.indexOf("<=") === -1 && line.indexOf(">") === -1) {
                //Get the index of : and add 2
                let classIndex = line.indexOf(":") + 2

                //Get the class
                let classNum = parseInt(line.substring(classIndex))

                //Create a new class node
                newNode = new ClassNode(classNum, info, lineDepth)
            }
            //Otherwise, if line is not -1
            else if (line.indexOf("<=") !== -1) {
                //Replace feature_ with x
                info = info.replace("feature_", "x")

                //Get the index of the start of the feature name
                let startIndex = index + 5

                //Get the endIndex of the feature name
                let endIndex = line.indexOf(" <=")

                //Get the name
                let name = line.substring(startIndex, endIndex)

                //Repalce feature_x with name
                name = name.replace("feature_", "x")

                //Get the startIndex of the value
                startIndex = endIndex + 4

                //Get the value
                let value = parseFloat(line.substring(startIndex))

                //Create a new decision node
                newNode = new DecisionNode(name, value, info, lineDepth)
            }

            //Next, check if lineDepth is greater that depth
            //If it is
            if (lineDepth > depth) {
                //Have curNode insert newNode
                curNode.insertChild(newNode)

                //Set curNode as latestChild
                curNode = curNode.getLatestChild()

                //Increase depth by 1
                depth = depth + 1
            }
            //Otherwise if lineDepth is less than depth
            else if (depth > lineDepth) {
                //Run until depth is lineDepth
                while (depth !== lineDepth) {
                    //Decrease depth
                    depth = depth - 1;

                    //Set curNode to be its parent
                    curNode = curNode.getParent()
                }
            }
        }

        //Return this
        return this
    }
}

//Export tree default
export { Tree, StaticTree, StructureTree, PortionTree, drawArrow }
export default DecisionTree




