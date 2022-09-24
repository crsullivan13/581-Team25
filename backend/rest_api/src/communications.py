import json
def PushToFront(toPath, type, subtype, returnVal): #push a json file for front end to read
    value = {
        "type": type, #what type (regression, dimension, etc)
        "subtype": subtype, #subtype (LinearRegression, Logistical Regression, etc)
        "returning value": returnVal #the value within
    }
    f = open (toPath, "w")#open the file and dump json
    json.dump(value, f, indent = 6)
    f.close()