# visuals.py by Junyi Zhao
# visuals.py should be including all methods to turn a csv file into an animation. 
# log: created Feb 12 - includes a basic linear regression video code
from matplotlib import pyplot as plt # we use matplotlib for animation
from matplotlib import animation
from matplotlib.animation import FuncAnimation
from sklearn.linear_model import LinearRegression
import numpy as np # numpy input
import pandas as pd #pandas input
import uuid #uuid for file output
import logging # system logging

def LinearModel(filename: str): #a very basic linear regression model to video
    # input: csv file path, it should include an X and an Y
    # output: a animated plot adding points and changing line
    # errors: wrong file path, X and Y not found
    # side effects and known faults not found yet
    df = pd.read_csv(filename) #read csv
    df.dropna(subset=['X', 'Y'], inplace=True) #drop rows with NaN for now
    x = df['X'].to_numpy().reshape(-1, 1) #transform x
    y = df['Y'].to_numpy().reshape(-1, 1) #transform y
    plt.scatter(x, y, c='g', label='X vs Y') # draw scatterplot
    plt.legend() #add legend
    plt.show() # take a look for now
    x_data = [] #add x data
    y_data = [] #add y data
    fig, ax = plt.subplots() #add subplots
    ax.set_xlim(0, 250) #set frame x size
    ax.set_ylim(0, 250) #set frame y size
    scatter, = ax.plot([], [], 'go', label='X vs Y')#add scatter
    line, = ax.plot([], [], 'r', label='Linear Regression') #add line
    ax.legend() #add legend
    reg = LinearRegression() #add linear regression line
    def oneFrame(num): #set one frame plot
        # Adding data
        x_data.append(x[num]) #add one plot on x
        y_data.append(y[num]) #add one plot on y
        x_train = np.array(x_data).reshape(-1, 1) # set train to current x
        y_train = np.array(y_data).reshape(-1, 1) # set train to current y
        reg.fit(x_train, y_train) #fit linear regression map
        scatter.set_data((x_data, y_data)) # set the scatterplot
        line.set_data((list(range(200)), reg.predict(np.array([entry for entry in range(200)]).reshape(-1, 1)))) #set the line
    anim = FuncAnimation(fig, oneFrame, frames=len(x), interval=20) #make the animation
    plt.show()#show the plot

