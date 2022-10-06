"""
Name: train.py
Description: Trains the Model
Programmers: Amith Panuganti 
Creation Date: 10/5/22
Revisions:
    10/5/22
		Revision: Create train.py and create trainModel function
		Author: Amith Panuganti 
    10/6/22
        Revision: Create train model function which will
        train a model give features and labels
        Author: Amith Panuganti
Preconditions: Needs labels, features, and model type
Postconditions: Returns model weights and biases
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/
"""

# Import regressions
import regressions

# Create a dictionary that will contain both model name and its regression function
model_dict = {
    "Linear Regression": regressions.LinearMethod
}

# Will handle training the model 
# Inputs: features, labels, and model type
# Output: Model
# Errors: Model does not exist. Features dim and labels dim are incorrect
def trainModel(features, labels, modelName):
    # Do everything in a try block
    try:
        # Create a list that will cotain model parameters
        modelParms = []

        # Get model using model
        model = model_dict[modelName]

        # Train the model and get params
        params = model(features, labels)

        # Go through each param in params
        for param in params:
            # Add param to modelParams
            modelParms.append(param)
        
        # Return parameters of model
        return modelParms
        
    # If there is an exception
    except:
        # Raise an exception that tell the user that model cannot be trained
        raise Exception("Can't train model")
