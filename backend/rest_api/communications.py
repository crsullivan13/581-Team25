# communications.py by Junyi Zhao
# communications.py should be including all methods to talk with front end when finished. 
# log: created Sep 25 - includes a basic json output method for the group to discuss with json files, read method still under construction
import json
def PushToFront(toPath:str, type: str, subtype: str, returnVal): #push a json file for front end to read
    #input: toPath - json save path, type - a string telling the front end the type of work, subType - a string telling the front end the subtype of the work, returnVal - a vector containing all returned value from the back end.
    #output: a json file including everything front end want to know
    #errors: invalid path, wrongful type of input, vectors will be discussed later but wrongful vector size can be error
    #side effects and known faults not found yet
    value = {#output value
        "type": type, #what type (regression, dimension, etc)
        "subtype": subtype, #subtype (LinearRegression, Logistical Regression, etc)
        "returning value": returnVal #the value within
    }
    f = open (toPath, "w")#open the file and dump json
    json.dump(value, f, indent = 6)#dump json file
    f.close() #close the file

def ReadCommand (commandCode): #read command and call the proper function when asked. Still under construction
    #input: commandCode: commands from command line
    #output: runs the proper function. no output.

    return

#test code: PushToFront(toPath="./example.json", type="regression", subtype="linear", returnVal=[123,456])
