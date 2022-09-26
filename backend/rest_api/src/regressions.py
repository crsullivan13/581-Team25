# regressions.py by Junyi Zhao
# regressions.py should be including all methods to deal with regression calls when finished. 
# log: created Sep 25 - includes a basic linear regression method for the group to discuss with inputs and outputs, others still under construction
from sklearn.linear_model import LinearRegression #input linear regression methods
import matplotlib #just in case for drawing a graph
def LinearMethod(vector_x, vector_y): #easily call linear regression method
    #input: two vectors (vector_x, vector_y), showing correlating two vectors on the plane.
    #output: calculated result of linear regression as y = (w)x+(b)
    #errors: wrongful type of input, wrongful vector size, wrongful type inside vector
    #side effects and known faults not found yet
    model = LinearRegression() #define the model
    model.fit(vector_x, vector_y) #fit into linear regression model
    w = model.coef_ #as wx+b
    b = model.intercept_ #generate linear regression result
    return w, b #return the req'd values

