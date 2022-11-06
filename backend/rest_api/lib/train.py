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
        Author: Amith Panuganti
    10/10/22
        Revision: Convert features and labels into numpy arrays so that the regressions
        model will run properly
        Author: Amith Panuganti
    11/6/22
        Revision: Add support for getting metrics, specifically figures for training
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
from lib import regressions
import numpy as np

# Create a dictionary that will contain both model name and its regression function
model_dict = {
    "Linear Regression": regressions.LinearMethod,
    "Logistic Regression": regressions.LogisiticsRegressionMethod,
    "Decision Tree Regression": regressions.DecisionTreeRegression
}

# Will handle training the model 
# Inputs: data. Will always contain features, labels, and modelName
# Output: Model
# Errors: Model does not exist. Features dim and labels dim are incorrect
def trainModel(data):
    # Do everything in a try block
    try:
        # Get the features, names, and labels of the model
        features = data["X"]
        labels = data["y"]
        modelName = data["model"]

        # Get model using model
        model = model_dict[modelName]

        # Convert x and y to be numpy arrays
        features = np.array(features)
        labels = np.array(labels)

        # Train the model and get model
        model, figure = model(features, labels, data)
        
        # Return parameters of model
        return model, figure
        
    # If there is an exception
    except:
        # Raise an exception that tell the user that model cannot be trained
        raise Exception("Can't train model")
