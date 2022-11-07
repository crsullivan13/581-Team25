# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction - Junyi
# log: modified Oct 12 - added a demo function to play with test and train size and random state for MNIST classifier - Junyi
# log: modified Oct 18 - Modified Linear Regression to take in params and return model and added both Logistics and Decision Tree Regression - Amith Panuganti
# log: modified Oct 21 - Add more Hyperparameters for Logistics and Decession Tree Regression - Amith Panuganti
# log: modified Nov 6 - Create Metrics for all regressions models
# log: Added kwarg integration to simplify programming
from sklearn.linear_model import LinearRegression #input linear regression methods
from sklearn.linear_model import SGDClassifier #input linear regression methods
from sklearn.linear_model import LogisticRegression # input logistic regression
from sklearn import tree # For decision tree
from sklearn.datasets import fetch_openml #for MNIST Demo
from sklearn.metrics import accuracy_score, confusion_matrix, plot_confusion_matrix, ConfusionMatrixDisplay # for regression accuracy and confusion matrix
from sklearn.model_selection import train_test_split # to spilt test data
from sklearn.tree import plot_tree # To plot decision trees
import matplotlib.pyplot as plt # For Plots
import numpy as np #typical numpy import
import matplotlib #just in case for drawing a graph
def LinearMethod(vector_x, vector_y, data): #easily call linear regression method
    #input: two vectors (vector_x, vector_y), showing correlating two vectors on the plane.
    #output: calculated result of linear regression as y = (w)x+(b)
    #errors: wrongful type of input, wrongful vector size, wrongful type inside vector
    #side effects and known faults not found yet
    model = LinearRegression() #define the model
    model.fit(vector_x, vector_y) #fit into linear regression model

    # Set figure to be none
    figure = None
    

    return model, figure # Return the model

# Call Logisitcs Regression 
# input: two vectors x and y, data containing parameters
# output: model for logistic regression after fitting
# errors: incorrect sizes for vector x and y, params don't exist in data
def LogisiticsRegressionMethod(vector_x, vector_y, data): 
    # Create our model
    model = LogisticRegression(**data)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Next, create a confusion matrix witht the model
    # Predict with model
    predict_y = model.predict(vector_x)

    # Next, create a confusion matrix
    matrix = confusion_matrix(vector_y, predict_y)

    # Next display the image
    confusion_disp = ConfusionMatrixDisplay(confusion_matrix=matrix)
    confusion_disp.plot()

    # Then, get teh figure
    figure = plt.gcf()

    # Return the model and figure
    return model, figure

# Call Decision Tree Regression
# input: two vectors x and y, data containing parameters
def DecisionTreeRegression(vector_x, vector_y, data):
    # Create our model
    model = tree.DecisionTreeRegressor(**data)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Plot the tree
    plot_tree(model)

    # Get the current figure 
    figure = plt.gcf()

    # Return the model and figure
    return model, figure


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



