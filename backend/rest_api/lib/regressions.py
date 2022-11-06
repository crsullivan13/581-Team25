# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction - Junyi
# log: modified Oct 12 - added a demo function to play with test and train size and random state for MNIST classifier - Junyi
# log: modified Oct 18 - Modified Linear Regression to take in params and return model and added both Logistics and Decision Tree Regression - Amith Panuganti
# log: modified Oct 21 - Add more Hyperparameters for Logistics and Decession Tree Regression - Amith Panuganti
# log: modified Nov 6 - Create Metrics for all regressions models
import matplotlib.pyplot as plt # For Plots
from sklearn.linear_model import LinearRegression #input linear regression methods
from sklearn.linear_model import SGDClassifier #input linear regression methods
from sklearn.linear_model import LogisticRegression # input logistic regression
from sklearn import tree # For decision tree
from sklearn.datasets import fetch_openml #for MNIST Demo
from sklearn.metrics import accuracy_score, confusion_matrix, ConfusionMatrixDisplay # for regression accuracy and confusion matrix
from sklearn.model_selection import train_test_split # to spilt test data
from sklearn.tree import plot_tree # To plot decision trees
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
    # Get the following params for data
    # penalty, regulatriztion coefficient, and bias
    # Default: "l2"
    # Values: "l1", "l2", "elasticnet", "none"
    penalty = data["penalty"]

    # Default: False
    # Values: Bool True or False
    # Can only set true if solver is "liblinear" and penalty is "l2"
    dual = data["dual"]

    # Default: 0.00001
    # Values: Positive Float
    tol = data["tol"]

    # Default: 1.0
    # Values: Positive Float
    C = data["C"]

    # Default: True
    # Values: True or False
    fit_intercept = data["fit_intercept"]

    # Default: 1
    # Values: Any Float
    # Change only be used if solver is lilinear and fit_intercept is true
    intercept_scaling = data["intercept_scaling"]

    # Default: None
    # Values: None, "balanced", dict in format {class_label: weight} with weight being positive float
    class_weight = data["class_weight"]

    # Default: None
    # Values: None, Int form 0 to 42, numpy.random.randomstate
    # Can only be used when solver is sag, saga, or liblinear
    random_state = data["random_state"]

    # Default: "lbfgs"
    # Values: "newton-cg", "lbfgs", "liblinear", "sag", "saga"
    # Can only only be used based on chosen penalty
    # none: newton-cg, lbfgs, sag, saga
    # l1: liblinear, elasticnet
    # l2 - newton-cg, lbfgs, liblinear, sag, saga
    # elasticnent - saga
    solver = data["solver"]

    # Default: 100
    # Value: Positive Int greater than 0
    max_iter = data["max_iter"]

    # Default: "auto"
    # Value: "auto", "ovr", "multinomial"
    multi_class = data["multi_class"]

    # Default: 0
    # Value: 0 or any positive integer
    # Can only be used if solver is liblinear or lbfgs
    verbose = data["verbose"]

    # Default: False
    # Value: True or False
    warm_start = data["warm_start"]

    # Default: None
    # Value: Number of CPU Cores. None means 1 and -1 means all processors
    # Can only be used if mult_class is ovr and solver is not liblinear
    n_jobs = data["n_jobs"]

    # Default: None
    # Value: float 0.0 to 1.0
    # Can only be used if penalty is elasticnet
    l1_ratio = data["l1_ratio"]

    # Create our model
    model = LogisticRegression(penalty=penalty, dual=dual, tol=tol, C=C, fit_intercept=fit_intercept, intercept_scaling=intercept_scaling, class_weight=class_weight, random_state=random_state, solver=solver, max_iter=max_iter, multi_class=multi_class, verbose=verbose, warm_start=warm_start, n_jobs=n_jobs, l1_ratio=l1_ratio)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Next, create a confusion matrix witht the model
    # Predict with model
    predict_y = model.predict(vector_x)

    # Next, create a confusion matrix
    confusion_matrx = confusion_matrix(vector_y, predict_y)

    # Next display the image
    confusion_disp = ConfusionMatrixDisplay(confusion_matrix, model.classes_)

    # Next, get the figure for confusion_disp
    figure = confusion_disp

    # Return the model and figure
    return model, figure

# Call Decision Tree Regression
# input: two vectors x and y, data containing parameters
def DecisionTreeRegression(vector_x, vector_y, data):
    # Get the following param form data
    # criterion, max_depth, min_samples_leaf, ccp_alpha, min_samples_split
    # Default : "squared_error"
    # Values : “squared_error”, “friedman_mse”, “absolute_error”, “poisson”
    criterion = data["criterion"]

    # Default: "best"
    # Values: “best”, “random”
    splitter = data["splitter"]

    # Deafult: None
    # Values: None, positive int greater than or equal to 1
    max_depth = data["max_depth"]

    # Default: 2
    # Values: Int greater than or equal to 2
    min_samples_split = data["min_samples_split"]

    # Default: 1
    # Values: Int greater than or equal to 1
    min_samples_leaf = data["min_samples_leaf"]

    # Default: 0.0
    # Values: Float, 0.0 to 1.0
    min_weight_fraction_leaf = data["min_weight_fraction_leaf"]

    # Default: None
    # Values : Int, greater than 1, Strings {"auto", "sqrt", "log2"}
    max_features= data["max_features"]

    # Default: None
    # Values: None, Int, from 0 to 42, numpy.random.randomstate
    random_state= data["random_state"]

    # Default: None
    # Values: None: Int greater than 0
    max_leaf_nodes = data["max_leaf_nodes"]

    # Default: 0.0
    # Values: float 0.0 to 1.0
    min_impurity_decrease = data["min_impurity_decrease"]

    # Default: 0.0
    # Values: Non-Negative Float 0.0 to 1.0
    ccp_alpha = data["ccp_alpha"]

    # Create our model
    model = tree.DecisionTreeRegressor(criterion=criterion, splitter=splitter, max_depth=max_depth, min_samples_leaf=min_samples_leaf, min_samples_split=min_samples_split, ccp_alpha=ccp_alpha, min_weight_fraction_leaf=min_weight_fraction_leaf, max_features=max_features, random_state=random_state, max_leaf_nodes=max_leaf_nodes, min_impurity_decrease=min_impurity_decrease)

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



