# communications.py by Junyi Zhao
# communications.py should be including all methods to talk with front end when finished. 
# log: created Sep 25 - includes a basic json output method for the group to discuss with json files, read method still under construction
# log: modified Oct 23 - added prototype of reading arguments by command line. Rest of the function still TBD - Junyi Zhao
# log: modified Dec 4 - added reading features for json - Junyi Zhao
import json #for json output
import sys #to read in arguments
def PushToFront(toPath:str, type: str, subtype: str, returnVal, path): #push a json file for front end to read
    #input: toPath - json save path, type - a string telling the front end the type of work, subType - a string telling the front end the subtype of the work, returnVal - a vector containing all returned value from the back end. path: can be empty, just in case a larger file is needed, it takes the path towards the large file
    #output: a json file including everything front end want to know
    #errors: invalid path, wrongful type of input, vectors will be discussed later but wrongful vector size can be error
    #side effects and known faults not found yet
    if(path != None):
        try: #try if stored file path correct
            trypath = open (path, "r") #try it
        except:#if not
            raise FileNotFoundError ("File Path Error!")#raise error and halt function
    value = {#output value
        "type": type, #what type (regression, dimension, etc)
        "subtype": subtype, #subtype (LinearRegression, Logistical Regression, etc)
        "returnvalue": returnVal, #the value within
        "extra file": path #extra file path
    }
    if (toPath[-5:] != ".json"): # check if file name ends in .json
        raise AttributeError("wrong file type to save!")#if not raise error
    f = open (toPath, "w")#open the file and dump json
    json.dump(value, f, indent = 6)#dump json file
    f.close() #close the file

def ReadArguments(): # read system arguments to run proper commands
    #input: no, because it is read directly from the command line
    #output: for now, print all the arguments but no output. however, in the future, print will be changed to the proper command
    #errors: invalid command (since our call is not set yet, it's TBD)
    #does not contain any side effects
    arguments = sys.argv #get command calls
    print (arguments) #print it for now
    return #placeholder return

def ReadJson(fromPath: str): # read json files from system
    #input: a json file's path, python cannot check file integrity
    #output: the data inside
    #possible errors: wrong file or wrong path
    #does not contain any side effect
    f = open (fromPath) #from json file path, read json
    data = json.load (f) #load data from json
    f.close() #close the file
    return data #return data

#test code: ReadArguments()
#test code: PushToFront(toPath="./example.json", type="regression", subtype="linear", returnVal=[123,456])