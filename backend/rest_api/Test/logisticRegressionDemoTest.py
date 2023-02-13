"""
Name: logisticRegressionDemoTest.py
Description: Tests each model for the logistic regression demo
Programmers: Amith Panuganti
Creation Date: 2/9/22
Revisions:
Preconditions: Runs only when the server runs
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
"""

# Imports
import requests
import base64

# Create our dataset
x = [[50],[55],[60],[65],[70],[75],[80],[85],[69],[73]]
y = [0,0,0,0,1,1,1,1,0,1]

# Test Part 1 of Logistic Regression dEMO
# Set model to be Logisitc Regression Part 1
model = "Logistic Regression Demo Part 1"

# Create dicitonary to send 
dictToSend = {"X":x, "y":y, "model":model}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/logisticRegressionDemo', json=dictToSend)


# Print loss
print("Logistic Regression Demo Part 1 Loss: ", res.json()["loss"])

# Create image
with open("img1.jpeg", "wb") as fp:
    content = base64.b64decode(res.json()["figure"])
    fp.write(content)

# Test Part 2 of Logistic Regression Demo Part 2
# Set model to be Logisitc Regression Part 2
model = "Logistic Regression Demo Part 2"

# Create dicitonary to send 
dictToSend = {"X":x, "y":y, "model":model}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/logisticRegressionDemo', json=dictToSend)

# Print loss and accuracy
print("Logistic Regression Demo Part 2 Loss: ", res.json()["loss"])
print("Logistic Regression Demo Part 2 Accuracy: ", res.json()["accuracy"])

# Create image
with open("img2.jpeg", "wb") as fp:
    content = base64.b64decode(res.json()["figure"])
    fp.write(content)


# Test Part 3 of the dataset
# Set model to be Logistic Regression Part 2
model = "Logistic Regression Demo Part 2"

# Create new datset for x and y
y = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]

#Create dicitonary to send 
dictToSend = {"X":x, "y":y, "model":model}

# Send post request to back end
res = requests.post('http://127.0.0.1:5000/logisticRegressionDemo', json=dictToSend)

# Print loss and accuracy
print("Logistic Regression Demo Part 3 Loss: ", res.json()["loss"])
print("Logistic Regression Demo Part 3 Accuracy: ", res.json()["accuracy"])

# Create image
with open("img3.jpeg", "wb") as fp:
    content = base64.b64decode(res.json()["figure"])
    fp.write(content)

# Test Part 4 of the dataset
# Set model to be Logistic Regression Demo Part 4
model = "Logistic Regression Demo Part 4"

# Create dataset
