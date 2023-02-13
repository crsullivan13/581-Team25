"""
Name: decisionTreeDemoTest.py
Description: Tests the Decision Tree Demo Route. File is for testing puposes only
Programmers: Amith Panugant
Creation Date: 1/18/22
Revisions
    1/24/22
    Author: Amith Panuganti
    Revision: Changed model to correct model
Pre-Conditions:
    Can only be used if server is running.
Post-Conditions:
    Return both the loss text of the decision tree
Errors:
    None
Side Effects:
    None
Invariants:
    None
Faults:
    None
"""

#Import
import requests

# Create the dataset for the tree
# Our features
x = [[2.0],[5.0], [6.0]]

# Our labels
y = [2.0, 5.0, 6.0]

# Model
model = "Decision Tree Classification Demo"

# Create Dict To send
data = {
    "X":x,
    "y":y,
    "model":model,
    "uuid":None
}

# Send post request to the backend
res = requests.post('http://127.0.0.1:5000/decisionTreeDemo', json=data)

# Print text and loss
print("Loss: ", res.json()["loss"])
print("Decision Tree:\n"+ res.json()["tree"])
