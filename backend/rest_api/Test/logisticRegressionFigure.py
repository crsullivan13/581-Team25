"""
Name: logisticsRegressionFigure.py
Description: Tests printing a figure from logistics regression
Programmers: Amith Panuganti 
Creation Date: 11/6/22
Revisions:
    11/6/22
    Author: Amith Panuganti
    Description: Tested getting logistics regression confusion matrix

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
import matplotlib.pyplot as lib
import PIL.Image as Image
import base64

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
dictToSend = {"X": x, 
              "y":y, 
              "penalty":penalty,
              "dual":False,
              "tol":0.0001, 
              "C":C, 
              "fit_intercept":fit_intercept, 
              "intercept_scaling":1,
              "class_weight":None,
              "random_state":None,
              "solver":"saga",
              "max_iter":100,
              "multi_class":"auto",
              "verbose":1,
              "warm_start":False,
              "n_jobs":None,
              "l1_ratio":None,
              "model":model,
              "uuid": None}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/fit', json=dictToSend)

# Print res
bytes = res.json()["figure"]

with open("img.jpeg", "wb") as fp:
    content = base64.b64decode(bytes)
    fp.write(content)

