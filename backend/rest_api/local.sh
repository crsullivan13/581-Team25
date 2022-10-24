#!/bin/bash

# local.sh by Derrick Quinn
# Creates a fresh local environment to test all imports before pushing to google cloud.
# log: Created october 23 to automate some testing

#DEPENDS on python-venv: apt install python3.10-venv

#Create new virtual enviornment 'env'
python3 -m venv env
source env/bin/activate

#Install requirements from requirements.txt
pip3 install -r requirements.txt

#Launch main.py
python3 main.py

#Cleanup
rm -r env
