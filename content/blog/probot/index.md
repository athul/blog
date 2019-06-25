---
title: Making GitHub apps with Probot
date: "2019-07-04"
description: Making GitHub apps is easier with Probot and Node.js
---
### GitHub Apps with Probot
Ever see in any issues or Pull Request in GitHub where a bot comments on the PR/Issue or adds labels to the Pr/Issue? If you have they are generally termed as GitHub apps and can be made relatively easily.  
Most of these apps are made by JavaScript(Node.js) using **Probot**, a framework for building apps for GitHub. Probot is written in Typescript, a superset of JavScript.You can find more about in their [Website](https://probot.github.io). 

---------

Here we'll make a **simple Issue and Pull Request commentor** bot which can deployed on Glitch or Zeit Now. 
#### On Local Machine
I'm assusming you've got `npm` and `node` installed.  We can simply `npm install probot` or `npx install create-probot-app`,answer the questions and Probot will be installed.  
We'll see an `index.js` with an `app.yml` and some other files.   

Basically Probot ships with an example of setting up an issue commentor bot in `index.js` for commenting on PRs we need sometinhg more. I'll talk on that later here.   
Next,fire up your code editor and we'll edit the `index.js` to the following 

```js
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

Click the *Register App* button and provide a name and install it in a repository.
> Tip:Create a new private repository because we'll be making a lot of noise for the testing  

Now in your local repo,if you check the `.env` file you'll see the variable values autofilled with the necessary data.
> Test the app by making a new issue in the test repo on GitHub.   
It works :tada: right?

##### Redelivering Webhookd
We can redeliver the webhooks of any event triggered by the app and we can redeliver them by going to Settings->Installed Apps-><your app>->Advanced Settings->
