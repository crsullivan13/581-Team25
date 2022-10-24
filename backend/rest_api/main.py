# main.py by Derrick Quinn, Amith Panuganti 
# main.py runs the http server that processes rest api requests

# log: Edited Sep 30: Extended to allow fitting to model 
# log: Edited Oct 5
# 			Author: Amith Panuganti 
# 			Description: Modfied fit to train model in different python file
# log: Edited Oct 6
#			Auhtor: Amith Panuganti
#			Description: Modified fit again to send paramaters back to front end
#log: Edited Oct 10
#			Author: Amith Panuganti
#			Description: Modified fit to recieve correct paramaters in correct format
# log: Edited Oct 12:
#	 Author: Derrick Quinn
#	 Description: added fit_predict method to predict on a batch of data



from lib.communications import PushToFront, ReadCommand
import json
from lib.regressions import LinearMethod
from lib.train import trainModel
from flask import Flask, request, jsonify, make_response
import firebase_admin
from firebase_admin import credentials, firestore

import pickle
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

#Create route for fitting a model and predicting it on a batch of data
@app.route('/fit_predict', methods = ['POST']) #Fit model and predict on a batch of data
@cross_origin()
	#input: X_train, y_train, X_test
	#output: y_test, the predicted value
def fit_predict():
	try:
		
		data = json.loads(request.data.decode("utf-8"))
		X_train = data["X_train"]
		y_train = data["y_train"]
		X_test = data["X_test"]

		w,b = LinearMethod(X_train, y_train)

		y_test = sum([x_i * w_i for x_i, w_y in zip(X_test, w)])+b

		return make_response(jsonify({"y_test" : str(y_test)}))

	except Exception as e:
		return make_response(jsonify({"Error",e}), 500)



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

# Get the features from data
		X = data["X"]

# Get the labels from data
		y = data['y']

# Get the model from data
		model = data['model']
		user = data['uuid']

# Create a model and get its params
		w,b = trainModel(X, y, model)
		user_ref = db.collection(u'Models').document(uuid)
		user_ref.set({"model": pickle.dumps(model)})

		# Return params back to frontend
		return make_response(jsonify({"w":str(w), "b":str(b)}), 200) 
		
	except Exception as e:
		return make_response(jsonify({"Error",e}),500) #Request failed, return an error

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
		user = data['uuid']

        #Get the reference to the user's document in firebase
		user_ref = db.collection(u'Models').document(uuid)

        #Read the stored model. If this fails, then we catch the exception
		ser_model = user_ref.get().to_dict()['model']

        #Deserialize the model
		model = pickle.loads(ser_model)
		y = model.predict(X)
			# Return Prediction back to frontend
		return make_response(jsonify({"y":y}), 200) 
		
	except Exception as e:
		return make_response(jsonify({"Error",e}),500) #Request failed, return an error

	
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

