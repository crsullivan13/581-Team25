/*
Name: DecisionTree.test.js
Description: Meant to test the functions of the decision tree
Programmers: Amith Panuganti
Creation Date: 1/19/22
Preconditions: Used for testing the decision tree. Also for practice testing
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions:
    1/19/22
    Author: Amith Panuganti
    Revision: Created File
    
    1/23/22
    Author: Amith Panuganti
    Revision: Revised Test 1 to check for info and depth of each node and tree itself
*/

//Improt Tree 
import {Tree} from "../Tabs/DecisionTree"

//Create tree text file for testing
let textTree = "|--- petal width (cm) <= 0.80\n|   |--- class: 0\n|--- petal width (cm) >  0.80\n|   |--- petal width (cm) <= 1.75\n|   |   |--- class: 1\n|   |--- petal width (cm) >  1.75\n|   |   |--- class: 2\n"

//Describe the Tree
describe("Tree", () => {
    //Create Tree Object with textTree
    const tree = new Tree(textTree);
    
    //Test Tree
    test("define test()", () => {
        //Check values of root
        expect(tree.root.value).toBe(0.8)
        expect(tree.root.name).toBe("petal width (cm)")
        expect(tree.root.info).toBe("petal width (cm) <= 0.80")
        expect(tree.root.depth).toBe(0)
        expect(tree.root.type).toBe("Decision")
        expect(tree.root.longestPath).toBe(2)

        
        //Check values of root left child
        expect(tree.root.leftChild.class).toBe(0)
        expect(tree.root.leftChild.info).toBe("class: 0")
        expect(tree.root.leftChild.depth).toBe(1)
        expect(tree.root.leftChild.type).toBe("Class")
        expect(tree.root.leftChild.longestPath).toBe(0)

        //Check values of root right child
        expect(tree.root.rightChild.value).toBe(1.75)
        expect(tree.root.rightChild.name).toBe("petal width (cm)")
        expect(tree.root.rightChild.info).toBe("petal width (cm) <= 1.75")
        expect(tree.root.rightChild.type).toBe("Decision")
        expect(tree.root.rightChild.longestPath).toBe(1)


        //Check values of root right child children classes
        expect(tree.root.rightChild.leftChild.class).toBe(1)
        expect(tree.root.rightChild.leftChild.info).toBe("class: 1")
        expect(tree.root.rightChild.leftChild.depth).toBe(2)
        expect(tree.root.rightChild.leftChild.type).toBe("Class")
        expect(tree.root.rightChild.leftChild.longestPath).toBe(0)

        expect(tree.root.rightChild.rightChild.class).toBe(2)
        expect(tree.root.rightChild.rightChild.info).toBe("class: 2")
        expect(tree.root.rightChild.rightChild.depth).toBe(2)
        expect(tree.root.rightChild.rightChild.type).toBe("Class")
        expect(tree.root.rightChild.rightChild.longestPath).toBe(0)

        //Check if depth of the actual tree is corre t
        expect(tree.treeDepth).toBe(2)
    })
})


