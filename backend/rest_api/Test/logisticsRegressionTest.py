"""
Name: logisticsRegressionTest.py
Description: Tests fit by passing logistic regression
Programmers: Amith Panuganti 
Creation Date: 10/9/22
Revisions:
    10/9/22
    Author: Amith Panuganti
    Description: Tested logistics regression 

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
x = [[2.0],[5.0], [3.0], [4.0]]

# Our labels
y = [0, 1, 0, 1]

# Penalty
penalty = "none"

# Regularization Strength
C = 1.0

# Fit Intercept
fit_intercept = True

# Model
model = "Logistic Regression"

# Create dictionary to send parameters
dictToSend = {"X": x, "y":y, "penalty":penalty, "C":C, "fit_intercept":fit_intercept, "model":model}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/fit', json=dictToSend)

# Decode 
model = jp.decode(res.json()["model"])

print(model.classes_)

# Print prediction for x on model
print(model.predict([[2.0]]))