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
I'm assusming you've got `npm` and `node` installed.  We can simply `npm install probot` ,answer the questions and Probot will be installed.  
We'll see an `index.js` with an `app.yml` and some otger files.   

Basically Probot ships with an example of setting up an issue commentor bot in `index.js` for commenting on PRs we need to edit the `app.yml` file and uncomment the 38th line written 'pull request' just delete the '#' and you'll be fine.  
Next,fire up your code editor and we'll edit the `index.js` to the following 

```js
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')
  const issue=context.payload.issue
  const user=issue.login.user
  app.on('issues.opened', async context =>({
    return context.github.issues.createComment(context.issue({ body: `Thanks @${user} for opening this issue!:tada: You are awesome..` })
)
  })
}
```
