"""
Name: decisionTreeRegressionTest.py
Description: Tests decision tree regression
Programmers: Amith Panuganti 
Creation Date: 10/19/22
Revisions:
    10/19/22
    Author: Amith Panuganti
    Description: Tested Decision Tree Regression

    10/21/22
    Author: Amith Panuganti
    Description: Tested Decision Tree Regression with more parameters
Preconditions: Can only be run if server is up
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
"""

# Imports
import json
import requests
import jsonpickle as jp
import sklearn

# Our features
x = [[2.0],[5.0], [6.0]]

# Our labels
y = [2.0, 5.0, 6.0]

# Our model
model = "Decision Tree Regression"

# Our parms
criterion = "squared_error"

max_depth=None

min_samples_split=2

min_samples_leaf=1

ccp_alpha=0.0

# Create dict
dictToSend = {
    "X" : x,
    "y" : y,
    "model" : model,
    "criterion" : criterion,
    "splitter" : "best",
    "max_depth" : None,
    "min_samples_split": 2,
    "min_weight_fraction_leaf": 0.0,
    "max_features": None,
    "min_samples_leaf" : 1,
    "ccp_alpha" : 0.0,
    "random_state": None,
    "max_leaf_nodes": None,
    "min_impurity_decrease": 0.0
}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/fit', json=dictToSend)

# Decode 
model = jp.decode(res.json()["model"])

# Print prediction for x on model
print(model.predict(x))