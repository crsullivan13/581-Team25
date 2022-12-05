import tensorflow as tf
import requests
import jsonpickle as jp
import base64

"""
Name: sequentialDenseModel.py
Description: Tests Model for Sequential
Programmers: Amith Panuganti 
Creation Date: 12/2/22
Revisions:
    12/2/22
    Author: Amith Panuganti
    Description: Started creating tests for sequnetial model

Preconditions: Can only be run if server is up
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
"""
# First Create, Create a TF Model
# Get Inputs
features = [[0.0], [1.0], [2.0]]
labels = [[0.0], [1.0], [2.0]]

# Create data

# Create dict to send 
dictToSend = {
    'X': features,
    'y': labels,
    'uuid': None,
    'model': "Sequential Model",
    'type': "classification",
    'layers':[
    {
        'type': "Dense",
        'units': 4,
        'use_bias':False,
        'activation':"relu"
    },
    {
        'type':"Dense",
        'units':8,
        'use_bias':False,
        'activation':"sigmoid"
    }
    ],
    'loss' :"sparse categorical cross entropy",
    'optimizer': {
        'type': "SGD", 
        'momentum': 1.0,
        'learning_rate':0.01
    },
    'batch_size': 1,
    'epochs':3,
}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/fit', json=dictToSend)
# Print res
bytes = res.json()["figure"]

with open("img1.jpeg", "wb") as fp:
    content = base64.b64decode(bytes)
    fp.write(content)

# Create another dictionary, but for regression
dictToSend = {
    'X': features,
    'y': labels,
    'uuid': None,
    'model': "Sequential Model",
    'type': "regression",
    'layers':[
    {
        'type': "Dense",
        'units': 4,
        'use_bias':False,
        'activation':"relu"
    },
    {
        'type':"Dense",
        'units':8,
        'use_bias':False,
        'activation':"sigmoid"
    }
    ],
    'loss' :"mean squared error",
    'optimizer': {
        'type': "Adam", 
        'learning_rate':0.01
    },
    'batch_size': 1,
    'epochs':5,
}
print(res.json())
# Print res

# Convert figure into an image
bytes = res.json()["figure"]

with open("img2.jpeg", "wb") as fp:
    content = base64.b64decode(bytes)
    fp.write(content)


