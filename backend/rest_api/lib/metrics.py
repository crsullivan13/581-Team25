
# metrics.py by Derrick Quinn
# Handles generation of metrics and similar data for api
# log: Edited Oct 31:
#    Author: Derrick Quinn
#    Description: Initial creation, handles evaluation of model 
# log: Edited 12/4
#    Author : Amith Panuganti
#    Description: Handel case if mse if numpy
import numpy as np
from sklearn.metrics import *
import json
import sys


# Compute loss for a model
def loss(model, X, y):
    squares = [(p_i - y_i)**2 for p_i, y_i in zip(model.predict(X), y)]

    mse = sum(squares)/len(X)
    
    # If type of mse is numpy.ndarray
    if(type(mse) == np.ndarray):
        # Convert mse to float
        mse = mse[0]

    return mse


def make_metric_JSON_regress(model, X, y):
    m_y  = model.predict(X)
    m_metrics = {
        "explained_variance_score" : float(explained_variance_score(y, m_y)),
        "max_error" : float(max_error(y, m_y)),
        "mean_pinball_loss": float(mean_pinball_loss(y, m_y)),
        "verbose": "",

        "accuracy_score" : "",
        "average_precision_score": "",
        "hamming_loss": "",
        "figure": 0,
    }
    return m_metrics

def make_metric_JSON_classif(model, X, y):
    m_y  = model.predict(X)
    m_metrics = {
        "explained_variance_score" : "",
        "max_error" : "",
        "mean_pinball_loss": "",

        "accuracy_score" : accuracy_score(y, m_y),
        "average_precision_score": average_precision_score(y, m_y),
        "hamming_loss": hamming_loss(y, m_y),
        "verbose": "",
        "figure": 0,
    }
    return m_metrics