"""
Name: decisionTreeClassifer.py
Description: Test Decision Tree Classification
Programmers: Amith Panuganti 
Creation Date: 11/17/22
Revisions:
    11176/22
    Author: Amith Panuganti
    Description: Tested Decision Tree Classification

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
    'model':"Decision Tree Classification"
}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/fit', json=dictToSend)
print(res.json())
# Print res
bytes = res.json()["figure"]

with open("img.jpeg", "wb") as fp:
    content = base64.b64decode(bytes)
    fp.write(content)