#!/bin/bash

echo "Beginning local testing"
curl -d '{"X": [[1,2,3]], "y": [1], "uuid": "drktest", "model": "Linear Regression"}' -H 'Content-Type: application/json' -X POST 127.0.0.1:5000/fit


curl -d '{"X": [[1,2,3],[4,5,6]], "y": [1,2], "uuid": "drktest", "model": "Logistic Regression"}' -H 'Content-Type: application/json' -X POST 127.0.0.1:5000/fit


curl -d '{"X": [[1,2,3],[4,5,6]], "y": [1,2], "uuid": "drktest", "model": "Decision Tree Regression"}' -H 'Content-Type: application/json' -X POST 127.0.0.1:5000/fit

curl -d '{"X": [[1,2,3],[4,5,6]], "y": [1,2], "uuid": "drktest", "model": "Decision Tree "}' -H 'Content-Type: application/json' -X POST 127.0.0.1:5000/fit

curl -d '{"X": [[1,2,3]], "y": [1,2], "uuid": "drktest", "model": "Linear Regression"}' -H 'Content-Type: application/json' -X POST 127.0.0.1:5000/fit


curl -d '{"X": [[1,2,3]], "uuid": "drktest"}' -H 'Content-Type: application/json' -X POST 127.0.0.1:5000/predict
