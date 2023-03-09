# from click import File
import base64
import numpy as np
import tensorflow as tf
# load the saved model
model = tf.keras.models.load_model('modelC6.h5')

from pydantic import BaseModel
from fastapi import FastAPI,File
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
image_created = "new_image.jpg"

origins = [
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# Image comes from frond End (react-native>SCreens>HomePage)
# model to load image data 
class ImageData(BaseModel):
    my_image: bytes = File(...)

@app.post("/upload")
async def create_upload_file(payload: ImageData):
    imgdata = base64.b64decode(payload.my_image)
    with open(image_created, "wb") as f:
        f.write(imgdata)
    test_image = tf.keras.preprocessing.image.load_img(image_created,target_size=(64,64))
    test_image = tf.keras.preprocessing.image.img_to_array(test_image)
    test_image = np.expand_dims(test_image,axis=0)
    result = model.predict(test_image)
    print(result)

    if result[0][0]==1:
        return {"message": 'Unknown'}
    elif result[0][1]==1:
        return {"message": 'Daisy'}
    elif result[0][2]==1:
        return {"message": 'Dandelion'}
    elif result[0][3]==1:
        print('Rose')
        return {"message": 'Rose'}
    elif result[0][4]==1:
        print('SunFlower')
        return {"message": 'SunFlower'}
    elif result[0][5]==1:
        print("Tulip")
        return {"message": 'Tulip'}

    return {"message": "You have selected the wrong Image"}
