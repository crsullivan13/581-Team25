# main.py by Derrick Quinn
# main.py runs the http server that processes rest api requests
# log: Edited Oct 12: Extended to allow

from communications import PushToFront, ReadCommand
import json
from regressions import LinearMethod
from flask import Flask, request, jsonify, make_response

#Create flask app
app = Flask(__name__)

#Create default route, for an easy check of the status of web server
#Not used otherwise
@app.route('/')
#input: Nothing
#output: simple success message
def index():
	return "works" 

#Create route for fitting a model and predicting it on a batch of data
@app.route('/fit_predict', methods = ['POST']) #Fit model and predict on a batch of data
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

	except:
		return jsonify(success= False)



#Create route for just fitting a model and returning its output
@app.route('/fit', methods=['POST']) #Handle fit (currently linear) model to data 
	#input: request.data: the data to fit the model
	#output: w,b : the fitted model
def fit(): 
	try:
		data = json.loads(request.data.decode("utf-8"))

		X = data["X"]
		y = data['y']
		w,b = LinearMethod(X,y)
		
		return make_response(jsonify({"w": str(w), "b": str(b)}), 200,) 
		
	except:
		return jsonify(success=False) #Request failed, return an error
	
@app.route('/command', methods=['POST']) #Handle running commpands with no responses
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

