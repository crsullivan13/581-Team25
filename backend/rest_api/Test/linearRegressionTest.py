"""
Name: train.py
Description: Tests fit by passing in linear regressiosn model
Programmers: Amith Panuganti 
Creation Date: 10/9/22
Revisions:
    10/9/22
    Author: Amith Panuganti
    Description: Tested linear regression  model by sending values to fit backend
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

# Our features
x = [[2.0],[5.0], [6.0]]

# Our labels
y = [2.0, 5.0, 6.0]

# Model
model = "Linear Regression"

# Create dict to send to backend
dictToSend = {"X": x, "y": y, "model": model}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/fit', json=dictToSend)

# Print final response from backend
print(res.json())