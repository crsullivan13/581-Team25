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
*/


//Import react
import { parse } from "papaparse"
import React from "react"

//Create a tree node
class TreeNode
{
    //Constructor
    constructor()
    {
        //Parameters
        //Left Child
        this.leftChild = null

        //Right child
        this.rightChild = null
        
        //Store type of tree
        this.type = null

        //Depth of the tree
        this.depth = 0

        //Set parent of tree
        this.parent = null

    }

    //Set type
    setType(type)
    {
        //Set this type to type
        this.type = type
    }

    //Set depth
    setDepth(depth)
    {
        //Set depth of node
        this.depth = depth
    }

    //Insert to the tree
    insertChild(child)
    {
        //If leftChild is null
        if(this.leftChild == null)
        {
            //Set leftChild to be child
            this.leftChild = child

            //Set parent of leftChild
            this.leftChild.parent = this
        }
        //Otherwise
        else
        {
            //Set rightChild to be child
            this.rightChild = child

            //Set parent of right child to be null
            this.rightChild.parent = this
        }
    }


    //Get left child
    getLeftChiild()
    {
        //Return left child
        return this.leftChild
    }

    //Get right child
    getRightChild()
    {
        //Return right child
        return this.rightChild
    }

    //Get parent
    getParent()
    {
        //Return the parent
        return this.parent
    }
}

//Decision Node
class DecisionNode extends TreeNode
{
    //Constructor
    constructor(name, value, depth)
    {
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
    }


}
//Class Nodes for class 
class ClassNode extends TreeNode
{
    constructor(group, depth)
    {
        //Construct from Tree Node
        super()

        //Set class to be group
        this.class = group

        //Set type as calss
        this.type = "Class"

        //Set depth as depth
        this.depth = depth

        //Set parent
        this.parent = null
    }
}

//Create a class for tree
class Tree
{
    //Constructor
    constructor()
    {
        //Form root node
        this.root = null
    }

    //Create tree
    createTree(textTree)
    {
        //Firstly, divide up string into array of lines
        const lines = textTree.split("\n")

        //Get first line
        let firstLine = lines[0]

        //Next, we want the name of the root
        //Get the last index of |-- 
        let startIndex = firstLine.indexOf("|--- ") + 5

        //Get endIndex 
        let endIndex = firstLine.indexOf(" <=")

        //Get substring 
        let name = firstLine.substring(startIndex, endIndex)

        //Next, get startIndex of value
        startIndex = endIndex + 4

        //Get value
        let value = firstLine.substring(startIndex)

        //Convert value to float
        value = parseFloat(value)

        //Create deciion tree node
        this.root = new DecisionNode(name, value, 0)

        //Next, get currentNode
        let curNode = this.root

        //Create depth and set it as 0
        let depth = 0

        //Loop until we reach the end of the array
        for(let i = 1; i < lines.length; i++)
        {
            //Get line 
            let line = lines[i]

            //Get index of |--- 
            let index = line.indexOf("|--- ")

            //Divide index by 4
            index = index / 4

            //If index is greater than depth
            if(index > depth)
            {
                
            }
        }
    }
}