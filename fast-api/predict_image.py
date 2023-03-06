# from click import File
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


@app.post("/upload")
async def create_upload_file(file: bytes = File(...)):
    # return{"filename" : file.filename}
    print("jhfkasdfjsdfsghfgj")
    image = Image.open(io.BytesIO(file))
    image.show()
    print("dfsdfsdfsdfsfsdsfsdf")
    return {"Upload Status": "Completed"}


imag_path= './Prediction/dandelion.jpg'

test_image = tf.keras.preprocessing.image.load_img(imag_path,target_size=(64,64))
test_image = tf.keras.preprocessing.image.img_to_array(test_image)
test_image = np.expand_dims(test_image,axis=0)
result = model.predict(test_image)


print(result)

if result[0][0]==1:
    print('Daisy')
elif result[0][1]==1:
    print('Dandelion')
elif result[0][2]==1:
    print('Rose')
elif result[0][3]==1:
    print('SunFlower')
elif result[0][4]==1:
    print("Tulip")