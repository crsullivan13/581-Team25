# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction - Junyi
# log: modified Oct 12 - added a demo function to play with test and train size and random state for MNIST classifier - Junyi
# log: modified Oct 23 - added a decision tree function and a logistic regression function to make more regressions possible - Junyi
# log: modified Nov 6 - added decision tree save image support, and solved file name conflict problem while reserving for other functions by using uuid module - Junyi
# log: modified Nov 13 - added support for system logging. - Junyi
# log: modified Jan 29 - added KNN on MNIST - Junyi
# log: modified Mar 12 - added tree visual support - Junyi
# log: modified Mar 26 - added pytorch support - Junyi
# log: modified Apr 9 - added Tensorflow written KNNRegressor - Junyi

import sklearn
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LinearRegression #input linear regression methods
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import SGDClassifier #input linear regression methods
from sklearn.datasets import fetch_openml #for MNIST Demo
from sklearn.metrics import accuracy_score # for regression accuracy
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
from ann.visualizer.visualize import ann_viz
import torch
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

class KNNRegressor:
# this is a KNN Regressor Class
  def __init__(self, k):
    # Constructor to initialize number of neighbors to consider
    # input: number of neighbors to consider
    self.k = k

  def fit(self, X_train, y_train):
    # Convert training data to TensorFlow constant
    # input: x and y training data
    self.X_train = tf.constant(X_train)
    self.y_train = tf.constant(y_train)

  def predict(self, X_test):
    #input: test x vector, output: predicted y test vector.
    # Calculate distances between test and training data
    distances = tf.reduce_sum(tf.square(tf.subtract(X_test, self.X_train)), axis=1)
    # Get indices of k nearest neighbors
    _, indices = tf.nn.top_k(-distances, k=self.k)
    # Get labels of k nearest neighbors
    nearest_neighbors = tf.gather(self.y_train, indices)
    # Calculate mean of labels to make prediction
    y_pred = tf.reduce_mean(nearest_neighbors, axis=1)
    # Return predicted values
    return y_pred.numpy()


#print(DecisionTree([[1,2], [3,4], [5,6]], [6,7,8], [[1,2], [3,4], [5,6]], [6,7,8]))

#print(MNIST_SGDDemo(0.5, 42)) - for testing
#print (MNIST_KNNDemo(0.2))



