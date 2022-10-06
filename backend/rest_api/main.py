# main.py by Derrick Quinn, Amith Panuganti 
# main.py runs the http server that processes rest api requests
# log: created Sep 25: Implements HTTP server that runs on google cloud's app engine
# log: Edit Oct 1: Fixed erros with app.route and json
# log: Edit Oct 4: Focus on getting input from frontend to backend for training Author: Amith Panuganti 

from src.communications import PushToFront, ReadCommand
from flask import Flask, request, jsonify

# Import secure_filename to secure files to be saved in directory
from werkzeug.utils import secure_filename

import json 
# Import os to get directory and save files to directory
import os

# Create path to upload folder whici will contian train files
UPLOAD_FOLDER = os.getcwd() + "/train_files"

# Create list of allowed extensions for data file
ALLOWED_EXTENSIONS = {"csv"}

#Create flask app
app = Flask(__name__)

# Congiure upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
	
#Create route to handle training
@app.route('/training', methods=['POST'])
#input: request.files
#output: Success Message and that training is complete
#error: Check file types
def HandleTraining():
	#Check if the hyperparameters and data files are in request.files
	# If hyperparameters are not in request files
	if 'hyperparam' not in request.files:
		return jsonify(success=False)
	# If the file data is not in request.files
	elif 'data' not in request.files:
		return jsonify(success=False)
	
	# Get the files for hyperparameters and data
	hyperParamFile = request.files['hyperparam']
	dataFile = request.files['dataFile']

	# Check if hyperParamFile is the correct data type
	if "txt" != hyperParamFile.filename.rsplit(".", 1)[1]:
		return jsonify(success=False)
	
	# Check if dataFile have correct data type
	if dataFile.filename.rsplit(".", 1)[1] not in ALLOWED_EXTENSIONS:
		return jsonify(sucess=False)

	# Next, secure the names of both files
	hyperParamFileName = secure_filename(hyperParamFile.filename)
	dataFileName = secure_filename(dataFile.filename)

	# Save both files to both folders
	hyperParamFile.save(os.path.join(app.config['UPLOAD_FOLDER'], hyperParamFileName))
	dataFileName.save(os.path.join(app.config['UPLOAD_FOLDER'], dataFileName))


#Create entry point for the app engine
if __name__ == "__main__":

	app.run() #Run the app

