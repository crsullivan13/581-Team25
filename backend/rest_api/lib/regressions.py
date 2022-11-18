# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction - Junyi
# log: modified Oct 12 - added a demo function to play with test and train size and random state for MNIST classifier - Junyi
# log: modified Oct 18 - Modified Linear Regression to take in params and return model and added both Logistics and Decision Tree Regression - Amith Panuganti
# log: modified Oct 21 - Add more Hyperparameters for Logistics and Decession Tree Regression - Amith Panuganti
# log: modified Nov 6 - Create Metrics for all regressions models
# log: modifited Nov 9 - Started to add MLP Regression and Classifier
# log: modified Nov 15 = Added Naive Bayes Classifcation
# log: modified Nov 16 - Fixed error with plotting multiple plots and modified figures in each model
# log: Added kwarg integration to simplify programming
from sklearn.linear_model import LinearRegression #input linear regression methods
from sklearn.linear_model import SGDClassifier #input linear regression methods
from sklearn.linear_model import LogisticRegression # input logistic regression
from sklearn.neural_network import MLPRegressor
from sklearn.neural_network import MLPClassifier
from sklearn.naive_bayes import GaussianNB
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

    # Add title
    plt.title("Confusion Matrix")

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

    # Add title to tree
    figure = plt.title("Tree")

    # Get the current figure 
    figure = plt.gcf()

    # Return the model and figure
    return model, figure

# Call Decision Tree Classification
def DecisionTreeClassification(vector_x, vector_y, data):
    # Create out model
    model = tree.DecisionTreeClassifier(**data)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Create a new figure and axis
    figure, axis, = plt.subplots(2, 1, figsize=(5,10))

    # The first plot will the the tree, second will be confusion matrix
    # Plot tree
    plot_tree(model, ax=axis[0])

    # Add title to tree
    axis[0].set_title("Decision Tree")

    # Predict with model
    predict_y = model.predict(vector_x)

    # Create confusion matrix
    matrix = confusion_matrix(vector_y, predict_y)

    # Next, display images
    confusion_disp = ConfusionMatrixDisplay(confusion_matrix=matrix)
    confusion_disp.plot(ax=axis[1])

    # Add title to confusion matrix
    axis[1].set_title("Confusion Matrix")

     # Get the current figure 
    figure = plt.gcf()

    # Return the model and figure
    return model, figure

# Call MLP Classifier
def MLPClassification(vector_x, vector_y, data):
    # Create out model 
  
    model = MLPClassifier(**data)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Create a new figure and axis
    figure, axes = plt.subplots(2, 1, figsize=(5,10))

    # The first plot will be loss curve, second will be confusion matrix
    # Have axis take figure
    axes[0].plot(model.loss_curve_)

    # Set title of plot to contain loss, epochs, and loss over epoch
    axes[0].set_xlabel("Epochs")
    axes[0].set_ylabel("Loss")
    axes[0].set_title("Loss Curve")

    # Add grid
    axes[0].grid()

    # Predict with model
    predict_y = model.predict(vector_x)

    # Next, create a confusion matrix
    matrix = confusion_matrix(vector_y, predict_y)

    # Next display the image
    confusion_disp = ConfusionMatrixDisplay(confusion_matrix=matrix)
    confusion_disp.plot(ax=axes[1])

    # Add title to plot
    axes[1].set_title("Confusion Matrix")

     # Get the current figure 
    figure = plt.gcf()

    # Return the model and figure
    return model, figure

# Call MLP Regressor
def MLPRegression(vector_x, vector_y, data):
    # Create out model 
    model = MLPRegressor(**data)

    # Fit the model
    model.fit(vector_x, vector_y)

     # Have axis take figure
    plt.plot(model.loss_curve_)

    # Plot Loss Curve
    # Set title of plot to contain loss, epochs, and loss over epoch
    plt.xlabel("Epochs")
    plt.ylabel("Loss")
    plt.title("Loss Curve")

    # Add grid
    plt.grid()

     # Get the current figure 
    figure = plt.gcf()

    # Return the model and figure
    return model, figure

# Call Gausian Bayes Classification
def GaussianNaiveBayes(vector_x, vector_y, data):
    # Create our model
    model = GaussianNaiveBayes(**data)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Predict the model
    predict_y = model.predict(vector_x)

   # Next, create a confusion matrix
    matrix = confusion_matrix(vector_y, predict_y)

    # Next display the image
    confusion_disp = ConfusionMatrixDisplay(confusion_matrix=matrix)
    confusion_disp.plot()

    # Add title to figure
    plt.title("Confusion Matrix")

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



