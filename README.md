# aws_elastic_beanstalk_flask
Quick walk-through on how to use AWS Elastic Beanstalk to deliver Python Flask web applications.

Using the AWS Documentation [Deploying a flask application to Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create-deploy-python-flask.html). Check here for [AWS Pricing on Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/pricing/#:~:text=There%20is%20no%20additional%20charge,fees%20and%20no%20upfront%20commitments.)

# Steps
## 0
Create your own virtual Python environment in your app directory
```bash
$ pip install flask
$ pip freeze > requirements.txt
```
Install the AWS Elastic Beanstalk CLI by [following the direction in this link.](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

## 1
```bash
$ cd ~/dev
$ mkdir eb-flask-app
$ cd eb-flask-app
$ mkdir .ebextensions
$ git init
$ eb init
$ touch .ebignore
```

## 2
```bash
$ git checkout -b dev
$ git push --set-upstream origin dev
```

## 3
Set up basic files for Flask app and local setup and running the app.
```bash
$ touch application.py
$ touch run.sh && chmod +x ./run.sh
$ touch setup.sh && chmod +x ./setup.sh
$ mkdir templates
$ touch templates/index.html
$ touch templates/username.html
```

## 4
For local dev and testing
```bash
$ vim setup.sh
$ vim run.sh
```

## 5
```bash
$ vim application.py
$ vim templates/index.html
$ vim templates/username.html
```

## 6
Commit your changes to git
```bash
$ git status
$ git add .gitignore README.md .ebignore application.py requirements.txt run.sh setup.sh templates/
$ git commit -a -m "Initial commit for a barebone Python Flask web app."
```
Make sure it runs locally well.

## 7
Create and deploy EB dev environment
```bash
$ eb create eb-flask-app-DEV
$ eb list
$ eb deploy
$ eb open
```
Ensure it works on EB environment eb-flask-app-DEV.

## 8
Now merge work in dev branch into master branch and call it v1.0
```bash
$ git checkout master
$ git merge dev
$ git tag -a "v1.0" -m "First version."
$ eb deploy -l "eb-flask-app v1.0"
$ eb open
```

## 9
Thanks to Miguel Grinberg for sharing his insights on how to combine ReactJS with Python Flask. See his two great tutorials
* [How To Create a React + Flask Project](https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project)
* [How to Deploy a React + Flask Project](https://blog.miguelgrinberg.com/post/how-to-deploy-a-react--flask-project)


## 10
Adding user login with Amazon Cognito and AWS Amplify.
Instead of reinventing the wheel, I'm following [Agnita: Authentication for Create React App using AWS Cognito](https://levelup.gitconnected.com/agnita-authentication-for-create-react-app-using-aws-cognito-80cde1fb781b). The Agnita GitHub repo is located [here](https://github.com/bartw/agnita).

Follow the instructions to set up Amazon Cognito. Note the AWS Region, User Pool ID and App Client ID of Cognito in your React app

Add AWS Amplify
```bash
npm install --save aws-amplify
```

## 11



