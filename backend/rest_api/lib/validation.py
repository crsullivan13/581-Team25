
"""
Name: validation.py
Description: validates training data
Programmers: Derrick Quinn
Creation Date: 11/14/22
Revisions:
    11/20/22
        Revision: initial commit: validates input and outputs on training data
    
Errors: None
Side Effects: Throws exceptions for invalid data
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
