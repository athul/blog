---
title: FastAPI + Deta = ⚡️
date: "2020-07-01"
description: Small Write up on how to use Deta as your data store with FastAPI
new: true 
---
[FastAPI](https://fastapi.tiangolo.com/) is a a Python Framework for building RESTful APIs. It has all the simplicity of Python with a added advantages of Async⚡️, automatic Schema Generation and OpenAPI and Python Types✨(with Pydantic). FastAPI is relatively a new Project and is gaining quite a good traction in the Dev world. It has got nearly [16k stars on GitHub](https://github.com/tiangolo/fastapi) and about 160 contributors. The main plus side of FastAPI is the documentation which is **Top Notch**.

[Deta](https://deta.sh) is a cloud based startup and focuses on building a cloud which is developer friendly and to reduce the hassle from idea to app.

> *"Deta is building a cloud for the developers with less build "bells and whistles", only what's needed to get the job done – a Micro Cloud."*

Personally what attracted me to deta was the ease to implement. I was having a hard time to connect FastAPI with SQLalchemy since I am a noob. Then Deta entered or at least then I came to know about it.

I was skeptical at first but, the simplicity of working with Deta amazed me and their Slack community is ✨. The creators are almost active everytime and they will help you in anyway possible to overcome an issue.

## Setting up FastAPI
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

Once we installed Pipenv to set up our environment follow the commands

```bash
pipenv shell #it will make the vrtualenvironment
pipenv install fastapi,uvicorn
```

If we're using venv, then for creating a venv and installing the packages, follow

```bash
python3 -m venv venv
source venv/bin/activate
pip install fastapi,uvicorn
```

These are for Unix like systems and on windows to activate a Virtualenv follow,

```bash
venv\Scripts\activate

```
