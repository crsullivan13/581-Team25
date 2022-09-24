from sklearn.linear_model import LinearRegression
import matplotlib
import json
def LinearMethod(vector_x, vector_y): #easily call linear regression method
    model = LinearRegression() #define the model
    model.fit(vector_x, vector_y)
    w = model.coef_
    b = model.intercept_ # generate linear regression result
    return w, b

