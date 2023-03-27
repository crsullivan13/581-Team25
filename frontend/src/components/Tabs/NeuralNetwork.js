/*
Name: NeuralNetwork.js
Description: Creates Neural Networks
Programmers: Amith Panuganti
Creation Date: 3/3/23
Preconditions: Used for mlp demo
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions:
    Date: 3/9/23
    Author: Amith Panuganti 
    Desription: Create non interactive nn
    
    Date: 3/12/23
    Author: Amith Panuganti
    Description: Made an interactive neural network and add it to MLPDemo.js

    Date: 3/22/23
    Auhtor: Amith Panuganti
    Description: Create TypeNN to showcase the different types of neural networks
    and BoxesNN to point out the layers in the Neural Network
*/

//Import react
import React, {useRef, useEffect, useState} from "react";

//Draws a neutral network for show the clear difference between neural network
function TypeNN(props)
{
    //Draws both the title for the neural network 
    //and points to the output 
    //We the context than will be used on draw on the neural netwrok
    //We also need the location of the neurons
    const drawInfo = (context, neuronsLoc) =>
    {
        //Write the title of the neural network
        //In the middle of it
        //Get the middle position of the title 
        //by dividing the width of the neural netowrk by 2
        let width = props.left + (2 * props.radius) * (props.nodes.length+2) + props.xDist * (props.nodes.length - 1)
        let titleXPos = width / 2

        //Write the type of neural network based on props.title
        //Write name on top of box
        context.font = "15px Arial"
        context.textAlign = "center"
        context.fillStyle = "black"
        context.fillText(props.title, titleXPos, 15)

        //Next, loop through eac neuron in the last layer
        for(let i = 0; i < props.nodes[props.nodes.length-1]; i++)
        {
            //Next, we will draw an arrow that will point to the output node
            //Starting by getting the starting position of the arrow
            let startXPos = neuronsLoc[props.nodes.length-1][i].xPos + props.radius
            let startYPos = neuronsLoc[props.nodes.length-1][i].yPos
            
            //Get the ending xPos
            let endXPos = startXPos + 30 

            //Get the angle of the arrow
            let angle = Math.atan2(0, startXPos-endXPos)

            //Draw line from (endXPos, startYPos) to (startXPos, startYPos)
            context.moveTo(endXPos, startYPos)
            context.lineTo(startXPos, startYPos)

            //Create the triangle portion of the arrow
            context.lineTo(startXPos - 10 * Math.cos(angle - Math.PI / 6), startYPos - 10 * Math.sin(angle - Math.PI / 6));
            context.moveTo(startXPos, startYPos);
            context.lineTo(startXPos - 10 * Math.cos(angle + Math.PI / 6), startYPos - 10 * Math.sin(angle + Math.PI / 6));

            //Stroke to show the line
            context.stroke()

            //Add text telling what value is can hold based on props.whatValue
            context.font = "12px Arial"
            context.textAlign = "left"
            context.fillStyle = "black"
            context.fillText(props.whatValue, endXPos + 10, startYPos)
        }
        
    }

    //Return StaticNN with drawInfo function
    return(
        <StaticNN
        {...props} drawAdditional={drawInfo}
        >
        </StaticNN>
    )
}
//Component that draws boxes for neural network
function BoxesNN(props)
{
    //Create additional function that draw boxes to label 
    //each layer on the Neural Network
    const drawBoxes = (context, neuronsLoc) =>
    {
        //Create a next path
        context.beginPath()

        //Get the starting xPos
        let startXPos = props.xDist - 10

        //Go through each node in nodes
        for(let i = 0; i < props.nodes.length; i++)
        {
            //Create around the nodes in the layer 
            //Create a next path
            context.beginPath()
            context.rect(startXPos, 25, (props.radius + 10) * 2, props.height-50)
            context.stroke()

            //Set name to be written on top of box
            let name = ""

            //If i is 0, write Input Layer on top of text
            if(i === 0)
            {
                //Set name ot be input layer
                name = "Input Layer"
            }
            //else if i is less than props.length-1, 
            else if(i < props.nodes.length-1)
            {
                //Set name ot be Hidden Layer i
                name = "Hidden Layer " + i.toString()
            }
            //Otherwise,
            else
            {
                //Set name to be Output Layer
                name = "Output Layer" 
            }

            //Write name on top of box
            context.font = "12px Arial"
            context.textAlign = "center"
            context.fillStyle = "black"
            context.fillText(name, startXPos+10+props.radius , 15)

            //Update StartxPos
            startXPos = startXPos + 2 * props.radius + props.xDist
            
        }
    }

    //Return nonthing
    return(
        <StaticNN
        {...props} drawAdditional={drawBoxes}
        >
        </StaticNN>
    )
}
//A static version of the neural network 
function StaticNN(props)
{
    //Create canvas ref
    const canvasRef = useRef(null)

    //Draw the arrow
    //Inputs: ctx, (fromX, fromY) starting position, (toX, oY) end position
    const drawArrow = (ctx, fromX, fromY, toX, toY) =>{
        //Draw line from (fromX, fromY) to (toX, toY)
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)
        ctx.stroke()
    }

    //Draws a circle
    const drawCircle = (ctx, centerX, centerY) => {
        //Save the context
        ctx.save()

        //Begin a new path
        ctx.beginPath()
        
        //Create cirlce
        ctx.arc(centerX, centerY, props.radius, 0, 2 * Math.PI)
    }

    //Runs child function
    const runChildFunc = (ctx, neuronsLoc) => {
        //Run child function
        props.drawAdditional(ctx, neuronsLoc, props)
    }

    //Use effect
    useEffect(() =>{
        //Get reference 
        const canvas = canvasRef.current

        //Get the context
        const context = canvas.getContext("2d")

        //Create a new list of locations
        let neuronsLoc = []

        //Get the middle of canvas.
        const middle = context.canvas.height / 2

        //Go through each value in nodes
        for(let i = 0; i < props.nodes.length; i++)
        {
            //Create a new list of neurons of that layer
            let neuronsLayerLoc = []

            //Set xPos to be 
            let xPos = props.left + (2 * props.radius + props.xDist) * i + props.radius

            //Finding the starting yPos
            let startYPos = 0

            //If i props.nodes[i] has a remainder of 1
            if(props.nodes[i] % 2 === 1)
            {
                //Set start startYPos 
                startYPos = middle + (2 * props.radius + props.yDist) * (Math.floor(props.nodes[i] / 2))
            }
            //Otherwise
            else
            {
                //Set start startYPos 
                startYPos = middle + ((props.yDist/2) + props.radius + ((props.nodes[i]/2 - 1) * (2* props.radius+props.yDist)))
            }
            

            //Loop for the number of nodes in a layer
            for(let j = 0; j < props.nodes[i]; j++)
            {
                //Draw a circle at xPos and startYPost
                context.beginPath()
                context.arc(xPos, startYPos, props.radius, 0, 2 * Math.PI)
                context.stroke()

                //Create a list that contians the locations of x and y
                const neuronLoc = {
                    xPos : xPos,
                    yPos : startYPos
                }

                //Fill the neuron
                drawCircle(context, xPos, startYPos)

                //Get name to fill
                let name = props.patterns[i][j]

                //Add name above neuron to show user what the neuron represents
                context.font = "12px Arial"
                context.textAlign = "center"
                context.fillStyle = "black"
                context.fillText(name, xPos, startYPos - props.radius - 5)

                //Push neuronLoc to list of neurons locations for the layer
                neuronsLayerLoc.push(neuronLoc)

                //Change startYPos
                startYPos = startYPos - (2 * props.radius) - props.yDist
            }

            //Push neuronsLayerLoc to neuronsLoc
            neuronsLoc.push(neuronsLayerLoc)

            //If i is greater than 1, draw lines betwee neuron layers
            if(i > 0)
            {
                //For each neuron in layer i -1
                for(let j = 0; j < neuronsLoc[i-1].length; j++)
                {
                    //Get the current starting neuron
                    let prevNeuron = neuronsLoc[i-1][j]

                    //For each neuron in layer i
                    for(let k = 0; k < neuronsLoc[i].length; k++)
                    {
                        //Get neuron in next layer
                        let nextNeuron = neuronsLoc[i][k]    
                        
                        //Draw arrow
                        drawArrow(context, prevNeuron.xPos + props.radius, prevNeuron.yPos, nextNeuron.xPos - props.radius, nextNeuron.yPos)
                    }
                }
            }
        }

        //Run child function
        runChildFunc(context, neuronsLoc)
        
    }, [props])

    //Return canvas
    return(
        <canvas height={props.height} width={props.width} ref={canvasRef} > </canvas>
    )
}

//Regression Neural Network
function NN(props)
{
    //Create a state that will contain the locations of each neuron
    let [neuronsLoc, setNeuronsLoc] = useState(null)

    //Create a state for the neural network
    let [neuronNetwork, setNeuronNetwork] = useState(null)

    //Create a state to store information about canvas
    let [canvasInfo, setCanvasInfo] = useState(null)

    //Create canvas ref
    const canvasRef = useRef(null)

    //Draw the arrow
    //Inputs: ctx, (fromX, fromY) starting position, (toX, oY) end position
    const drawArrow = (ctx, fromX, fromY, toX, toY) =>{
        //Get the x distance at fromX to toX
        let dx = toX - fromX

        //Get the y distance at fromY to toY
        let dy = toY - fromY

        //Get the angle of the arrow
        let angle = Math.atan2(dy, dx)

        //Draw line from (fromX, fromY) to (toX, toY)
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)

        ctx.stroke()
    }

    //Fill a circle based on the value of the neural network
    const fillCircle = (ctx, centerX, centerY, amount) => {
        //Save the context
        ctx.save()

        //Begin a new path
        ctx.beginPath()
        
        //Create cirlce
        ctx.arc(centerX, centerY, props.radius, 0, 2 * Math.PI)

        //Make clipping of path
        ctx.clip()

        //Clear the cirlce
        ctx.clearRect(centerX - props.radius, centerY + props.radius, props.radius * 2, -1 * 2 * props.radius)
        
        //Set fill style
        ctx.fillStyle = 'black'

        //Caculate amount to fill the cirlce
        let amountToFill = -1 * (2 * props.radius) * amount

        //Fill the circle
        ctx.fillRect(centerX - props.radius, centerY + props.radius, props.radius * 2, amountToFill)

        //Restore context
        ctx.restore()

        //Get the bounding of the circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, props.radius, 0, 2 * Math.PI)
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }

    //Use effect
    useEffect(() =>{
        //Create neural network
        let neuralNetowrk = new NeuralNetwork(props.nodes, props.weights, props.bias)

        //Save neural netowrk
        //Create a new list of locations
        let neuronsLoc = []

        //Get reference 
        const canvas = canvasRef.current

        //Get the context
        const context = canvas.getContext("2d")

        //Get the middle of canvas.
        const middle = context.canvas.height / 2

        //Go through each value in nodes
        for(let i = 0; i < props.nodes.length; i++)
        {
            //Create a new list of neurons of that layer
            let neuronsLayerLoc = []

            //Set xPos to be 
            let xPos = props.left + (2 * props.radius + props.xDist) * i + props.radius

            //Finding the starting yPos
            let startYPos = 0

            //If i props.nodes[i] has a remainder of 1
            if(props.nodes[i] % 2 === 1)
            {
                //Set start startYPos 
                startYPos = middle + (2 * props.radius + props.yDist) * (Math.floor(props.nodes[i] / 2))
            }
            //Otherwise
            else
            {
                //Set start startYPos 
                startYPos = middle + ((props.yDist/2) + props.radius + ((props.nodes[i]/2 - 1) * (2* props.radius+props.yDist)))
            }
            

            //Loop for the number of nodes in a layer
            for(let j = 0; j < props.nodes[i]; j++)
            {
                //Draw a circle at xPos and startYPost
                context.beginPath()
                context.arc(xPos, startYPos, props.radius, 0, 2 * Math.PI)
                context.stroke()

                //Create a list that contians the locations of x and y
                const neuronLoc = {
                    xPos : xPos,
                    yPos : startYPos
                }

                //Fill the neuron
                fillCircle(context, xPos, startYPos, neuralNetowrk.neurons[i][j])

                //Get name to fill
                let name = props.patterns[i][j]

                //Add name above neuron to show user what the neuron represents
                context.font = "12px Arial"
                context.textAlign = "center"
                context.fillStyle = "black"
                context.fillText(name, xPos, startYPos - props.radius - 5)

                //Push neuronLoc to list of neurons locations for the layer
                neuronsLayerLoc.push(neuronLoc)

                //Change startYPos
                startYPos = startYPos - (2 * props.radius) - props.yDist
            }

            //Push neuronsLayerLoc to neuronsLoc
            neuronsLoc.push(neuronsLayerLoc)

            //If i is greater than 1, draw lines betwee neuron layers
            if(i > 0)
            {
                //For each neuron in layer i -1
                for(let j = 0; j < neuronsLoc[i-1].length; j++)
                {
                    //Get the current starting neuron
                    let prevNeuron = neuronsLoc[i-1][j]

                    //For each neuron in layer i
                    for(let k = 0; k < neuronsLoc[i].length; k++)
                    {
                        //Get neuron in next layer
                        let nextNeuron = neuronsLoc[i][k]    
                        
                        //Draw arrow
                        drawArrow(context, prevNeuron.xPos + props.radius, prevNeuron.yPos, nextNeuron.xPos - props.radius, nextNeuron.yPos)
                    }
                }
            }
        }

        //Set neuronsLoc the state
        setNeuronsLoc(neuronsLoc)

        //Set neuralNetwork
        setNeuronNetwork(neuralNetowrk)

        //Set canvasInfo
        setCanvasInfo({xPos:0, yPos:0})

    }, [props])

    //Handle click on neural network
    const handleClick = (event) => {
        //Get location of the click
        let xPos = event.clientX
        let yPos = event.clientY

        //Store info the state
        setCanvasInfo(prev => {return {...prev, xPos:xPos, yPos:yPos}})
    }

    //Handle change in canvasInfo
    useEffect(() => {
        //If neuronsLoc is null
        if(neuronsLoc == null)
        {
            //return
            return
        }

         //Get canvas 
         let canvas = canvasRef.current

         //Get context
         const context = canvas.getContext("2d")
 
         //Get rect
         let box = canvas.getBoundingClientRect()
 
         //Caculate xPos and yPos
         let xPos = canvasInfo.xPos - box.left
         let yPos = canvasInfo.yPos - box.top

         //Go through each neuron in the 2nd layer
        for(let i = 0; i < neuronsLoc[1].length; i++)
        {
            
            //Caculate the distance between the center of the neuron and the clikc
            let xDist = xPos - neuronsLoc[1][i].xPos
            let yDist = yPos - neuronsLoc[1][i].yPos
            let distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
    
            //If distance is less than the radius
            if(distance <= props.radius)
            {
                //Get value of neuron network in 1st layer
                let value = neuronNetwork.neurons[1][i]

                //If value is 1, then let it be 0
                if(value === 1)
                {
                    value = 0
                    neuronNetwork.neurons[1][i] = 0
                }
                //Otherwise, if value is 0, then set it to be 1
                else
                {
                    value = 1
                    neuronNetwork.neurons[1][i] = 1
                }

                //Fill the circle clicked
                fillCircle(context, neuronsLoc[1][i].xPos, neuronsLoc[1][i].yPos, value)

                //Update neuronNetwork
                neuronNetwork.updateNeuralNetwork()

                //Go through each neuron in 2nd to nth layer
                for(let i = 2; i < neuronsLoc.length; i++)
                {
                    for(let j = 0; j < neuronsLoc[i].length; j++)
                    {
                        //Fil; the circle clicked
                        fillCircle(context, neuronsLoc[i][j].xPos, neuronsLoc[i][j].yPos, neuronNetwork.neurons[i][j])
                    }
                }
                break
            }
        }
    }, [canvasInfo])

    //Return canvas
    return(
        <canvas onClick={handleClick} height={props.height} width={props.width} ref={canvasRef} > </canvas>
    )
}

//Create a class for the neural network
class NeuralNetwork
{
    //Constrcutor
    constructor(sizes, weights, bias)
    {
        //Create a list of neuron values
        this.neurons = []

        //Go thorugh each value in sizes
        for(let i = 0; i < sizes.length; i++)
        {
            //Create a list of size
            let layer = []

            //Add 0 to layer
            for(let j = 0; j < sizes[i]; j++)
            {
                //If i is 0
                if(i === 0)
                {
                    //Push 1
                    layer.push(1)
                }
                //Otherwise
                else
                {
                    //Push 0 
                    layer.push(0)
                }
            }

            //Push layer to neurons
            this.neurons.push(layer)
        }

        //Set weights
        this.weights = weights
        
        //Set bias
        this.bias = bias

        //Update neural network
        this.updateNeuralNetwork()
    }

    //Update neural network
    updateNeuralNetwork()
    {
        //Go thorugh each layer starting from third layer
        for(let i = 2; i < this.neurons.length; i++)
        {
            //Get the set of weights for the layer
            let layerWeights = this.weights[i-2]

            //Get biases for the layer
            let layerBias = this.bias[i-2]

            //Get the neurons from the pervious layer
            let prevNeurons = this.neurons[i-1]

            //Go through each neuron in the current layer
            for(let j = 0; j < this.neurons[i].length; j++)
            {
                //Get the weights of the neuron
                let neuronWeights = layerWeights[j]

                //Create a starting value
                let value = 0

                //Go through each weight in neuronWeights
                for(let k = 0; k < prevNeurons.length; k++)
                {
                    //Add prevNeurons[k] * neuronWeights[k]
                    value = value + prevNeurons[k] * neuronWeights[k]
                }

                //Add bias
                value = value + layerBias[j]

                //Set value at neuron
                this.neurons[i][j] = value
            }
        }
    }
}



//Export NN
export default NN
export {NeuralNetwork, StaticNN, BoxesNN, TypeNN}