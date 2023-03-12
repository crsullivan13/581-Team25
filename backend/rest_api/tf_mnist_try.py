#Tensorflow proof-of-concept in the server - by Junyi Zhao
# Feb 26 - Creation. This is a Proof that if the TF model can run on the Server. 
# A basic MNIST training on the server
import tensorflow as tf # import tf
import tensorflow_datasets as tfds #import datasets
(ds_train, ds_test), ds_info = tfds.load( # load dataset
    'mnist',
    split=['train', 'test'],
    shuffle_files=True,
    as_supervised=True,
    with_info=True,
)
def normalize_img(image, label): # from image to label
  """Normalizes images: `uint8` -> `float32`."""
  return tf.cast(image, tf.float32) / 255., label 
#set training parameters
ds_train = ds_train.map( 
    normalize_img, num_parallel_calls=tf.data.AUTOTUNE)
ds_train = ds_train.cache()
ds_train = ds_train.shuffle(ds_info.splits['train'].num_examples)
ds_train = ds_train.batch(128) #set train batch as 128
ds_train = ds_train.prefetch(tf.data.AUTOTUNE)
ds_test = ds_test.map(
    normalize_img, num_parallel_calls=tf.data.AUTOTUNE)
ds_test = ds_test.batch(128) #set test batch
ds_test = ds_test.cache()
ds_test = ds_test.prefetch(tf.data.AUTOTUNE)
model = tf.keras.models.Sequential([ #set tensorflow model
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dense(10)
])
model.compile( #compile TF model
    optimizer=tf.keras.optimizers.Adam(0.001),
    loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
)

model.fit( #fit model into the data
    ds_train,
    epochs=6,
    validation_data=ds_test,
)
