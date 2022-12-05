
# metrics.py by Derrick Quinn
# Handles generation of metrics and similar data for api
# log: Edited Oct 31:
#    Author: Derrick Quinn
#    Description: Initial creation, handles evaluation of model 
# log: Edited 12/4
#    Author : Amith Panuganti
#    Description: Handel case if mse if numpy
import numpy as np

# Compute loss for a model
def loss(model, X, y):
    squares = [(p_i - y_i)**2 for p_i, y_i in zip(model.predict(X), y)]

    mse = sum(squares)/len(X)
    
    # If type of mse is numpy.ndarray
    if(type(mse) == np.ndarray):
        # Convert mse to float
        mse = mse[0]

    return mse
