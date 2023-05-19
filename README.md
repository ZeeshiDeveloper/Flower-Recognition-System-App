# Flower-Recognition-System-App

Flower Identification system application, front end is created in React Native and for backend FastAPI is used.

Tools(Platforms) used in thi app are given below :
React Native
Type Script
Firebase (Database)
Fast Api
HTML
CSS
Java Script
Expo
Expo Go (Emulator)
Visual Studio code

Front End :
First, Splash screen will appears means whenever you open any application then it will not open its login page, first splach screen appears for some moments then login screen appears.
In react native first we created a Login page where you can register yourself(if you are not registered yet) then your email and password information would be automatically stored in firebase authentication project then Home Page would be appears and you can do actions on it.
After every activity Netpho will show the popup message like registered successfull or login successfull etc.
Home Page :
in home Page we have four Buttons

1. signout button (if you press this butoon you will move on Login Screen)
2. Gallery Button (it allows you to open your gallery where you can select images for prediction purpose)
3. Camera Button (it allows you to open your camera and take a pic and send that pic to model for your desired output)
4. Result Button (This button is created for special purpose suppose if you are selected a image and you selected wrong image by mistake then there is no output you recieved according to your input when you press this Result button you will get your desired output and you can also change image by again press on gallery or camera button whatever you want)

When you press Result button it will send your request to backend ( Predict_image.py) file and it returns a result and send back to frontend (HomePage.tsx) file and that response stored in state and appears in Text field.

LocalHost Problem : (Network Request Failed)
Basically react-native don't állow localhost because of some security reasons thats why we have to install (ngrok) in our system it will change our localhost to something else statement like ( https://cdb8-119-73-101-108.in.ngrok.io -> http://localhost:8000 ) then we change our address from homeScreen where we are fetching the POST request then it will work.

Backend :
