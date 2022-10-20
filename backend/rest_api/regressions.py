# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction - Junyi
# log: modified Oct 12 - added a demo function to play with test and train size and random state for MNIST classifier - Junyi
# log: modifited Oct 18 - Modified Linear Regression to take in params and return model and added both Logistics and Decision Tree Regression - Amith Panuganti
from sklearn.linear_model import LinearRegression #input linear regression methods
from sklearn.linear_model import SGDClassifier #input linear regression methods
from sklearn.linear_model import LogisticRegression # input logistic regression
from sklearn import tree # For decision tree
from sklearn.datasets import fetch_openml #for MNIST Demo
from sklearn.metrics import accuracy_score # for regression accuracy
from sklearn.model_selection import train_test_split # to spilt test data
import numpy as np #typical numpy import
import matplotlib #just in case for drawing a graph
def LinearMethod(vector_x, vector_y, data): #easily call linear regression method
    #input: two vectors (vector_x, vector_y), showing correlating two vectors on the plane.
    #output: calculated result of linear regression as y = (w)x+(b)
    #errors: wrongful type of input, wrongful vector size, wrongful type inside vector
    #side effects and known faults not found yet
    model = LinearRegression() #define the model
    model.fit(vector_x, vector_y) #fit into linear regression model
    return model # Return the model

# Call Logisitcs Regression 
# input: two vectors x and y, data containing parameters
# output: model for logistic regression after fitting
# errors: incorrect sizes for vector x and y, params don't exist in data
def LogisiticsRegressionMethod(vector_x, vector_y, data): 
    # Get the following params for data
    # penalty, regulatriztion coefficient, and bias
    penalty = data["penalty"]
    C = data["C"]
    fit_intercept = data["fit_intercept"]

    # Create our model
    model = LogisticRegression(penalty=penalty, C=C, fit_intercept=fit_intercept, solver="saga")

    # Fit the model
    model.fit(vector_x, vector_y)

    # Return the model
    return model

# Call Decision Tree Regression
# input: two vectors x and y, data containing parameters
def DecisionTreeRegression(vector_x, vector_y, data):
    # Get the following param form data
    # criterion, max_depth, min_samples_leaf, ccp_alpha, min_samples_split
    criterion = data["criterion"]
    max_depth = data["max_depth"]
    min_samples_leaf = data["min_samples_leaf"]
    ccp_alpha = data["ccp_alpha"]
    min_samples_split = data["min_samples_split"]

    # Create our model
    model = tree.DecisionTreeRegressor(criterion=criterion, max_depth=max_depth, min_samples_leaf=min_samples_leaf, min_samples_split=min_samples_split, ccp_alpha=ccp_alpha)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Return the model
    return model


def MNIST_SGDDemo(test_size: float, random_state: int):#a demo of MNIST to fetch interest for K-12 students
    # input: percentage to test to let kids know test size and train size's difference and the random state (just in case, not really used)
    # output: the test accuracy score, for students to see how different test size can alter the accuracy of the training
    # errors: wrongful test size - sorted with raising error, wrongful random state - unknown yet
    #side effects and known faults not found yet
    mnist_data = fetch_openml('MNIST_784') # download MNIST vectors from scikit database
    if (test_size >= 1 or test_size <= 0): # find out wrongful test size
        raise IndexError("Please enter a proper test percentage between 0 and 1, not inclusive") # if it happens halt the function and raise error
    x, y = mnist_data['data'], mnist_data['target'] #separate data for fitting
    x_train,x_test,y_train,y_test=train_test_split (x, y, test_size = test_size, random_state = 1) #randomly select some data for training and some for testing by input test size
    mnist_sgd = SGDClassifier(random_state = random_state) # start a SGD classifier, by official demo. let students choose their own random state
    mnist_sgd.fit (x_train, y_train) #fit the tree
    y_predict = mnist_sgd.predict(x_test) #predict the model using the test data
    return accuracy_score(y_predict, y_test) #return predict accuracy percentage

#print(MNIST_SGDDemo(0.5, 42)) - for testing



