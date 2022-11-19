"""
Name: MLPClassifierTest.py
Description: Tests MLP Classifier
Programmers: Amith Panuganti 
Creation Date: 11/10/22
Revisions:
    11/10/22
    Author: Amith Panuganti
    Description: Tested MLP Classification

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
import PIL.Image as Image
import base64

# Our features
x = [[2.0],[5.0], [3.0], [4.0]]

# Our labels
y = [0, 1, 0, 1]

# Create dict to send 
dictToSend = {
    'X': x,
    'y': y,
    'uuid': None,
    'model':"MLP Classification",
}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/fit', json=dictToSend)
print(res.json())
# Print res
bytes = res.json()["figure"]

with open("img.jpeg", "wb") as fp:
    content = base64.b64decode(bytes)
    fp.write(content)