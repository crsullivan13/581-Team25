# deploy.sh by Derrick Quinn
# Handles everything required to deploy main.py to gcloud app engine. Work in progress, will eventually do more than one thing
# log: created Sep 25: added gcloud app deploy

#!/bin/bash

gcloud app deploy # basic "deploy app to gcloud" call that uses the info in app.yaml and cloudbuild.yaml
