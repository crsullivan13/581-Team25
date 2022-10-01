# main.py by Derrick Quinn
# main.py runs the http server that processes rest api requests
# log: created Sep 25: Implements HTTP server that runs on google cloud's app engine

from src.communications import PushToFront, ReadCommand
from flask import Flask, request, jsonify
import json 

#Create flask app
app = Flask(__name__)

#Create default route, for an easy check of the status of web server
#Not used otherwise
@app.route('/')
#input: Nothing
#output: simple success message
def index():
	return "works" 

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

