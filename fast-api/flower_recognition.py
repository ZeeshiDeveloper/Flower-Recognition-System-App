#importing Liberaries
import numpy as np
import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator


# Data Preprocessing
# Training Image Proccessing
train_datagen = ImageDataGenerator(
        rescale=1./255,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True)
training_set = train_datagen.flow_from_directory(
        'training_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')


# Test Image Processing
# class mode is Categorical bcz we have more then two categories (floders) 
# in the case of 2 categories we can use binary class mode.
test_datagen = ImageDataGenerator(rescale=1./255)
test_set = test_datagen.flow_from_directory(
        'test_set',
        target_size=(64, 64),
        batch_size=32,
        class_mode='categorical')


# Building Model 
# convolutional nueral network defined here
cnn = tf.keras.models.Sequential()

# Building Convolutional and Pooling Layer
# Using Max Pool type here
# give atleast two layers for better performance and result
cnn.add(tf.keras.layers.Conv2D(filters=64 , kernel_size=3 , activation='relu' , input_shape=[64,64,3]))
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2,strides=2))
cnn.add(tf.keras.layers.Conv2D(filters=64 , kernel_size=3 , activation='relu' ))
cnn.add(tf.keras.layers.MaxPool2D(pool_size=2 , strides=2))

# improve model accuracy by providing Dropout
cnn.add(tf.keras.layers.Dropout(0.5))

# Next Method if flattened your matrix from MxM matrix to Mx1
# Third layer of CNN (Fully Connected)
cnn.add(tf.keras.layers.Flatten())


# Now there is a concept of Artificial nueral network 
# add Hidden layer
# units defines number of hidden layers
cnn.add(tf.keras.layers.Dense(units=128, activation='relu'))

# Output Layer
# softmax activation function use here bcz output in the form of binary and maximum then 2 
# CNN is ready after this process
cnn.add(tf.keras.layers.Dense(units=6 , activation='softmax'))


# Compile result, optimizer is a compiler
# our problem is categorical not binary(Adam) so rmsprop give us good result
cnn.compile(optimizer = 'rmsprop' , loss = 'categorical_crossentropy' , metrics = ['accuracy'])

# fitting of model
# x and validation_data are arguments
# epochs perform 30 loops during the training process like cycle
# Training will complete after this step
cnn.fit(x = training_set , validation_data = test_set , epochs = 30)

# cnn.save('flower.h5')

cnn.save('modelC6.h5')