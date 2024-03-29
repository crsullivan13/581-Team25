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
        Author: Derrick Quinn
    11/20/22
        Revision: Added support for input validation
        Author: Derrick Quinn
    12/04/22
        Revision: Added support for sequential model
        Author: Amith Panuganti
    1/18/23
        Revision: Add Traing Function for Decision Tree Demo
        Author: Amith Panuganti 
    1/21/23
        Revision: Change Decision Tree Regression Demo to Decision Tree Classification Demo
        Author: Amith Panuganti
    2/7/23
        Reivision: Add part 1 of logisitc regression demo
        Author: Amith Panuganti
    2/9/23
        Revision: Add Part 2 of logisitc regression demo
    3/1/23
        Revision: Add Part 1 model for MLP Demo
    4/8/23
        Revision: Add KNN Classifier
    4/9/23
        Revision: Add KNN Regressor
    
    
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
from lib.validation import validate_input, validate_output
import numpy as np
import matplotlib.pyplot as plt

# Create a dictionary that will contain both model name and its regression function
model_dict = {
    "Linear Regression": regressions.LinearMethod,
    "Logistic Regression": regressions.LogisiticsRegressionMethod,
    "Decision Tree Regression": regressions.DecisionTreeRegression,
    "Decision Tree Classification Demo": regressions.DecisionTreeDemoModel,
    "Logistic Regression Demo Part 1":regressions.LogisticRegressionDemoPart1,
    "MLP Regression": regressions.MLPRegression,
    "MLP Classification":regressions.MLPClassification,
    "Gaussian Naive Bayes":regressions.GaussianNaiveBayes,
    "Decision Tree Classification": regressions.DecisionTreeClassification,
    "Sequential Model":regressions.SequentialModel,
    "Logistic Regression Demo Part 2":regressions.LogisticRegressionDemoPart2,
    "MLP Demo Part 1 Front":regressions.MLPDemoPart1Front,
    "MLP Demo Part 1 Middle":regressions.MLPDemoPart1Middle,
    "MLP Demo Part 4 Front":regressions.MLPDemoPart4Front,
    "MLP Demo Part 4 Back":regressions.MLPDemoPart4Back,
    "KNN Classifier":regressions.KNNClassifierMethod,
    "KNN Regressor":regressions.KNNRegressorMethod
}

# Will handle training the model 
# Inputs: data. Will always contain features, labels, and modelName
# Output: Model
# Errors: Model does not exist. Features dim and labels dim are incorrect
def trainModel(data):
   
    # Get the features, names, and labels of the model
    features = data['X']
    labels = data['y']
    
    validate_input(features)
    validate_output(labels)

    modelName = data['model']
 
    # Get model using model
    model = model_dict[modelName]

    # Convert x and y to be numpy arrays
    features = np.array(features)
    labels = np.array(labels)
    
    # Get model kwargs
    kwargs = {k: data[k] for k in data if k != "X" and k != "y" and k != "model"}

    # Clear any plots
    plt.close()
    m_metrics = None

    # Train the model and get model and figure
    model,figure,m_metrics = model(features, labels, kwargs)
    
    # Return parameters of model
    return model,figure,m_metrics
        
