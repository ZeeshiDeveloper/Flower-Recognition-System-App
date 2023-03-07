# from click import File
import base64
from typing import Optional
import numpy as np
import tensorflow as tf
# load the saved model
model = tf.keras.models.load_model('flower.h5')

# get image from react native front end
from fastapi import FastAPI,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
app = FastAPI()

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
@app.get("/msg")
async def root():
    return {"message": "Second Message"}

from pydantic import BaseModel


# Image comes from frond End (react-native>SCreens>HomePage)
class ImageData(BaseModel):
    my_image: bytes = File(...)
@app.post("/upload")
async def create_upload_file(payload: ImageData):
    imgdata = base64.b64decode(payload.my_image)
    with open("new_image.jpg", "wb") as f:
        f.write(imgdata)
    print(payload.my_image)

    image = Image.open(io.BytesIO(imgdata))
    image.show()
    return {"Upload Status": "Completed"}

# to Print the Name 
class NameData(BaseModel):
    my_name: str

@app.post("/name")
async def create_upload_file(payload: NameData):
    print(payload.my_name)
    return {"my_name": payload}


# imag_path= './Prediction/dandelion.jpg'

# test_image = tf.keras.preprocessing.image.load_img(imag_path,target_size=(64,64))
# test_image = tf.keras.preprocessing.image.img_to_array(test_image)
# test_image = np.expand_dims(test_image,axis=0)
# result = model.predict(test_image)


# print(result)

# if result[0][0]==1:
#     print('Daisy')
# elif result[0][1]==1:
#     print('Dandelion')
# elif result[0][2]==1:
#     print('Rose')
# elif result[0][3]==1:
#     print('SunFlower')
# elif result[0][4]==1:
#     print("Tulip")