import json
from flask import Flask, request, jsonify
app = Flask(__name__)
@app.route('/')
def index():
	return json.dumps({"hello": "world"})

@app.route('/create_model', methods = ['POST'])
def create_model():
	data = json.loads(request.data)
	print(data)
	return "hello world"

app.run()
