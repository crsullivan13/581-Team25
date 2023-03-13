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
*/

//Import react
import React, {useRef, useEffect, useState} from "react";

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
export {NeuralNetwork}