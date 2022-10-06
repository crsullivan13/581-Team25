# main.py by Derrick Quinn, Amith Panuganti 
# main.py runs the http server that processes rest api requests
# log: Edited Sep 30: Extended to allow fitting to model 

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


@app.route('/fit', methods=['POST']) #Handle fit (currently linear) model to data 
def fit(): 
	try:
		data = json.loads(request.data.decode("utf-8"))
		print(data)

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

