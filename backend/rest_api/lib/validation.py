
"""
Name: train.py
Description: Trains the Model
Programmers: Amith Panuganti, Derrick Quinn
Creation Date: 10/5/22
Revisions:
    10/5/22
		Revision: Create train.py and create trainModel function
		Author: Amith Panuganti 
    10/6/22
        Revision: Create train model function which will
        train a model give features and labels
        Author: Amith Panuganti
    10/7/22
        Revision: Re-edit params since for all possible models
        from sklearn, we will only get weight and biases
        Author: Amith Panuganti
    10/10/22
        Revision: Convert features and labels into numpy arrays so that the regressions
        model will run properly
        Author: Amith Panuganti
    11/1/22
        Revision: Added descriptive error messages, kwarg integration
    11/6/22
        Revision: Add support for getting metrics, specifically figures for training
        Author: Amith Panuganti 
    11/15/22
        Revision: Add Supported for MLP, Naive Bayes, and Decesion Tree Algorithms
    
Preconditions: Needs labels, features, and model type
Postconditions: Returns model weights and biases
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/
"""


"""
    This function validates list of input vectors. Currently, it performs a simple check that all input vectors have the same length.
    inputs:
        X: The list of input vectors to validate
    outputs:
        nothing
    side effects:
        Raises an exception if an input is invalid
"""
def validate_input(X):
    #get the length of the first element, deem this to be the "correct" length
    l = len(X[0])
    
    #except if there's an issue
    if not all([len(x_i) == l for x_i in X]):
        raise Exception("Input vectors have inconsistent lengths")
"""
    This function validates a list of outputs. Currently, it performs a simple check that all outputs have the same type.
    inputs:
        y: The list of outputs to validate
    outputs:
        nothing
    side effects:
        Raises an exception if an output list is invalid
"""

def validate_output(y):
    #get the type of the first element, deem this to be the "correct" type
    t = type(y[0])

    #Except if there's an issue
    if not all([type(y_i) == l for y_i in y]):
        raise Exception("Input vectors have inconsistent lengths")
