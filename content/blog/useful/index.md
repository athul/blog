---
title: Using your Old System Better
date: "2019-12-01"
description: Using your Old System as your Private Server,GitHub, Cloud and Whatnot
---

# Using your Old System Better
We all went through that stage(most of us), when we buy a New Laptop and we forget about out Old Computer. This is a much common trait of us.
Most us has spend a lot of money fixing that old system and improving it. We've upgraded the RAM and HDD and still when we get this fancy new laptop and all of a sudden we Forget our PC.
This **Negelected** peice of ICs and Love could be your next big side project. For me I was totally sad of not using my PC for weeks after buying my Laptop. I even felt empathatic for my PC.
![Old comp](https://media.giphy.com/media/xULW8m5Vmtz9oOSFpu/giphy.gif)
### What did I do?
So after all this introspection and empathizing, I thought why not set my system to be my Server?
Why not use it as my Storage Space? Why not use it as my Git Server???? Why not my Personal Cloud??????     
So I started to work on this stuff. 

### Act 1, SSH
1. The First was of course I searched on What should I do? I found a lot of stuff for a server but most of them included booting to a new OS. I didn't want that. So I searched for other solutions
2. I currently run Manjaro and Ubuntu on my System and my Laptop is a Macbook. I couldn't drop neither of my OS. So I continued my Search.
3. Then I thought "Hey, I could just SSH into my PC and see what its like." I spend Half a Day just for the initial Connection. I have a Wifi card and a modem with WIFI, so I justed SSHed into my PC
For SSHing use these commands
```shell
$ ssh-keygen
$ ssh-copy-id host@hostname/ip
$ ssh host@hostname/ip
```
And congratulations you justed SSHed into your PC from a Laptop. :rocket: 
Now you get the Terminal of your PC(linux) and you're like the God of the Terminal now
4. You can run any commands like `curl`,`wget`, `npm install` etc...
![](https://media.giphy.com/media/65n8RPEa3r65q/giphy.gif)
### Act 2, Personal Git Storage
GitHub is one of the famous(and my fav) Git Repository storing & hosting platform. Why not a Personal GitHub lookalike for you? You could save all your private projects here without any risk or Costs.   
Some Self Hosted Git Platforms are 
- GitLab Community Edition 🆓
- Gogs 🆓
- Gitea 🆓
- GitHub Enterprize Server 💸
 I used Gitea since it was easy to install and setup. You only have to download a binary from gitea.io and voíla you get an instant GitHub lookalike webapp.   
My advice is that if you want to use it cross-device install it in the central server and ssh to it from any device and for that(ssh-ing) I'd higly suggest (not a promotion)[Termius](termius.com). It has got a 14 day free trial of premium and you can get the pro pack from the [GitHub Student Developer Pack](https://termius.com/education).
Or you can just enter the IP of the server followed by the port number in your browser like `192.168.322.12:3000` and you will get the webapp. 
Now create some repositories and use Gitea :tada: :tada:
### Act 3, The File Storage shenanigan
Yep, use it as your personal data center. Store all your stuff. Your films,songs and *study materials*. Do it coz only you're the only one who can access all that since you're the one who knows how the folder structure is. Add a media server and you can use it with  your Smart TV and forget about paying any bills for streaming.
![Roll Safe Meme](https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif)
### Act 4, The Future
"Wait what? This is what you've been Bragging about?" you might ask? I'd say yes since the next big selfhosted stuff maybe your best Ideas. You can self-host anything from Websites, Games to Even Media Servers


Here are some good Places to find out more on what to selfhost
- https://github.com/awesome-selfhosted/awesome-selfhosted The GitHub Repo tells it all
- https://www.reddit.com/r/selfhosted/ The Epic Place to get all the info .
