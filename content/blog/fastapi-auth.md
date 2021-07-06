---
title: FastAPI Auth + Login Page
date: "2020-11-19"
description: Using auth in Fastapi and connecting it to a Login Form
---
This past week I had been working on something(will release it in the coming days) which used FastAPI for the Backend and Jinja for Templating. I had never used Jinja before and it was quite useful and easy to use. The abstraction is enjoyable. No need for an API to send the data to the frontend. Then I had to implement an Authentication system for the frontend since the project consists of some personal info. I had to refresh my HTML form skills for the same and I found that the resources available for these were less.

> I'm assuming that you know Python and you have used FastAPI at some point. You can check my other blog post about FastAPI and [Deta](https://deta.sh) to build a mailing list server [here](/fastapi_deta)

## Auth

FastAPI has an excellent auth system but that being said it's hard to implement everything if you're on a schedule. I had searched on GitHub for some helper libs and found the perfect and easier one. It supports cookie auth too 😍.  It's called `fastapi_login` and it made the Auth part a lot easier. I'll be using `fastapi_login` for implementing the login/auth with 🍪.

To Install `fastapi_login`, you can just,

```shell
$ pip install fastapi_login
```

You might also need to install the Form handling package of FastAPI, `python-multipart` using pip too.

I'm also assuming you have a file which uses FastAPI for routing and all, I'm calling that `main.py` and in that `main.py` you can just call it using the import statement of Python. We'll only implement the Auth side of things in the file. We'll import a builtin FastAPI form class for Auth, a Response type, status code class and a function from the same.

```py
# main.py
from fastapi import Depends,status # Assuming you have the FastAPI class for routing
from fastapi.responses import RedirectResponse,HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager #Loginmanager Class
from fastapi_login.exceptions import InvalidCredentialsException #Exception class

SECRET = "secret-key"
# To obtain a suitable secret key you can run | import os; print(os.urandom(24).hex())

manager = LoginManager(SECRET,tokenUrl="/auth/login",use_cookie=True)
manager.cookie_name = "some-name"
```

the `tokenUrl` should be our auth endpoint and this route will be implemented later. We also need a DB for the user data(username and password) and for example purposes, I'll create a python dictionary with the username and unhashed password.
> The unhashed password method should not be used and you should use an encrypting lib like `bcrypt` for creating a hashed password

In our endpoint, we'll use this DB to fetch the user if the password is correct or not and if successful we'll Redirect the user to another route on the server itself. Like a Dashboard or something.

Continuing on `main.py`

```py
DB = {"username":{"password":"qwertyuiop"}} # unhashed

@manager.user_loader
def load_user(username:str):
    user = DB.get(username)
    return user

@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)
    if not user:
        raise InvalidCredentialsException
    elif password != user['password']:
        raise InvalidCredentialsException
    access_token = manager.create_access_token(
        data={"sub":username}
    )
    resp = RedirectResponse(url="/private",status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp,access_token)
    return resp

@app.get("/private")
def getPrivateendpoint(_=Depends(manager))
    return "You are an authentciated user"
```

The decorator `@manager.user_loader` will use the function `load_user` to check whether the user exists in the DB. Next, we define our endpoint called `/auth/login` if you recall correctly this is the same URL we used for the `manager` object. If the user is not identified we'll throw the `InvalidCredentialsException` exception. If the authentication was successful then it will redirect to the specified URL in our RedirectResponse class. If you're redirecting to a `GET` endpoint make sure to add the status code too. Once we set our response class we set the cookie with response class and access token.

This is enough for the Auth part. You can check out the [repository](https://github.com/MushroomMaula/fastapi_login) for docs and this [gist](https://gist.github.com/MushroomMaula/2eaae0c5f467e5b64338953e891f7de9) by the author of `fastapi_login` for more details.

## Login Form

FastAPI has a builtin Template class with Jinja2. here we won't be using Jinja since we don't have any data from the backend to be used up front. It's totally upto you if you want to use it. Here is the code,

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://unpkg.com/twinklecss@1.1.0/twinkle.min.css"/>
</head>
<body>
    <div class="flex p-4 m-6 justify-center">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" method="POST" action="/auth/login" >
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text">
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
          </div>
        </form>
      </div>
</body>
</html>
```

I had used Twinkle CSS which is a size-friendly build of Tailwind CSS but you can use any CSS framework of your choice. You can see that the form action is set to the `/auth/login` endpoint which is our route which handles the auth part. So when we click the "Sign In" button we'll be taken to the `/private` route if successful. Adding this to FastAPI is quite easy. I had named the above file as `login.html` inside a templates folder. We'll use HTMLResponse class to return the HTML file and render that in the browser. This will be the additional code to `main.py`.

```py
import path

pth = path.dirname(__file__)

@app.get("/",response_class=HTMLResponse)
def loginwithCreds(request:Request):
    with open(path.join(pth, "templates/login.html")) as f:
        return HTMLResponse(content=f.read())
```

This will render the login screen on the `/` endpoint. Here is a working Demo

![Demo](https://i.imgur.com/p9P0Ug5.gif)

---

Here is the Full Source Code for the Python side of things

```py
from fastapi import FastAPI,Depends,status
from fastapi.responses import RedirectResponse,HTMLResponse
from fastapi.security import OAuth2PasswordRequestForm
from fastapi_login import LoginManager #Loginmanager Class
from fastapi_login.exceptions import InvalidCredentialsException #Exception class
import path

app= FastAPI()

SECRET = "secret-key"
# To obtain a suitable secret key you can run | import os; print(os.urandom(24).hex())
pth = path.dirname(__file__)
templates = Jinja2Templates(directory=path.join(pth, "templates"))

manager = LoginManager(SECRET,tokenUrl="/auth/login",use_cookie=True)
manager.cookie_name = "some-name"

DB = {"username":{"password":"qwertyuiop"}} # unhashed

@manager.user_loader
def load_user(username:str):
    user = DB.get(username)
    return user

@app.post("/auth/login")
def login(data: OAuth2PasswordRequestForm = Depends()):
    username = data.username
    password = data.password
    user = load_user(username)
    if not user:
        raise InvalidCredentialsException
    elif password != user['password']:
        raise InvalidCredentialsException
    access_token = manager.create_access_token(
        data={"sub":username}
    )
    resp = RedirectResponse(url="/private",status_code=status.HTTP_302_FOUND)
    manager.set_cookie(resp,access_token)
    return resp

@app.get("/private")
def getPrivateendpoint(_=Depends(manager))
    return "You are an authentciated user"

@app.get("/",response_class=HTMLResponse)
def loginwithCreds(request:Request):
    with open(path.join(pth, "templates/login.html")) as f:
        return HTMLResponse(content=f.read())
```

---

If you found this useful, consider donating me on [BMC ☕️](https://www.buymeacoffee.com/athulca) or [Paypal](https://paypal.me/athulca) and can reach out to me on [Twitter](https://twitter.com/athulcajay) 😄
