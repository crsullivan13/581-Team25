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
#    Auther: Derrick Quinn
#    Description: Added kwarg integration, enabled returning loss, improved error handling

import base64
from io import BytesIO

from flask import Flask
from matplotlib.figure import Figure

from lib.communications import PushToFront 
from lib.metrics import loss
import json


from flask import Flask, request, jsonify, make_response
import pickle
from lib.train import trainModel
import firebase_admin
from firebase_admin import credentials, firestore

from datetime import datetime

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

# Create a model and get its params
        trained = trainModel(data)
        #Store the model
        user_ref = db.collection(u'Models').document(uuid)

        #Store as default
        user_ref.set({"model": pickle.dumps(trained)})


        metrics = {"loss": loss(trained, data["X"], data["y"]) }


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

@app.route('/metrics/<int:Number>.png', methods = ['GET'])
def graph(Number):
    fig = Figure()
    ax = fig.subplots()
    ax.plot([1, 2])
    # Save it to a temporary buffer.

    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)

    return Response(output.getvalue(), mimetype='image/png')
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

        # Get the model from data
        uuid = data["uuid"]

        #Get the reference to the user's document in firebase
        user_ref = db.collection(u'Models').document(uuid)

        #Read the stored model. If this fails, then we catch the exception
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

