---
title: Using your Old System Better
date: "2019-12-01"
description: Using your Old System as your Private Server,GitHub, Cloud and Whatnot
---

# Using your Old System Better
We all went through that stage(most of us), when we buy a New Laptop and we forget about out Old Computer. This is a much common trait of us.
Most us has spend a lot a lot of money fixing that old system and improving it. We've upgraded the RAM and HDD and still when we get this fancy new laptop and all of a sudden we Forget our PC.
This **Negelected** peice of MotherBoard and ICs could be your next big side project. For me I was totally sad of not using my PC for weeks after buying my Laptop. I even felt empathatic for my PC.

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
And voila you justed SSHed into your PC from a Laptop. :rocket: 
Now you get the Terminal of your PC(linux) and you're like the God of the Terminal now
4. You can run any commands like `curl`,`wget`,`sudo rm -rf /`(don't run the last command) etc...

### Act 2, Personal Git Storage
GitHub is one of the famous Git Repository storing & hosting platform. Why not a Personal GitHub lookalike for you? You could save all your private projects here without any risk or Costs.   
Some Self Hosted Git Platforms are 
- GitLab Community Edition 🆓
- Gogs 🆓
- Gitea 🆓
- GitHub Enterprize Server 💸
Em