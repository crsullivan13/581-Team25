# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction - Junyi
# log: modified Oct 12 - added a demo function to play with test and train size and random state for MNIST classifier - Junyi
# log: modified Oct 18 - Modified Linear Regression to take in params and return model and added both Logistics and Decision Tree Regression - Amith Panuganti
# log: modified Oct 21 - Add more Hyperparameters for Logistics and Decession Tree Regression - Amith Panuganti
# log: modified Oct 23 - added a decision tree function and a logistic regression function to make more regressions possible - Junyi
# log: modified Nov 6 - added decision tree save image support, and solved file name conflict problem while reserving for other functions by using uuid module - Junyi
# log: modifited Nov 9 - Started to add MLP Regression and Classifier - Amith Panuganti
# log: modified Nov 13 - added support for system logging. - Junyi
# log: modified Nov 15 - Added Naive Bayes Classifcation - Amith Panuganti
# log: modified Nov 16 - Fixed error with plotting multiple plots and modified figures in each model - Amith Panuganti 
# log: modified Nov 29 - Added Multi Layer Support - Amith Panuganti 
# log: modified Dec 4 - Added Support of Sequential Model - Amith Panuganti 
# log: modified Jan 18 2023 - Added Seperate Function for Decision Tree Demo - Amith Panuganti 
# log: modified Jan 21 2023 - In Decision Tree Demo, used Decision Tree Classifer instead of Decision Tree Regressor - Amith Panuganti
# log: modified Jan 29 - added KNN on MNIST - Junyi
# log: modified Feb 7 2023 - Add part 1 for logisitic regression demo - Amith Panuganti 
# log: modified Feb 9 2023 - Added Part 2 For Logisitic Regression Demo - Amith Panuganti
# log: modified Mar 1 2023 - Added Models For Part 1 for MLP Demo - Amith Panuganti 
# log: modified Mar 12 - added tree visual support - Junyi
# log: modified Mar 26 - added pytorch support - Junyi
import sklearn
from sklearn.tree import DecisionTreeClassifier, plot_tree, export_text 
from sklearn.linear_model import LinearRegression #input linear regression methods
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import SGDClassifier #input linear regression methods
from sklearn.datasets import fetch_openml #for MNIST Demo
from sklearn.metrics import accuracy_score, confusion_matrix, plot_confusion_matrix, ConfusionMatrixDisplay, mean_squared_error  # for regression accuracy
from sklearn.model_selection import train_test_split # to spilt test data
from sklearn import tree #to use all tree functions
import numpy as np #typical numpy import
import matplotlib.pyplot as plt #just in case for drawing a graph
import uuid # to make multiple function calls that saves the same image different in name
import logging # for system logging
from dtreeviz.trees import *
import keras
from keras.models import Sequential
from keras.layers import Dense
from ann_visualizer.visualize import ann_viz
import torch
from sklearn.neural_network import MLPRegressor
from sklearn.neural_network import MLPClassifier
from sklearn.naive_bayes import GaussianNB
from lib.tfModel import SeqModel
from scipy.special import expit # Used for logisitc regression demo
import matplotlib #just in case for drawing a graph
import tensorflow as tf 

class KNNClassifier():#this is a KNN Classifier 
    def __init__(self, k=10): # initiation of the class, we set k = 10 for now
        self.k = k # set k
        self.x_train = None # set x
        self.y_train = None # set y
    
    def fit(self,x_train,y_train): # we use fit to load data to be trained
        #this is a data loader so no output. Input: x train and y train
        self.x_train = x_train # load x
        self.y_train = y_train # load y

    def predict(self,x_test): #prediction of label
        # inputs: x data, which is the x original dataset
        # outputs: a bunch of (randomly) predicted dataset
        # errors: can be very not accurate at first times of training.
        # side effects and known faults not found yet
        labels_pred = np.zeros(len(x_test)) # this stores the results to be returned
        for i in range(len(x_test)):
            # np.tile() tiles the same dataset onto one dimension
            # then we reshape it into a new matrix
            X = np.reshape(np.tile(x_test[i], self.x_train.shape[0]),(self.x_train.shape[0], num_pixel)) 
            distance = np.sum(np.square(self.x_train - X), axis=1) # distance = Euculidean Distance ^ 2
            index = heapq.nsmallest(self.k, range(len(distance)), distance.take) # find smallest ks
            label = self.y_train[index] # k labels to be selected
            labels_pred[i] = np.argmax(np.bincount(label)) # count number of appearence of label
        return labels_pred # return it

    def score(self, y_pred, y_test): # connect predicted labels with test
        rate = np.sum(np.array(y_pred == y_test,dtype=np.int32))
        return rate / len(y_test)   # / test_length return, with average


def LinearMethod(vector_x, vector_y): #easily call linear regression method
    # input: two vectors (vector_x, vector_y), showing correlating two vectors on the plane.
    # output: calculated result of linear regression as y = (w)x+(b)
    # errors: wrongful type of input, wrongful vector size, wrongful type inside vector
    # side effects and known faults not found yet
    save_id = uuid.uuid1().hex # create a random save id
    logging.info("Linear Method #" + save_id + " has started!") # log UUID
    model = LinearRegression() #define the model
    model.fit(vector_x, vector_y) #fit into linear regression model
    w = model.coef_ #as wx+b
    b = model.intercept_ #generate linear regression result
    return w, b, save_id #return the req'd values and unique ID

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

def MNIST_SGDDemo(test_size: float, random_state: int = 42):#a demo of MNIST to fetch interest for K-12 students
    # input: percentage to test to let kids know test size and train size's difference and the random state (just in case, not really used)
    # output: the test accuracy score, for students to see how different test size can alter the accuracy of the training
    # errors: wrongful test size - sorted with raising error, wrongful random state - unknown yet
    # side effects and known faults not found yet
    mnist_data = fetch_openml('MNIST_784') # download MNIST vectors from scikit database
    if (test_size >= 1 or test_size <= 0): # find out wrongful test size
        raise IndexError("Please enter a proper test percentage between 0 and 1, not inclusive") # if it happens halt the function and raise error
    x, y = mnist_data['data'], mnist_data['target'] #separate data for fitting
    x_train,x_test,y_train,y_test=train_test_split (x, y, test_size = test_size, random_state = 1) #randomly select some data for training and some for testing by input test size
    mnist_sgd = SGDClassifier(random_state = random_state) # start a SGD classifier, by official demo. let students choose their own random state
    mnist_sgd.fit (x_train, y_train) #fit the tree
    y_predict = mnist_sgd.predict(x_test) #predict the model using the test data
    return accuracy_score(y_predict, y_test) #return predict accuracy percentage

def MNIST_KNNDemo(test_size: float):#a demo of MNIST but with KNN model to provide another way of classfication 
    # input: percentage to test to let kids know test size and train size's difference 
    # output: the test accuracy score, for students to see how different test size can alter the accuracy of the training
    # errors: wrongful test size - sorted with raising error, wrongful random state - unknown yet
    mnist_data = fetch_openml('MNIST_784') # download MNIST vectors from scikit database
    if (test_size >= 1 or test_size <= 0): # find out wrongful test size
        raise IndexError("Please enter a proper test percentage between 0 and 1, not inclusive") # if it happens halt the function and raise error
    x, y = mnist_data['data'], mnist_data['target'] #separate data for fitting
    x_train,x_test,y_train,y_test=train_test_split (x, y, test_size = test_size, random_state = 1) #randomly select some data for training and some for testing by input test size
    k_range = range(1,11) # we set k range as 1-10 for now
    accuracy = [] # accuracy
    for k in k_range:
        classifier = KNNClassifier(k=k) # build classifier with different k
        classifier.fit(x_train, y_train) # fit train
        pred = classifier.predict(x_test) # get prediction score
        result = classifier.score(pred, y_test) # score-->accuracy
        accuracy.append(result) # append accuracy
        print("accuracy:",result) # print result
    return accuracy

# Call Gausian Bayes Classification
def GaussianNaiveBayes(vector_x, vector_y, data):
    # Create our model
    model = GaussianNB(**data)

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

def DecisionTree (x_train, y_train, x_test, y_test): #a function to play with decision tree and generate the tree and test prediction score
    # input: training data and testing data. x and y should have equal amount of rows.
    # output: the tree itself, description of the tree, and the test accuracy score, exclusive running id. it also returns a tree.png to the file system. It also shows a view of the tree. 
    # errors: wrongful size (not same amount of rows), wrongful type of input
    # side effects and known faults not found yet
    save_id = uuid.uuid1().hex # create a random save id
    logging.info("Decision Tree Function #" + save_id + " has started!") # log UUID
    clf = DecisionTreeClassifier() #set a Decision Tree Classifier
    clf.fit(x_train, y_train) #fit the data into the tree
    y_pred = clf.predict(x_test) #generate prediction data
    viz = dtreeviz(clf, x_train, y_train) # generate view of the tree
    plt.figure(figsize=(20,20)) # prepare the plot canvas
    tree.plot_tree(clf) # plot the tree in the matplotlib model
    image_name = "./tree_" + save_id + ".png" # to ensure every time the id is different
    plt.savefig(image_name) # save the plot as tree.png
    viz.view() #output the tree viz
    return clf, sklearn.tree.export_text(clf), sklearn.metrics.accuracy_score(y_test, y_pred), save_id, viz #return the tree itself, description of the tree, and the test accuracy score. ID is also included. New! also returns complete observation of the tree. 

def LogisticMethod (x, y, penalty = 'l2', dual = False, tol = 0.001, c = 1.0, fit_intercept = True, intercept_scaling = 1, class_weight = None, random_state = None, solver = 'lbfgs', max_iter = 100, multi_class = 'auto', verbose = 0, warm_start = False, n_jobs = None, l1_ratio = None): #easily? call logistic regression method
    # input: x, y, and all other parameters of logistic regression
    # output: the logistic tree, for now (others TBD), exclusive running id
    # errors: types of parameters, wrongful input size (not same amount of rows)
    # side effects unknown yet
    save_id = uuid.uuid1().hex # create a random save id
    logging.info("Logistic Method #" + save_id + " has started!") # log UUID
    clf = LogisticRegression (penalty=penalty, dual=dual, tol=tol, C=c, fit_intercept=fit_intercept, intercept_scaling=intercept_scaling, class_weight=class_weight, random_state=random_state, solver=solver, max_iter=max_iter, multi_class=multi_class, verbose=verbose, warm_start=warm_start, n_jobs=n_jobs, l1_ratio=l1_ratio).fit(x,y) #run the parameters into the regression
    return clf, save_id #return decision tree and function ID

def GaussianNaiveBayes (x_train, y_train, x_test, y_test): #a function to play with Gaussian Naive Bayes and generate the test prediction score
    # input: training data and testing data. x and y should have equal amount of rows.
    # output: the model itself, and the test accuracy score, exclusive running id. 
    # errors: wrongful size (not same amount of rows), wrongful type of input
    # side effects and known faults not found yet
    save_id = uuid.uuid1().hex # create a random save id
    logging.info("Naive Bayes Function #" + save_id + " has started!") # log UUID
    clf = GaussianNaiveBayes() #set a Gaussian Naive Bayes Classifier
    clf.fit(x_train, y_train) #fit the data into the model
    y_pred = clf.predict(x_test) #generate prediction data
    return clf, sklearn.tree.export_text(clf), sklearn.metrics.accuracy_score(y_test, y_pred), save_id #return the tree itself, and the test accuracy score. ID is also included

def SeqNetworkCreatePlot(name, listofneurons): # create a Sequential network and output it and its model image
    # input: a string called name of the network, a list of neurons based on [units, activation, kernel_initializer]
    # output: the model and the the image
    # errors: wrongful input type
    # side effects: unknown
    network = Sequential() # new a sequential network
    for neuron in listofneurons: #iterate through the neurons
        network.add(Dense(units= neuron[0], activation = neuron[1],
            kernel_initializer=neuron[2])) # add them
    ann_viz(network, view=True, title=name) # show the network
    return network #return network


def preprocess_data(x, y):
    # input: unprocessed data
    # output:processed data 
    # Normalize the input data
    x_mean = x.mean(dim=0)    # Compute the mean of the input data
    x_std = x.std(dim=0)      # Compute the standard deviation of the input data
    x_normalized = (x - x_mean) / x_std  # Normalize the input data
    
    # Normalize the output data
    y_mean = y.mean(dim=0)    # Compute the mean of the output data
    y_std = y.std(dim=0)      # Compute the standard deviation of the output data
    y_normalized = (y - y_mean) / y_std  # Normalize the output data
    return x_normalized, y_normalized, x_mean, x_std, y_mean, y_std

def regression_net(input_dim, hidden_dim, output_dim):
    # Define the layers of the neural network
    # input: input dimensions, hidden dimensions, and output dimensions
    # output: the model
    layers = []
    layers.append(torch.nn.Linear(input_dim, hidden_dim))  # Add a linear layer with input_dim input features and hidden_dim output features
    layers.append(torch.nn.ReLU())                         # Add a ReLU activation function
    layers.append(torch.nn.Linear(hidden_dim, output_dim))  # Add a linear layer with hidden_dim input features and output_dim output features
    
    # Create the neural network using the layers
    model = torch.nn.Sequential(*layers)  # Create a sequential model using the layers
    
    return model
    
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
    
# Call sequential model
def SequentialModel(vector_x, vector_y, data):
    
    # Create the model 
    model = SeqModel(vector_x, vector_y, data)

    # Next, train the model
    figure = model.fit(vector_x, vector_y, data)
    
    # Return the model and figure
    return model,figure
    
# Demo for Decision Tree Regression
def DecisionTreeDemoModel(vector_x, vector_y, data):
    # Create our model
    model = tree.DecisionTreeClassifier(**data)

    # Fit the model
    model.fit(vector_x, vector_y)

    # Get the text of the model
    text = export_text(model)

    # Return both the model and figure
    return model, text
    
# Demo for logistic regression part 1
def LogisticRegressionDemoPart1(vector_x, vector_y, data):
    # Create linear regression model
    model = LinearRegression()

    # Fit data with model
    model.fit(vector_x, vector_y)

    # Predict with model
    predict_y = model.predict(vector_x)

    # Create scatter plot with vector_x and vector_y
    plt.scatter(vector_x, vector_y, color='black')

    # Create plot for vector_x and predict_y
    plt.plot(vector_x, predict_y, color="blue")

    # Add labels
    plt.xlabel("Temperature")
    plt.ylabel("Cold or Hot")
    plt.title("Temperature Plot")

    # Add yticks
    plt.yticks([0.0,1.0])
    
    # Get current figue
    figure = plt.gcf()

    # Caculate loss
    mse = mean_squared_error(vector_y, predict_y)

    # Create dictionary containing figure, mse
    results = {"figure":figure, "loss":mse}

    # Return model and results
    return model, results
    
# Demo for logisitc regression part 2/3
def LogisticRegressionDemoPart2(vector_x, vector_y, data):
    # Create logisitc regression model
    model = LogisticRegression(**data)

    # Fit model on data
    model.fit(vector_x, vector_y)

    #Predict y
    predict_y = model.predict(vector_x)

     # Create scatter plot with vector_x and vector_y
    plt.scatter(vector_x, vector_y, color='black')

    # Next, create linspace
    x_test = np.linspace(min(vector_x), max(vector_x), 50)

    # Create logisitc function
    log_func = expit(x_test * model.coef_ + model.intercept_)

    # Graph logistic function
    plt.plot(x_test, log_func, color="blue")
   
    # Add labels
    plt.xlabel("Temperature")
    plt.ylabel("Cold or Hot")
    plt.title("Temperature Plot")

    # Add yticks
    plt.yticks([0.0,1.0])
    
    # Get current figue
    figure = plt.gcf()

    # Caculate mean square error
    mse = mean_squared_error(vector_y, predict_y)

    # Caculate accuracy
    accuracy = accuracy_score(vector_y, predict_y)

    # Create dictionary containing figure, mse, and accuracy
    results = {"figure":figure, "loss":mse, "accuracy":accuracy}

    # Return model and results
    return model, results

# Demo for Part 1 Front
def MLPDemoPart1Front(vector_x, vector_y, data):
    # Create linear regression model
    model = LinearRegression()

    # Fit data with model
    model.fit(vector_x, vector_y)

    # Predict with model
    predict_y = model.predict(vector_x)

    # Create scatter plot with vector_x and vector_y
    plt.scatter(vector_x, vector_y, color='black')

    # Create plot for vector_x and predict_y
    plt.plot(vector_x, predict_y, color="blue")

    # Add labels
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.title("Linear Regression Weakness")
    plt.grid()

     # Get current figue
    figure = plt.gcf()

    # Caculate loss
    mse = mean_squared_error(vector_y, predict_y)

    # Create dictionary containing figure, mse
    results = {"figure":figure, "Loss":mse}

    # Return model and results
    return model, results

# Demo for MLP Demo Part 1 Middle
def MLPDemoPart1Middle(vector_x, vector_y, data):
    # Create logisitc regression model
    model = LogisticRegression(**data)

    # Fit model on data
    model.fit(vector_x, vector_y)

    #Predict y
    predict_y = model.predict(vector_x)

     # Create scatter plot with vector_x and vector_y
    plt.scatter(vector_x, vector_y, color='black')

    # Next, create linspace
    x_test = np.linspace(min(vector_x), max(vector_x), 50)

    # Create logisitc function
    log_func = expit(x_test * model.coef_ + model.intercept_)

    # Graph logistic function
    plt.plot(x_test, log_func, color="blue")

    # Add labels
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.title("Logistic Regression Weakness")
    plt.grid()

     # Get current figue
    figure = plt.gcf()

    # Caculate loss
    mse = mean_squared_error(vector_y, predict_y)

    # Caculate accuracy
    accuracy = accuracy_score(vector_y, predict_y)

    # Create dictionary containing figure, mse, and accuracy
    results = {"figure":figure, "Loss":mse, "Accuracy":accuracy}

    # Return results 
    return model, results

#print(DecisionTree([[1,2], [3,4], [5,6]], [6,7,8], [[1,2], [3,4], [5,6]], [6,7,8]))

# Trains a model for MLP Demo Part 4 Front. 
# Input: vector_x - Input Features for Dataset
# Input: vector_y - Input Ouputs for Dataset
# data: Parameters for MLPRegressor
# data = {"hidden_layer_size": (Any Value)}
# Output: results - Dictionary containing the metrics with the entries
#               loss - The best loss the model reached
#               mse - Mean Squared Error between model prediction and actual values
# Output: model - The model itself
def MLPDemoPart4Front(vector_x, vector_y, data):
    # Create MLP Regressor
    model = MLPRegressor(**data)

    # Fit the model on the data
    model.fit(vector_x, vector_y)

    # Get loss of the model
    loss = model.best_loss_

    # Predict with the model
    predict_y = model.predict(vector_x)

    # Get Mean Squared Error
    mse = mean_squared_error(vector_y, predict_y)

    # Save loss and mse to results
    results = {"Loss": loss, "Mean Squared Error": mse}

    # Return results
    return model, results

# Trains a model and output metrics for MLP Demo Part 4 Back
# Input: vector_x - Input Features for Dataset
# Input: vector_y - Input Ouputs for Dataset
# data: Parameters for MLPRegressor
# data = {"hidden_layer_size": (Any Value)}
# Ouput: results - Dictionary containing the metrics with the entries
#         loss - The lowest loss the model reached
#          accuracy - The accuracy of the model with the training data
#          figure - Confusion Matrix to show how the model classify each input
# Ouptut: model - Returns the model itself
def MLPDemoPart4Back(vector_x, vector_y, data):
    # Create MLP Classifier
    model = MLPClassifier(**data)

    # Fit the model on the data
    model.fit(vector_x, vector_y)

    # Get loss of the model
    loss = model.best_loss_

    # Predicit with the model
    predict_y = model.predict(vector_x)

    # Get the accuracy of the model
    accuracy = accuracy_score(vector_y, predict_y)

    # Make a confusion matrix for the model
    matrix = confusion_matrix(vector_y, predict_y)

    # Next display the image
    confusion_disp = ConfusionMatrixDisplay(confusion_matrix=matrix)
    confusion_disp.plot()

    # Add title
    plt.title("Confusion Matrix")

    # Then, get the figure
    figure = plt.gcf()

    # Close the plot
    plt.close()

    # Create dictionary containing the metrics producted
    results = {
        "Loss":loss,
        "Accuracy":accuracy, 
        "figure":figure
    }

    # Return results
    return model, results
    
#print(MNIST_SGDDemo(0.5, 42)) - for testing
#print (MNIST_KNNDemo(0.2))



