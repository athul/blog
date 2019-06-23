---
title: Programming on your Phone
date: "2019-07-25"
description: How to start using termux,using it as your local development system with Git,Neovim and your required language packages
---
### What is Termux?
Termux is a **Terminal Emulator** which can be used on Android.

### Why Termux?
> "Start by answering the Whys"- Simon Sinek

Termux is quite useful if you are a aspiring dev and doesn't have a budget to buy a laptop or If your machine goes on frequent strikes(as for me). You can do mostly anything that you do in a Linux terminal, like exploring files,editing them,moving them and using tools for Python,C,JavaScript(Node) etc...  
Termux is
- Light Weight(few kilobytes)
- Works same as the Bash in Linux
- Managable
- Open Source
- Has a package manager/repository
- Supports many Packages and Compilers
- Can use the full potential of phone's computing power
- Super handy(for devs) while travelling or related tasks
#### Installing Termux
Termux can be installed from *_Google Play or F-Droid_*.
We can *simply* install it from either of these sources and it'll work on-the-go.

#### Setting Up Termux
Accessing the Termux file system is a tedious one and is hard to find(for me) but we can provide acces to termux to our internal storage by going to `setting<apps<termux<permissions` Toggle the permission for storage to ON state. Or, you can provide access by running `termux-setup-storage` and you can access the file system.
#### Installing Packages
Termux has a sleek package manager which is constantly improved by the community. It has almost all packages we can find on Linux distributions and repositories. We can install packages by calling `pkg install <package_name>` . We can see a list of all the arguments to be used with `pkg` by running `pkg help`.
Here,I'll show an example on how to install git and neovim with Termux
- `pkg install git`
- `pkg install neovim`   
Its that simple.        
There might be a problem with the `curl` command and we can resolve it by running `pkg upgrade`.      
We can install **Node,Python and C** packages too,using `pkg install` command.  
#### How to
- We can use version control using Git
- We can edit files using Neovim or Nano
- We can run servers with python npm
- We can get a new session by sliding from the left

----

PS. I made this blog and related setup on Phone using Termux
