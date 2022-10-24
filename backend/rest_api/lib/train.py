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
    10/7/22
        Revision: Re-edit params since for all possible models
        from sklearn, we will only get weight and biases
    10/10/22
        Revision: Convert features and labels into numpy arrays so that the regressions
        model will run properl
Preconditions: Needs labels, features, and model type
Postconditions: Returns model weights and biases
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/
"""

# Import regressions
from lib import regressions
import numpy as np

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
        # Get model using model
        model = model_dict[modelName]

        # Convert x and y to be numpy arrays
        features = np.array(features)
        labels = np.array(labels)

        # Train the model and get params
        w,b = model(features, labels)
        
        # Return parameters of model
        return w,b
        
    # If there is an exception
    except:
        # Raise an exception that tell the user that model cannot be trained
        raise Exception("Can't train model")
