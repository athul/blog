---
title: FastAPI + Deta = ⚡️
date: "2020-07-07"
description: Small Write up on how to use Deta as your data store with FastAPI
new: true 
---
[FastAPI](https://fastapi.tiangolo.com/) is a a Python Framework for building RESTful APIs. It has all the simplicity of Python with a added advantages of Async⚡️, automatic Schema Generation and OpenAPI and Python Types✨(with Pydantic). FastAPI is relatively a new Project and is gaining quite a good traction in the Dev world. It has got nearly [16k stars on GitHub](https://github.com/tiangolo/fastapi) and about 160 contributors. The main plus side of FastAPI is the documentation which is **Top Notch**.

[Deta](https://deta.sh) is a cloud based startup and focuses on building a cloud which is developer friendly and to reduce the hassle from idea to app.

> *"Deta is building a cloud for the developers with less build "bells and whistles", only what's needed to get the job done – a Micro Cloud."*

Personally what attracted me to deta was the ease to implement. I was having a hard time to connect FastAPI with SQLalchemy since I am a noob. Then Deta entered or at least then I came to know about it.

I was skeptical at first but, the simplicity of working with Deta amazed me and their Slack community is ✨. The creators are almost active everytime and they will help you in anyway possible to overcome an issue.

## What we'll build
We're going to build a Personal **Mailing List** API with 

- FastAPI
- Deta.sh as our DB
- Deploy it on Deta Micros
 
We're only going to build the API, you can use [Mailgun](https://www.mailgun.com/) or [SendGrid](https://sendgrid.com/) to send the emails. Our API will consist of 4 Operations.

- Add a new Person to our List
- Get all the emails from our list
- Update the email of a specific user in our List
- Delete an entry from our List

## Setting up FastAPI and Deta

Hope you have Python 3.6+ interpreter on your machine. If you don't make sure to download it and install and verify by running python in your terminal

```bash
$ python3
Python 3.7.6 (default, Dec 30 2019, 19:38:26)
[Clang 11.0.0 (clang-1100.0.33.16)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

The above output is on my machine and it will change from machine to machine.
Next thing is to have a virtualenvironment setup, for that we could use either Pipenv or venv. [Pipenv](https://pipenv-fork.readthedocs.io/en/latest/) is a package for handling and managing Python envs automatically, you can install pipenv with,

```bash
pip install --user pipenv
```

Once we installed Pipenv to set up our environment follow the commands to install

- FastAPI
- Uvicorn - The ASGI Server
- Deta - Python Wrapper for the Deta Bases

```bash
pipenv shell #it will make the vrtualenvironment
pipenv install fastapi uvicorn deta
```

If we're using venv, then for creating a venv and installing the packages, follow

```bash
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn deta
```

These are for Unix like systems and on Windows to activate a Virtualenv follow,

```bash
venv\Scripts\activate

```

Once we have set up our Dev Environment. Let's move on to building the Mailing List.

For Deta, create an Account in Deta and create a new Project and get the Project Key. Save the Project key since it will be shown once. You can save it as an environment variable by executing

```bash
export DETA_PROJECT_KEY = <project key>
```
That's it. Lets move on to the code

## The Code

Let's start by making a simple REST API endpoint with FastAPI on a file called `main.py`

```py
#main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def helloworld():
    return "Hello World"
```

This is just a hello world app with FastAPI and for running this, we'll need uvicorn. Execute the following in the terminal/cmd,

```bash
$ uvicorn main:app --reload
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [13050] using statreload
INFO:     Started server process [13052]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Our API will be actve the port `8000`. FastAPI has inbuilt support for OpenAPI, Swagger and Redoc. To view the docs for our App, just go to [localhost:8000/docs](localhost:8000/docs). To check if our endpoint works, just execute

```bash
$ curl http://127.0.0.1:8000/
"Hello World"
```

So now, let's move on to our main parts

### Creating a user