"""
Name: tfModel.py
Description: Stores class for tensorflow model
Programmers: Amith Panuganti
Creation Date: 11/29/22
Preconditions: None
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
Revisions
    Date: 11/30/22
    Author: Amith Panuganti
    Description: Create class for SeqModel
    Date 12/2/22
    Author: Amith Panuganti
    Description: Fix several bugs in tfModel
"""

#Import tensorflow 
import tensorflow as tf
import numpy
import matplotlib.pyplot as plt

# A dictionary containing all layers
modelLayers = {
    "Dense": tf.keras.layers.Dense
}

# A dictionary containing all loss functions
lossFunctions = {
    "sparse categorical cross entropy":tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    "mean squared error": tf.keras.losses.MeanSquaredError()
}

# A dictionary containing all optimizer functions
optimizerFunctions = {
    "SGD": tf.keras.optimizers.SGD,
    "Adam": tf.keras.optimizers.Adam,
}

# This Model will allow different layers to be able to be added 
# to a model rather than a predetermined model
class SeqModel():
    # Constructor
    # Parmas: 
    #         features - Inputs for model training
    #         labels - Labels for model training
    #         data - Arguments for model 
    #Conditions:
    #  data must be in the following form
    #  data = {type: "regression", "classification",
    #          layers: [{type: value, arg1: value ... argN:value}, ..., {type: value, arg1: value, ... argN:value}]
    #           loss: value
    #           optimizer: {"type": value, arg1: value, ..., argN: value}
    #           }
    # 
    # Errors:
    # A type of model does not exist, will be run time errror
    # A key from data does not match 
    # Labels are in wrong format if type if classifcation
    def __init__(self, features, labels, data):
        # Create a new sequential model
        self.model = tf.keras.Sequential()

        # Get type 
        self.type = data["type"]

        # Next, get the layers from data
        layers = data["layers"]
      
        # Next, the get the shape of features
        input_shape = tf.shape(features[0])
        

        # Create a input layer with input_shape
        input_layer = tf.keras.layers.Input(input_shape)

        # Add input layer to layers
        self.model.add(input_layer)

        # Loop through each layer in layers
        for layer in layers:
            # Get the layer type
            type = layer["type"]

            # Get the args of the layer
            kwargs = {k: layer[k] for k in layer if k != "type"}

            # Next, get the layer
            newLayer = modelLayers[type]

            # Add args to newLayer
            newLayer = newLayer(**kwargs)

            # Finally, add model to model
            self.model.add(newLayer)
  
        # Next, create output layer
        output_layer = None

        # If type is regression
        if self.type == "regression":
            # Set output_layer to be dense 1
            output_layer = tf.keras.layers.Dense(1)
        # Otherwise, if type if "classification
        elif self.type == "classification":

            # Get max value
            max_value = labels.max()
            
            # Otherwise, labels are valid
            # Create output layer with max_value+1
            output_layer = tf.keras.layers.Dense(max_value+1)
        # Otherwise if type does not exist
        else:
            # Raise error
            raise RuntimeError("Type of model does not exist")
 
      
        # Add output layer to model
        self.model.add(output_layer)

        # Next, get the loss 
        self.lossFn = lossFunctions[data["loss"]]

        # Next, get the optimizer
        optimizerData = data["optimizer"]

        # Get the type of opimizer
        optimizerType = optimizerData["type"]

        # Get the args for optimizers
        optimizerArgs = {k: optimizerData[k] for k in optimizerData if k != "type"}

        # Get optimizer function
        self.optimizerFn = optimizerFunctions[optimizerType]

        # Set optimizer function with its arguments
        self.optimizerFn = self.optimizerFn(**optimizerArgs)

    # Train the model
    # Params: features, labels, data
    # Errors: If batch size is greater than features
    # If data does not contain correct keys
    def fit(self, features, labels, data):
        # Firstly, compile the model
        self.model.compile(optimizer=self.optimizerFn, loss=self.lossFn, metrics=['accuracy'])

        # Next, fit the model with features, labels, and data
        history = self.model.fit(x=features, y=labels, batch_size=data["batch_size"], epochs=data["epochs"])
        plt.plot(history.history["accuracy"])
        figure = plt.gcf()

        return figure

    # Predict the model
    # Params: predict
    def predict(self, features):
        # Get result of prediction
        results = self.model.predict(features)

        # If type is classifcation
        if self.type == "classification":
            # Get arg max of results
            results = numpy.argmax(results, axis=1, keepdims=True)
            

        # Return results
        return results

    



            
        

