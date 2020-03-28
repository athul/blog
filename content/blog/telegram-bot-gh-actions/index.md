---
title: Telegram Bots and GitHub Actions
date: "2020-04-01"
description: Make a Telegram bot with Node.js and use it with GitHub Actions for sending notifications to you about the repo.
---
## Telegram
[Telegram](https://telegram.org/) is a cloud-based mobile and desktop messaging app with a focus on security and speed. It is free to use and extensively hackable. It also has good bot support system. The API is also easy to implement and has many wrappers for building bots with the API.

## GitHub Actions
[GitHub Actions](https://github.com/features/actions) is a a CI/CD runtime for you GitHub repository. You can run almost anything from scripts to docker containers. You can build, test and deploy your code with GitHub Actions. All these actions are called workflows and workflows differ in the job they're doing. These maybe test workflows, build ones or deployment ones. You can find all the actions on GitHub in the [marketplace](https://github.com/marketplace?type=actions)

## Building the Bot
### Prerequsites
- Basic JavaScript Knowldege
- Basic GitHub Knowledge
  
> There are templates for building actions. Here we're gonna start from scratch

### Dependencies
- **Node** , You can download node from their [website](https://nodejs.org/en/download/)
- **dotenv**, Dotenv can be downloaded via
```shell
$ npm i dotenv
---
$ yarn add dotenv
```
- **telebot**, Telebot is a simple wrapper for building telegram bots. You can download it via
```shell
$ npm i telebot
---
$ yarn add telebot
```
- **@zeit/ncc**, NCC is a Simple CLI for compiling a Node.js module into a single file, together with all its dependencies, gcc-style. It's a dev dependency and can be downloaded
```shell
yarn add --dev @zeit/ncc
---
npm i -D @zeit/ncc
```

#### Folder Structure
The `dist` folder will be automatically created. `action.yml` will be made

```
.
├── dist
│   └── index.js
├── index.js
├── action.yml
├── README.md
└── package.json

```
- `index.js` is the file we're defining the bot
- `action.yml` is the file we'll define the action and it's behaviours

## Building the Bot
Fire up the terminal/cmd and make a new folder. Install the dependecies. Run the following command
```shell
$ touch index.js action.yml
```
Open you favorite text editor within the folder or with the file. We'll define the bot

```javaScript   
require("dotenv").config
const Telebot = require('telebot');
const {
    INPUT_STATUS: ipstatus,
    INPUT_TOKEN: tgtoken,
    INPUT_CHAT: chatid,
    INPUT_IU_TITLE: ititle,
    INPUT_IU_NUM: inum,
    INPUT_IU_ACTOR: iactor,
    INPUT_IU_BODY: ibody,
    INPUT_PR_NUM: pnum,
    INPUT_PR_STATE: prstate,
    INPUT_PR_TITLE: ptitle,
    INPUT_PR_BODY: pbody,
    GITHUB_EVENT_NAME: ghevent,
    GITHUB_REPOSITORY: repo,
    GITHUB_ACTOR: ghactor,
    GITHUB_SHA: sha,
    GITHUB_WORKFLOW: ghwrkflw
} = process.env;

const bot = new Telebot(tgtoken)
```