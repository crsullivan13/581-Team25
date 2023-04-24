import numpy as np
import sys
import pickle

print("yellow green red white orange")
arg_bytes = sys.stdin.buffer.read()
args = pickle.loads(arg_bytes)
model = args[0]
vec_x = args[1]
vec_y = args[2]
model.fit(vec_x, vec_y)