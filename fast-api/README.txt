pip install pipenv
First of all create environment using command "pipenv shell"
Go to the environment you have created
Install the requirements file using command "pipenv run pip install -r requirements.txt"

editional information:
to run any file type : 
1. python file_name.python

when you start your project type some commands like : 
1. pipenv shell
2. uvicorn predict_image:app --reload

react-native dont allow localhost when your emulator is your personal mobile because of some security reasons then you need to open (ngrok) folder typer ther following commands :
in Command Pormpt / terminal (first paste that file in desktop and in terminal (cd Desktop))
1. ./ngrok config add-authtoken 2MgL7ze9ZhN3SWXiNes4EJTt9m7_4ijKbyg4SpWLYP34GioYB (just for first time not every time)
2. ./ngrok http 8000 (or any other localhost which you were currently using)
