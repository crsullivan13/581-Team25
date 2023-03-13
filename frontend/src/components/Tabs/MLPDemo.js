/*
Name: MLPDemo.js
Description: Creates demo for MLP
Programmers: Amith Panuganti
Creation Date: 2/23/23
Preconditions: Used for mlp demo
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions:
    Date: 2/23/23
    Author: Amith Panuganti
    Description: Added Part 1 to the demo

    Date: 2/24/23
    Author: Amith Panuganti 
    Description: Added Part 2 and 3 to the demo

    Date: 3/1/23
    Author: Amith Panuganti
    Description: Added Figures and Model For Part 1

    DatE: 3/3/23
    Author: Amith Panuganti
    Description: Add images

    Date: 3/12/23
    Author: Amith Panuganti
    Description: Added An Interactive Neural Network to Part 2
*/

//Import react
import React from "react";
import { useState } from 'react';
import {Button , Accordion} from 'react-bootstrap';
import GeneralDemoPart from "./GeneralDemo";
import logo from './Dog.png'
import cat from './Cat.jpeg'
import NN from "./NeuralNetwork"

//Create Component for MLPDemo
function MLPDemo(props)
{

    //Create our datasets for MLP Regression
    //The dataset will be based on x^2 + 2x + 1
    let Regression_X = []
    let Regression_Y = []

    //Create dataset for MLP Classifcation
    //Class 0 should be even while Class 1 should be odd
    let Classification_X = []
    let Classifcation_Y = []

    //Create a dataset for Linear Regression
    //The dataset will be based on y = 2x + 2
    let LinearRegression_X = []
    let LinearRegression_Y = []

    //Create a dataset for logistic regression
    //Class 0 should be less than a certain number while Class 1 should be greater than a certain nubmer
    let LogisticRegression_X = []
    let LogisticRegression_Y = []

    //Loop 100
    for(let i = 0; i < 50; i++)
    {
        //Get a random number between -5 to 5
        let reg_value = Math.random() * 5
        reg_value = reg_value * (Math.round(Math.random()) ? 1 : -1)

        //Caculate y using reg value and x^2 + 2x + 1
        let reg_y = Math.pow(reg_value, 2) + 2 * reg_value + 1

        //Caculate linear regression value using reg value
        let lin_reg_y = 2 * reg_value + 2

        //Get a random number between 50 and 200
        let class_value = Math.floor((Math.random() * 150)) + 50

        //See class y
        let class_y = 0

        //If class_value is odd
        if(class_value % 2 === 1)
        {
            //Set class_y to be 1
            class_y = 1
        }

        //Set log class y to be 0
        let log_class_y = 0

        //If class_value is greather than 125
        if(class_value > 115)
        {
            //Set class_value to be 0
            log_class_y = 1
        }

        //Add reg_value, reg_y, class_value, class_y, log_class_y, and line_reg_y to their lists
        Regression_X.push([reg_value])
        Regression_Y.push(reg_y)
        Classification_X.push([class_value])
        Classifcation_Y.push(class_y)

        //If i is less than 25, add reg_value and lin_reg_y to dataset
        if(i < 25)
        {
            LinearRegression_X.push([reg_value])
            LinearRegression_Y.push(lin_reg_y)
        }
        
        LogisticRegression_X.push([class_value])
        LogisticRegression_Y.push([log_class_y])
    }

    
    //Create an Accordian
    return(
        <>
        <h1>Multilayer Perceptron Demo</h1>
        <Accordion flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Part 1</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart1
                    LinX={LinearRegression_X}
                    LinY={LinearRegression_Y}
                    LogX={LogisticRegression_X}
                    LogY={LogisticRegression_Y}
                    MLPRegX={Regression_X}
                    MLPRegY={Regression_Y}
                    MLPClassX={Classification_X}
                    MLPClassY={Classifcation_Y}
                    >
                    </MLPDemoPart1>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Part 2</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart2></MLPDemoPart2>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Part 3</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart3></MLPDemoPart3>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Part 4</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart4Front>
                    </MLPDemoPart4Front>
                    <MLPDemoPart4Back>
                    </MLPDemoPart4Back>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
                <Accordion.Header>Part 5</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart5>
                    </MLPDemoPart5>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </>
    );
}

//Create component for MLPDemoPart1
function MLPDemoPart1(props)
{
    //Create MLPDemoPart1Front
    let frontTag = <MLPDemoPart1Front
    X={props.MLPRegX}
    Y={props.MLPRegY}
    LinX={props.LinX}
    LinY={props.LinY}
    LogX={props.LogX}
    LogY={props.LogY}
    >
    </MLPDemoPart1Front>

    //Create MLPDemoPart1Middle
    let middleTag = <MLPDemoPart1Middle
    X={props.MLPClassX}
    Y={props.MLPClassY}
    ></MLPDemoPart1Middle>

    //Create back general demo part 
    let backTag = <GeneralDemoPart
    front={middleTag}
    X={props.MLPClassX}
    y={props.MLPClassY}
    model="MLP Demo Part 1 Middle"
    back={<MLPDemoPart1Back></MLPDemoPart1Back>}
    >
    </GeneralDemoPart>

    return(
        <GeneralDemoPart
        front={frontTag}
        X={props.MLPRegX}
        y={props.MLPRegY}
        model="MLP Demo Part 1 Front"
        back={backTag}
        ></GeneralDemoPart>
    )
}

//Create front component for Part 1 of MLP Demo
function MLPDemoPart1Front(props)
{
    //Create list of tag for part
    let tags = []

    //Set url for training 
    let url = "https://team-25-362714.uc.r.appspot.com/MLPDemoFigures"

    //Creates graph for Regression Dataset
    //Create dictionary to be send 
    let request = {
        "X":props.X,
        "y":props.Y,
        "LinX":props.LinX,
        "LinY":props.LinY,
        "LogX":props.LogX,
        "LogY":props.LogY,
        "type":"MLP Demo Part 1 Front"
    }

    //Make request json string
    let jsonString = JSON.stringify(request)

    //Create object that will handling sending and recieving information 
    let xhr = new XMLHttpRequest()

    //Open response
    xhr.open("POST", url, false)

    //Create on load function
    xhr.onload = function()
    {
        //If status of xhr is 200
        if(xhr.status === 200)
        {
            //Get repsonse from xhr
            let jsonResponse = JSON.parse(xhr.responseText)

            //Get image from jsonResponse
            const image = "data:image/png;base64,"+jsonResponse.figure;

            //Create image tag
            let imageTag = <img alt="Figure" key="Figure" src={image}></img>

            // Add tag to tags
            tags.push(imageTag)

            //Create linear image tag
            const linear_image = "data:image/png;base64,"+jsonResponse.linear_figure;
            let linearImageTag = <img alt="Figure" key="Linear_Figure" src={linear_image}></img>

            //Create log image tag
            const log_image = "data:image/png;base64,"+jsonResponse.log_figure;
            let logImageTag =  <img alt="Figure" key="Log_Figure" src={log_image}></img>

            //Push both tags to tags
            tags.push(linearImageTag)
            tags.push(logImageTag)
        }
        //Otherwise
        else
        {
            //Alert the user
            let error = "Error: " + xhr.responseText
            alert(error)
        }
    }

    //Send Request
    //Send string
    xhr.send(jsonString)

    return(
    <>
    <p>
        If have looked at the previous demos, you have a good understanding of very foundational models. 
        Linear regression and logistic regression are very basic models as they often rely on only 
        one equation to represent the data. However, our model can only understand so much of the data 
        before it starts breaking down. The more complicated our data is, the harder our model struggle to understand. 
    </p>

    <p>
        But, what I mean when the data gets complicated. Well, both linear regression and logistic regression
        only work when the dataset can be easily represented by both models. A good data for linear regression 
        would if the points in the data form a straight line. 
    </p>

    {tags[1]}
    <p>
        Likewise, a good dataset for logistic regression would be if each class are represented by data points that 
        form seperate groups in different parts of the dataset. 
    </p>
    {tags[2]}
    <p>
        However, the problem comes when the dataset ignores both linear and logistic regression assumptions on the dataset.
        For linear regression, this is when our dataset doesn't follow a straight line. For example, lets say we are given a dataset
        that looks like the following.
    </p>

    {tags[0]}
    <p>
        You can see that the path of the data is not a linear line. So, if we try using linear regression it. We get the follwoing
    </p>
    </>

    
    )
}

//Create middle component for Part 1 of MLP Demo
function MLPDemoPart1Middle(props)
{

    //Create tag
    let tag = null

    //Set url for training 
    let url = "https://team-25-362714.uc.r.appspot.com/MLPDemoFigures"

    //Create dictionary to send to backend
    let request = {
        "X":props.X,
        "y":props.Y,
        "type":"MLP Demo Part 1 Middle"
    }

    //Make request json string
    let jsonString = JSON.stringify(request)

    //Create object that will handling sending and recieving information 
    let xhr = new XMLHttpRequest()

    //Open response
    xhr.open("POST", url, false)

    //Create on load function
    xhr.onload = function()
    {
        //If status of xhr is 200
        if(xhr.status === 200)
        {
            //Get repsonse from xhr
            let jsonResponse = JSON.parse(xhr.responseText)

            //Get image from jsonResponse
            const image = "data:image/png;base64,"+jsonResponse.figure;

            //Create image tag
            let imageTag = <img alt="Figure" key="Figure" src={image}></img>

            //Set tag to be imageTag
            tag = imageTag
        }
        //Otherwise
        else
        {
            //Alert the user
            let error = "Error: " + xhr.responseText
            alert(error)
        }
    }

    //Send Request
    //Send string
    xhr.send(jsonString)

    return(
        <>
        <p>
         You can see that the our model is a good fit for the data set. The path of our data can match the linear line
        </p>
        <p>
            As for classification, logistic regression is not good if there are overlapping between different classes.
            For example, lets say that we want to know if a person is tall or short based on their weight. So, we let tall and short 
            people be our classes and weight be used to determine the class. In a normal scenario, we would see that our classes clustered
            around a series of weights. However, the problem comes when these classes overlap. In this case, a person is short if
        </p>
        {tag}
        <p>
            Now, if we try to use logistic regression on this dataset, you can see that our model can fit the dataset
        </p>
        </>

    )
    
}

//Create back component for Part 1 of MLP Demo
function MLPDemoPart1Back()
{
    return(
        <>
        <p>
        As you can see, most of the graph created by our model can't match with most of our data points on the graph.
        As a result, logistic regression is not a good model for our dataset. 
        </p>

        <p>
            In the end, our models can't understand these complicated datasets. So, what happens when our datasets 
            our too complicated for our model to understand. Simple, we just make our models more complicated.
        </p>
        </>
    )
}

//Create front component for Part 2 of MLP Demo
function MLPDemoPart2()
{
    return(
        <>
        <p>
            So what exactly is multilayer perceptron? Essentially, it is a model that tries to break down a complicated problem into much more small problems. 
            It first try to find any patterns in the dataset, and then it uses those patterns to either create bigger ones or find the final answer. For example,
            lets say that we have a bunch of pictures of different animals, like dogs and cats, and we have to sort them. Now, we don't just simply find which pictures
            belong to which class immediately. Instead, we look at different patterns to determine what animal is a dog or cat. 
        </p>
        <div style={{display:"flex"}}>

       
        <img alt="Dog" key="Dog" src={logo} width="20%" style={{flex:"50.0%", padding:"5px"}}/>
        <img alt="Cat" key="Cat" src={cat} width="27%" style={{flex:"50.0%", padding:"5px"}}/>

        </div>
        <p>
            You can see how by looking at certain patterns with the picture we can determine if the animal is a cat or dog.
            Same thing goes with multilayer perceptron. It looks at different patterns in the dataset and use those patterns to determine
            the final answer. 
        </p>
        <p>
            So, how does multilayer perceptron figure out what are the patterns and how those patterns determine our final answer. 
            This is done by using what is called a neural network. A neural network is a collection of what we called neurons which are used 
            to store information about our data. Our model uses our neural network to understand data by using neurons to determine which patterns appear 
            in the dataset. So, if a certain pattern appear in the dataset, like a dog having dog ears, than the neuron associated with it will light up, or activated. 
            Otherwise, if the pattern is not in the dataset, that our neuron doesn't activate. Based on the neurons that are and not activated, they determine what our final answer 
            will be. So, if the neurons that are activated are associated with the characteristics of a dog and the neurosn that not activated are not associated with the features of a cat,
            then our image is dog. 
        </p>
        <p>
            Here is an example of a basic neural network that demonstrate the example from above. The neurons on the left represent features of an image
            while the neurons on the right are associated with our animal. You can see that each neuron of the left layer is connected to each neuron on the right layer.
            Depending on what neurons get activated or not, it should how much the neurons on the right get activated. The more a neuron on right is activated, the most likely
            the image is that associated animal. 
        </p>
        <NN height={500} weights={[[[0.25, 0.25, -0.25, -0.25],[-0.25, -0.25, 0.25, 0.25]]]} bias={[[0.5, 0.5]]} width={1000} nodes={[1, 4, 2]} radius={25} xDist={100} left={100} yDist={50}
            patterns={[["Image"], ["Dog Ears", "Dog Tail", "Cat Ears", "Cat Tail"], ["Dog", "Cat"]]} 
        ></NN>
        <p>
            Currently, what we are dealing is a very simple nerual netowrk, with one input layer, one hidden layer, and one output layer. Our input layer contains the input to our model, with
            each neuron associated with a feature in our data. The hidden layer is associated with the patterns found from out inputs. Finallly, our output layer contains 
            the final result of our model. 
        </p>
        {/* TODO: Different Stages of Neural Network */}
        <p>
           In regression, our final layer contain only 1 neuron to represent the final value caculated. In classification, our final layer contains a certain number of neurons based
           on the number of classes, with each neuron being associated with how likely the data is classified to that class. 
        </p>
        {/* TODO: Difference betwen regression and classification */}
        <p>
            Most of the time, our neural network can contain more than 1 hidden layer. This means that the patterns identified in one hidden layer can
            be used to find more patterns in the next layer. For example, one hidden layer find the most basic patterns of the animal, like their ears and noses.
            Then, the next hidden layer uses the patterns found in the previous hidden layers to find more complex patterns, such as faces or legs. 
        </p>
        <p>
            Here is an example of a neural network with multiple hidden layers, which the first layer identify basic patterns while the sceond identifying more complex patterns. 
        </p>
        <NN height={800} width={700} nodes={[1, 8, 4, 2]} radius={25} xDist={75} left={100} yDist={50} 
            weights={[[[0.25, 0.25, 0, 0, -0.25, -0.25, 0, 0], [0, 0, 0.25, 0.25, 0, 0, -0.25, -0.25], [-0.25, -0.25, 0, 0, 0.25, 0.25, 0, 0], [0, 0, -0.25, -0.25, 0, 0, 0.25, 0.25]],[[0.25, 0.25, -0.25, -0.25],[-0.25, -0.25, 0.25, 0.25]]]}
            bias={[[0.5, 0.5, 0.5, 0.5],[0.5, 0.5]]}
            patterns={[["Image"], ["Dog Paws", "Dog Tail", "Dog Eyes", "Dog Ears", "Cat Paws", "Cat Tail", "Cat Eyes", "Cat Ears"], ["Dog Body", "Dog Face", "Cat Body", "Cat Face"], ["Dog", "Cat"]]}
        ></NN>
        <p>
            In the end, you can have as many hidden layers and neurons as you want to identify as many complicated patterns from the data. 
        </p>
        <p>
            While neural network work to understand data by identifying patterns, we have no idea what patterns it finds out. 
            There is no way right now to determine what features the neural network find from the data due to the fact similar linear regression and logisitc regression,
            our model is a mathematical model. So there is no way to translate the model to something that a human can understand. 
            {/* TODO: Maybe show a black box */}
        </p>
        <p>
            Still, regardless of how neural networks are incomprehensible, our neural network can handle more complex data. By identifying simpler patters to build more complex patterns and answers,
            multilayer perceptron makes a complex problem into simplier problems to understand the data and find the final answer.
        </p>
        </>
    )
}

//Create MLP Part 3
function MLPDemoPart3()
{
    return(
    <>
    <p>
        So, how come multilayer perceptron can understand more complex data as compared to linear regression or logistic regression? As I said before, multilayer perceptron breaks a much complex problems into simpler problems
        by identifying patterns first and using those patterns to find the final answer. This process makes it easier for our model to our data. Meanwhile, linear regression and logistic regression
        tried to find the answer directly without trying to understand the data first. As a result, linear regression and logistic regression only work if the data being used is easy to understand for them
        without having to identify any complex patterns. 
    </p>
    {/* Visualization for this concept if possible */}
    <p>
        Still, how come multilayer perceptron can handle data that linear regression and logistic regression cannot understand. Multilayer preceptron makes its own assumption on the data
        that being the data is nonlinear. Back in Part 1, linear regression can handle data that form a straight linear line while logistic regression can handle data where the data points of each class form their distinct group. 
    </p>
    {/* TODO: Examples of datapoints of regressioin and classifcation */}
    <p>
        Meanwhile, linear regression can't handle data that doesn't form a straight line while logistic regression can't handle data where classes overlap with each other. 
        The data that both linear and logistic regression can't handle our examples of non linear data. So, what makes a data non linear is where either the data doesn't form a straight line or
        when their are overlapping between different classes in the data. 
    </p>
    {/* TODO: Example of non linear data points  */}
    <p>
        With this in my mind, how come our neural network can understand non linear data. Non linear data are composed of data points that doesn't form linear paths and overlap classes. 
        It these non linear aspects of our data are what our neural network is trying to find. Anything that is non linear in the data are the patterns that our neural network is trying to identify.
        For our regression, example, our neural network could indentify that the path is made of 2 curves which are non linear in nature
    </p>
    {/* TODO: Show How Parobola is composed of two features */}
    <p>
        As for classification, our neural network can identify that the short class is associated with even wieghts and another class is associated with odd weights.
    </p>
    {/*TODO: Show How despite the overlapping, the classes can still be indetifidable */}

    <p>
        In the end, a neural network is able to identify non linear features in the data set and able to make conclusions based on these patterns, a capability that both linear and logistic regression
        lack. 
    </p>
    </> 
    )
}

//Create MLP Demo for Part 4
function MLPDemoPart4Front()
{
    return(
        <>
        <p> Now, we are going to properly see if multilayer perceptron can handle the regression and classifcation datasets introduced early. 
            Part of the process is finding what models will work and won't work. So, what you going to do is for each model, find our how many layers
            there should be and how many neurons there should be in each layer. All the other parameters will remain constant, so focus on making a good model. 
        </p>

        <p>
            Here are some tips that may be helpful for you. 
        </p>
        <p>
            Tip #1: Make the number of neurons in each layer to be a power of 2. So, a layer have 2,4,8,16,32, and so on for each layer.
            While you can use any number of neurons for each layer, it is easier to have powers of 2 in each layer because it will be easier to
            find a good size for each layer. You only need to look a certain number of neurons in each layer rather trying every single possible number of
            neurons in each layer. 
        </p>
        <p>
            Tip #2: There are different metrics we can use to determine whether our model is good or not. You can use the loss metric and try to lower
            the loss as low as possible. You can try the accuracy metric and try to improve the model accuracy as close ot 100%. You can use the confusion matrix
            and try to decrease the number of false classifcations and increase the number of true classifcation. Ulitmately, you get decide what metrics you will consider
            when deciding if a model is good or not. 
        </p>
        <p>
            Tip #3: You also get to decide when the model is good enough depending on the value of the metric you want to reach.
            It is often suggest to try to create the most perfect model as possible, but most of the time that isn't the case 
            as there can't always be a perfect model that fits everything. Still, if you can't make a model that is perfect, you can always have the model
            pass a certain benchmark, like reach a certain metric. Ulitmately, you get to decide when the model is good enough for you. 
        </p>
        <p>
            Here is the data for the regression problem
        </p>
            {/* TODO: Show Data for Regression Model */}
        </>
    );
}

//Create MLP Demo Part 4 Back
function MLPDemoPart4Back()
{
    <>
    <p>
        Here is the data for the classifcation problem
    </p>
   {/* Show the data for classifcation and handle training of the model */}
    </>
}

//Create MLP Demo Part 5
function MLPDemoPart5()
{
    <>
    <p>
        Multilayer perceptron is a very good machine learning model and served as the foundation 
        for more advanced artificial intelligence. However, there are some major drawbacks behind multilayer
        perceptron.
    </p>
    <p>
        As explained before, no one knows how a neural network works. What a model learns about the data is unknowable to humans
        since it define patterns in the data using mathematical models rather than anything human readable. Still, if you don't care
        what's going on in the model, then you don't need worry about this problem. 
    </p>
    <p>
    However, there are time which is knowing what going on in the model is important. For example, if you are doctore that wants to understand 
    what causes a disease based on certain aliments, then you could use a model to predict whether a person will have a disease based on any combination of
    aliments. However, it still important to know what aliments cause the disease and their effects. If we used a multilayer perceptron, then we
    will have no idea what aliments caused the disease since the model has no way to indicate how the features affects the results. 
    </p>

    {/* TODO: A visualization of the problem  */}
    <p>
        Thus, if you do care how a model works, then you are going to need a decision tree. A decision tree can explain how
        the features of a dataset can affect of the model in readable human terms. 
    </p>
    {/* TODO: Show a tree doing a better job at understanding the problem */}
    <p>
        Another major drawback is that as compared to most nerual networks, multilayer perceptron is a very simple model. As a result, there will be times in which the dataset
        is way to complicated for the model to understand. So far, you have experience datasets where each input can be represent by a series of numbers. However, the problem comes 
        when we are working with datasets that don't fit this scope. For example, we have a dataset that contain images, where images are represented by a 2d grid and have pixels
        represented by a series of values. We can also have a dataset that contain text, where 
    </p>
    </>
}

export default MLPDemo