# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction - Junyi
# log: modified Oct 12 - added a demo function to play with test and train size and random state for MNIST classifier - Junyi
# log: modified Oct 23 - added a decision tree function and a logistic regression function to make more regressions possible - Junyi
# log: modified Nov 6 - added decision tree save image support, and solved file name conflict problem while reserving for other functions by using uuid module - Junyi
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
def LinearMethod(vector_x, vector_y): #easily call linear regression method
    # input: two vectors (vector_x, vector_y), showing correlating two vectors on the plane.
    # output: calculated result of linear regression as y = (w)x+(b)
    # errors: wrongful type of input, wrongful vector size, wrongful type inside vector
    # side effects and known faults not found yet
    model = LinearRegression() #define the model
    model.fit(vector_x, vector_y) #fit into linear regression model
    w = model.coef_ #as wx+b
    b = model.intercept_ #generate linear regression result
    save_id = uuid.uuid1().hex # create a random save id
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

def DecisionTree (x_train, y_train, x_test, y_test): #a function to play with decision tree and generate the tree and test prediction score
    # input: training data and testing data. x and y should have equal amount of rows.
    # output: the tree itself, description of the tree, and the test accuracy score, exclusive running id. it also returns a tree.png to the file system
    # errors: wrongful size (not same amount of rows), wrongful type of input
    # side effects and known faults not found yet
    clf = DecisionTreeClassifier() #set a Decision Tree Classifier
    clf.fit(x_train, y_train) #fit the data into the tree
    y_pred = clf.predict(x_test) #generate prediction data
    plt.figure(figsize=(20,20)) # prepare the plot canvas
    tree.plot_tree(clf) # plot the tree in the 
    save_id = uuid.uuid1().hex # create a random save id
    image_name = "./tree_" + save_id + ".png" # to ensure every time the id is different
    plt.savefig(image_name) # save the plot as tree.png
    return clf, sklearn.tree.export_text(clf), sklearn.metrics.accuracy_score(y_test, y_pred), save_id #return the tree itself, description of the tree, and the test accuracy score. ID is also included

def LogisticMethod (x, y, penalty = 'l2', dual = False, tol = 0.001, c = 1.0, fit_intercept = True, intercept_scaling = 1, class_weight = None, random_state = None, solver = 'lbfgs', max_iter = 100, multi_class = 'auto', verbose = 0, warm_start = False, n_jobs = None, l1_ratio = None): #easily? call logistic regression method
    # input: x, y, and all other parameters of logistic regression
    # output: the logistic tree, for now (others TBD), exclusive running id
    # errors: types of parameters, wrongful input size (not same amount of rows)
    # side effects unknown yet
    save_id = uuid.uuid1().hex # create a random save id
    clf = LogisticRegression (penalty=penalty, dual=dual, tol=tol, C=c, fit_intercept=fit_intercept, intercept_scaling=intercept_scaling, class_weight=class_weight, random_state=random_state, solver=solver, max_iter=max_iter, multi_class=multi_class, verbose=verbose, warm_start=warm_start, n_jobs=n_jobs, l1_ratio=l1_ratio).fit(x,y) #run the parameters into the regression
    return clf, save_id #return decision tree and function ID

#print(DecisionTree([[1,2], [3,4], [5,6]], [6,7,8], [[1,2], [3,4], [5,6]], [6,7,8]))

#print(MNIST_SGDDemo(0.5, 42)) - for testing
#print (MNIST_SGDDemo(0.2))



