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
*/

//Import react
import React from "react";
import { useState } from 'react';
import {Button , Accordion} from 'react-bootstrap';
import GeneralDemoPart from "./GeneralDemo";

//Create Component for MLPDemo
function MLPDemo(props)
{
    //Create an Accordian
    return(
        <>
        <h1>Multilayer Perceptron Demo</h1>
        <Accordion flush>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Part 1</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart1Front></MLPDemoPart1Front>
                    <MLPDemoPart1Middle></MLPDemoPart1Middle>
                    <MLPDemoPart1Back></MLPDemoPart1Back>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Part 2</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart2></MLPDemoPart2>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Part 3</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart3></MLPDemoPart3>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
                <Accordion.Header>Part 4</Accordion.Header>
                <Accordion.Body>
                    <MLPDemoPart4Front>
                    </MLPDemoPart4Front>
                    <MLPDemoPart4Back>
                    </MLPDemoPart4Back>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item>
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


//Create front component for Part 1 of MLP Demo
function MLPDemoPart1Front()
{
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

    {/*TODO: Add Model or Image to show a linear regression demo */}
    <p>
        Likewise, a good dataset for logistic regression would be if each class are represented by data points that 
        form seperate groups in different parts of the dataset. 
    </p>
    {/* Show how logistic regression is good for the dataset */}
    <p>
        However, the problem comes when the dataset ignores both linear and logistic regression assumptions on the dataset.
        For linear regression, this is when our dataset doesn't follow a straight line. For example, lets say we are given a dataset
        that looks like the following.
    </p>

    {/*TODO: Show graph of dataset */}
    <p>
        You can see that the path of the data is not a linear line. So, if we try using linear regression it. We get the follwoing
    </p>
    </>

    
    )
}

//Create middle component for Part 1 of MLP Demo
function MLPDemoPart1Middle()
{
    return(
        <>
        <p>
         You can see that the our model is a good fit for the data set. The path of our data can match the linear line
        </p>
        <p>
            As for classification, logistic regression is not good if there are overlapping between different classes.
            For example, lets say that we want to know if a person is tall or short based on their weight. So, we let tall and short 
            people be our classes and weight be used to determine the class. In a normal scenario, we would see that our classes clustered
            around a series of weights. However, the problem comes when these classes overlap.
        </p>
        {/* Add graph to show dataset */}
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
        {/* TODO: Maybe pictures highlight different parts of dogs and animals */}
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
        {/* TODO: Interactive Neural Network */}
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
        {/* TODO: Add another interactive version of neural network  */}
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