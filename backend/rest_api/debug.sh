
# debug.sh by Derrick Quinn
# Does everything that "deploy.sh" does, but listens for errors as well
# log: created Sep 30: added "listen for errors line" 

#!/bin/bash

gcloud app deploy # basic "deploy app to gcloud" call that uses the info in app.yaml and cloudbuild.yaml
gcloud app logs tail -s default # listen for errors
