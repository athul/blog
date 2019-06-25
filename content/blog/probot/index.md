---
title: Making GitHub apps with Probot
date: "2019-07-04"
description: Making GitHub apps easier with Probot and Node.js
---
### GitHub Apps with Probot
Ever see in any issues or Pull Request in GitHub where a bot comments on the PR/Issue or adds labels to the Pr/Issue? If you have they are generally termed as GitHub apps and can be made relatively easily.  
Most of these apps are made by JavaScript(Node.js) using **Probot**, a framework for building apps for GitHub. Probot is written in Typescript, a superset of JavScript.You can find more about in their [Website](https://probot.github.io). 

---------

Here we'll make a **Simple Issue and Pull Request commentor** bot which is made and deployed on Glitch.

###### Prerequisites
- GitHub account
- Account on Glitch using GitHub
- Base Js knowledge like variables and strings and functions
#### Making our App on Glitch
Glitch is an free online code-editing platform. It sets up our environment will all the necessary packages and stuff. All you need to do js click this button👇![Button for Glitch]()   
<<<<<<< HEAD

Basically Probot ships with an example of setting up an issue commentor bot in `index.js` for commenting on PRs we need to uncomment the `app.yml` file at line 38, written pull request removing the '#' will do tge trick
Next,we'll edit the `index.js` to the following 
=======
>>>>>>> b98097f9c9e7da90152ab877f12b0e526da8e7a5

Basically Probot ships with an example of setting up an issue commentor bot in `index.js` for commenting on PRs we need to uncomment the `app.yml` file at line 38, written pull request removing the '#' will do tge trick
Next,we'll edit the `index.js` to the following 

```js index.js
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  const issue=context.payload.issue //getting issue details
  const user=issue.login.user //Getting the username
  app.on('issues.opened', async context =>({
    return context.github.issues.createComment(context.issue({ body: `Thanks @${user} for opening this issue!:tada:
    You are awesome..` })
)
  })
}
```
The above code is for a bot which comments on a new issue. It mentions the user too. The *"Robotic"* characteristics start from the 4th line starting with `app.on` function the first argument passed is the action which the bot listens to. These actions are **webhook** actions of GitHub and you can learn more about from[Webhook Documentation]().  
Probot uses node's `async` API for returning the data. We used *`* to enclose the string/comment body because we won't need to use escape characters and we can also interpolate [Template Literals]().   
Now we need to check if our app is working or not,we can run `npm run dev` and in the browser goto `localhost:8000` , you can find a webpage like this ![probot-webpage](/wbp.jpg)   

Click the **Register App** button and provide a name and install it in a repository.
> Tip:Create a new private repository because we'll be making a lot of noise for the testing  

Now ,if you check the `.env` file you'll see the variable values autofilled with the necessary data. Glitch automatically deploys our app and our app will be listening to the webhooks to be recieved.
> Test the app by making a new issue in the test repo on GitHub.   
<<<<<<< HEAD

It works right?  
Congratulations :tada: You just made yourself a GitHub :octocat: app :tada: :tada: 

=======
It works right?  
Congratulations :tada: You just made yourself a GitHub :octocat: app :tada: :tada: 

>>>>>>> b98097f9c9e7da90152ab877f12b0e526da8e7a5
##### Redelivering Webhook⤴️
We can redeliver the webhooks of any event triggered by the app and we can redeliver them by going to Settings->Installed Apps-><your app>->Advanced Settings->

#### Commenting on PRs
If you check the app settings in GitHub for your app,you can see that the app also works for Pull Requests. This is due the edit on `app.yml` file before registering our app. 
Now we need to edit the `index.js` to this
```js index.js
```

Here we add a new "robotic" characteristic by passing a webhook action called *pull_request.open*. Now our app listens for PR webhook and once received it emits the `context.issue({body})` to GitHub. You can see that we are still passing the body to the *createComment* function.This is because PRs are considered as another type of Issues in GitHub. 
For testing if this works , make a new PR and check if the bot comments on that

