"""
Name: MLPDemoFigures.py
Description: Create the figures that will be used in the MLP Demo
Creation Date: 2/28/23
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revision:
    Date: 3/1/23
    Author: Amith Panuganti 
    Description: Created a function that returns a graph for the regression dataset

    Date: 3/22/23
    Author: Amith Panuganti
    Description: Added a function that produces a figure for MLP Demo Part 4 and 
    refactor creation of a figure to be used in multiple functions. 

    Date: 3/23/23
    Author: Amith Panuganti 
    Description: Replace all functinos with one function to create figures for MLP Demo

"""

#Imports
import matplotlib.pyplot as plt # For Plots
import numpy as np
from sklearn.linear_model import LinearRegression #input linear regression methods
from sklearn.linear_model import LogisticRegression # input logistic regression
from scipy.special import expit

# Get all the figures for MLP Demo
def MLPDemo(inputs):
    # Create a figure for MLP Regression Plot
    X = inputs["MLPRegX"]
    Y = inputs["MLPRegY"]

    # Create a scatter plot with X and y
    plt.figure(1)
    plt.scatter(X, Y, color="black")

    # Add Ttile
    plt.grid()

    # Labels
    plt.title("MLP Regression Plot")
    plt.xlabel("X")
    plt.ylabel("Y")

    # Save plt to mlp_reg_figure
    mlp_reg_figure = plt.figure(1)

    # Close Plot 
    plt.close()

        # Get inputs for linear regression
    X = inputs["LinX"]
    Y = inputs["LinY"]

    # Create model for linear regression
    model = LinearRegression()
    model.fit(X, Y)

    # Predict with model
    predict_Y = model.predict(X)

    # Create a scatter plot with X and y
    plt.figure(2)
    plt.scatter(X, Y, color="black")

    # Create plot with X and predict_y
    plt.plot(X, predict_Y, color="blue")

    # Add Ttile
    plt.grid()

    # Labels
    plt.title("Linear Regression Plot")
    plt.xlabel("X")
    plt.ylabel("Y")

    # Save plt to figure
    linear_figure = plt.figure(2)

    # Get inputs for logisitc regression
    X = inputs["LogX"]
    Y = inputs["LogY"]

    # Create model for logistic regression
    log_model = LogisticRegression()

    # Find model
    log_model.fit(X, Y)

    # Next, create linspace
    x_test = np.linspace(min(X), max(X), 50)

    # Create logisitc 
    log_func = expit(x_test * log_model.coef_ + log_model.intercept_)

    # Create a scatter plot with X and y
    plt.figure(3)
    plt.scatter(X, Y, color="black")

    # Graph logistic function
    plt.plot(x_test, log_func, color="blue")

    # Add Ttile
    plt.grid()

    # Labels
    plt.title("Logistic Regression Plot")
    plt.xlabel("X")
    plt.ylabel("Y")

    # Add yticks
    plt.yticks([0.0,1.0])

    # Get figure 
    log_figure = plt.figure(3)
    plt.close()

    # Get figure for MLP Classification Plot
     # Get X and Y for mlp regression
    X = inputs["MLPClassX"]
    Y = inputs["MLPClassY"]

    # Create a scatter plot with X and y
    plt.figure(1)
    plt.scatter(X, Y, color="black")

    # Add Ttile
    plt.grid()

    # Labels
    plt.title("MLP Classification")
    plt.xlabel("X")
    plt.ylabel("Y")
    plt.yticks([0.0,1.0])

    # Save plt to figure
    mlp_class_figure = plt.figure(1)

    # Close Plot 
    plt.close()

    # Save Each Figure
     # Save all figures to results
    results = {
        "mlp_reg_figure":mlp_reg_figure,
        "linear_figure":linear_figure,
        "log_figure":log_figure,
        "mlp_class_figure":mlp_class_figure
    }

    # Return all figures
    return results