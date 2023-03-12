# main.py by Derrick Quinn, Amith Panuganti 
# main.py runs the http server that processes rest api requests

# log: Edited Sep 30: Extended to allow fitting to model 
# log: Edited Oct 5
#           Author: Amith Panuganti 
#           Description: Modfied fit to train model in different python file
# log: Edited Oct 6
#           Auhtor: Amith Panuganti
#           Description: Modified fit again to send paramaters back to front end
#log: Edited Oct 10
#           Author: Amith Panuganti
#           Description: Modified fit to recieve correct paramaters in correct format
# log: Edited Oct 12:
#     Author: Derrick Quinn
#     Description: added fit_predict method to predict on a batch of data
# log: Edited Oct 18:
#     Author: Amith Panuganti
#     Description: Modify /fit to send entire model back to frontend
# log: Edited Oct 23:
#    Author: Derrick Quinn
#    Description: Resolved server error issues and added storage functionality
# log: Edited Oct 31:
#    Author: Derrick Quinn
#    Description: Removed deprecated calls and fixed exception handling
# log: Edited Nov 1:
#    Author: Derrick Quinn
#    Description: Added kwarg integration, enabled returning loss, improved error handling
# log: Edited Nov 6
#	 Author: Amith Panuganti
#    Descript: Added support for fit to return figures
# log: Edidted Dec 4
#     Author: Amith Panuganti
#     Description: Change predict to turn input into numpy array
# log: Edited Jan 18 2022
#     Author: Amith Panuganti
#     Description: Add Route for Decision Tree Demo
# log: Edited Jan 19 2022
#     Author: Amith Panugnti
#     Description: Add 200 status message in Decision Tree Demo
# log: Edited Feb 7 2022
#      Author: Amith Panuganti
#      Description: Added route for logistic regression demo
# log: Edited Feb 23 2022
#      Author: Amith Panuganti
#      Description: Modified a route to handle all demos
#
# log: Edited Feb 26 2023
#     Author: Derrick Quinn
#     Description: Added support for storing multiple models

from lib.communications import PushToFront 
from lib.metrics import loss
import json

# Both modules io and matplotlib will be use to send figure to forntend
import io
import matplotlib
matplotlib.use('Agg')
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

from base64 import encodebytes

from flask import Flask, request, jsonify, make_response
import pickle
from lib.train import trainModel
import firebase_admin
from firebase_admin import credentials, firestore

from datetime import datetime
import numpy as np
#Create flask app
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

auth = credentials.Certificate('team-25-362714-623f2b1f64ab.json')
firebase_admin.initialize_app(auth)
db = firestore.client()
#Create default route, for an easy check of the status of web server
#Not used otherwise
@app.route('/')
@cross_origin()
#input: Nothing
#output: simple success message
def index():
    return "works"

# Create a route for the Decision Tree Demo and its output
@app.route('/decisionTreeDemo', methods=['POST'])
@cross_origin()
#input: request.data: the data to fit the tree
#output: Text of the Decision Tree
#Error: Can occur when dictionary is in incorrect format
#       Error can occur if training fails
def decisionTreeDemo():
    #Run in try block to catch for errors
    try:
        # Load data from request
        data = json.loads(request.data.decode("utf-8"))

        # Get data 
        data = {k: data[k] for k in data if k != "uuid"}

        # Create a model and get both model and decsion tree text
        model, text = trainModel(data)

        # Get loss from metrics
        metric = loss(model, data["X"], data["y"])

        # Store both metric and text in dictionary
        metrics = {
            "loss":metric,
            "tree":text,
        }

        # Make the response
        return make_response(jsonify(metrics), 200)
    # Will check if key in data cannot be access
    except KeyError as e:
        # Make response informing user of error
        return make_response(jsonify({"Invalid key": str(e)}), 500)
    # Will check for an additional errors
    except Exception as e: #Elsewhere
        return make_response(jsonify({"Error":str(e)}),500) #Request failed, return an erro

# Create route for all demos
# For now, is just logistic and mlp demo
@app.route('/Demo', methods=['POST'])
@cross_origin()
    # input: request.data
    # output: json file of metrics
def logisticRegressionDemo():
    # Try catch block
    try:
        # Load data from request
        data = json.loads(request.data.decode("utf-8"))

        # Get data 
        data = {k: data[k] for k in data if k != "uuid"}

        # Create model and get both just get metrics
        _, metrics = trainModel(data)

        # If metrics contains figure, if it does
        if(metrics.get("figure")):
            # Convert figure into byte array
            # Create output to get figures
            output = io.BytesIO()
            FigureCanvas(metrics["figure"]).print_png(output)

		    # Get bytes
            metrics["figure"] = encodebytes(output.getvalue()).decode('ascii')

        # Return metrics
        return make_response(jsonify(metrics))

     # Will check if key in data cannot be access
    except KeyError as e:
        # Make response informing user of error
        return make_response(jsonify({"Invalid key": str(e)}), 500)
    # Will check for an additional errors
    except Exception as e: #Elsewhere
        return make_response(jsonify({"Error":str(e)}),500) #Request failed, return an erro

#Create route for just fitting a model and returning its output
@app.route('/fit', methods=['POST']) #Handle fit (currently linear) model to data 
@cross_origin()
    #input: request.data: the data to fit the model
    #output: w,b : the fitted model
def fit(): 
    # Catch any errors 
    try:	
		# Load data from request
        data = json.loads(request.data.decode("utf-8"))


        uuid = data["uuid"]
        data = {k: data[k] for k in data if k != "uuid"}

		# Create a model and figure get its params
        trained, figure = trainModel(data)

        #Store the model
        user_ref = db.collection(u'Models').document(uuid)

        #Store as default
        user_ref.set({"model": pickle.dumps(trained)})

        # Set bytes to be None
        bytes = None

		# if the figure is not none
        if figure != None:
			# Create output to get figures
            output = io.BytesIO()
            FigureCanvas(figure).print_png(output)

		    # Get bytes
            bytes = encodebytes(output.getvalue()).decode('ascii')

		#Next, create metircs with loss and figure
        metrics = {
			"loss": loss(trained, data["X"], data["y"]),
			"figure" : bytes
		} 

        # Return params back to frontend
        coefs = False 
        if coefs:
            return make_response(jsonify({"w": list(trained.coef_),"b":trained.intercept_}), 200) 
        else:
            return make_response(jsonify(metrics))
        
    except KeyError as e:
        return make_response(jsonify({"Invalid key": str(e)}), 500)
    except Exception as e: #Elsewhere
        return make_response(jsonify({"Error":str(e)}),500) #Request failed, return an error


#TODO change from GET to POST
#route for retrieving all the names of the stored models stored for the user
@app.route('/get_models')
@cross_origin()
def get_models():

    try:
        #TODO get uuid from frontend, then use it to make a query for that users models
        #data = json.loads(request.data.decode("utf-8"))
        #uuid = data["uuid"]

        #create a json object for storing the names of the models
        model_names = {
            "names" : [],
        }
        model_docs = db.collection(u'Models').stream()

        #add all models to the json object
        for doc in model_docs:
            model_names["names"].append(doc.id)
        
        return model_names
    except Exception as e:
        return make_response(jsonify({"Error":str(e)}),500) #Request failed, return an error



#Create route for predicting on the stored model for a user
@app.route('/predict', methods=['POST']) 
@cross_origin()
    #input: request.data - JSONified request data
    #output: y: the prediction data
def predict():
    try:
        # Load data from request
        data = json.loads(request.data.decode("utf-8"))


        # Get the features from data
        X = data["X"]

        # Get the user from data
        user_ref = db.collection(u'Models').document(uuid)

        uuid = data["uuid"]
        ser_model = ""
        if "model_name" in data:
            model_dict = user_ref.get().collection(u'user_models').get().to_dict()
            ser_model = model_dict[data["model_name"]]
        else :
            ser_model = user_ref.get().to_dict()['model']

        #Deserialize the model
        model = pickle.loads(ser_model)
        y = model.predict(X)
            # Return Prediction back to frontend
        return make_response(jsonify({"y":list(y)}), 200) 
        
    except Exception as e:
        return make_response(jsonify({"Error":str(e)}),500) #Request failed, return an error

    
@app.route('/command', methods=['POST']) #Handle running commpands with no responses
@cross_origin()
    #input: request.data: the post request body
    #output: boolean success value
def HandleCommand():
    #Wrap the readcommand function, handle any exceptions that it may have
    try:

        ReadCommand(json.loads(request.data)) #Send data for readcommand
        return jsonify(success=True) #No except, send 200 back
        
    except:
        return jsonify(success=False) #Request failed, return an error
    
#Create entry point for the app engine
if __name__ == "__main__":

    app.run() #Run the app

