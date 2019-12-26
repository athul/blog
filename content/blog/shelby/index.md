---
title: Shelby, the Shell Prompt
date: "2019-12-26"
description: Shelby is one of my Side Projects. It's a shell prompt written in Go for speed and minimalism
---

## What???

Shelby is a **bash and zsh** shell prompt with more focus on improving the terminal productivity while not compromising the speed and size. 

## Why??

I use the terminal. I use it a LOT. Mostly editing,running scripts and servers. I use zsh because I ❤️ oh-my-zsh. I used to use [Spaceship Prompt](https://github.com/denysdovhan/spaceship-prompt) and it felt like quite slow to me. Then I flipped to [Starship Prompt](starship.rs) by the awesome [@matchai](https://github.com/matchai). 

I really fell in love with Starship. It's fast, it's built with Rust were too big to be for me to fall in ❤️. The only drawback was that it showed a lot of info. A lot. I didn't want to customize it much because I was lazy(obviously) and writing another TOML file was meh.

Then on this fine evening(Dec 2nd) before going to sleep, during to the Study Leaves before my Uni Exams, I thought of writing a shell prompt in Go. I wanted it be **fast**, to only show the **needed info**(virtualenvs,SSH and git), and has a **small size**. The small package size maybe because I use a Macbook Air with 128gigs of storage and not wasting data for downloading the stuff.
I've seen Go and Rust programs get photo finishes at speed benchmarks and I thought, why not learn Go on the go and write this Stuff???? 


> This was also the time I found out that Study Leaves increases the productivity and improves out of the box thinking.

Then I wanted a name for it. I didn't want it to be a ship anymore but more personally and technically relatable. So I named it **_Shelby_** because *Shell+feminine name (because ships are mostly given feminine names🤪)* and my childhood caretaker's name was Silby😁.

## Code

I started a bit on it like setting up the repo both local and remote and went to sleep. Since being a total noob to Go(I started learning a few days ago), I searched for any other implementations of the same. I stumbled upon [Powerline Go by @justjanne](https://github.com/justjanne/powerline-go) and [Mimir by @talal](https://github.com/talal/mimir). I found both the code hard to follow but grasped their logic in time. Shelby still use mimir's code in some functions😅.


So, forward a few weeks after my 3rd paper(Discrete Mathematics) I got to spend a bit more time into it and on 22nd Decemeber 2019, I released the *Alpha* of Shelby. It still has bugs in it but due to my lack of knowledge in Go, I'm still searching for fixes🙂.

Some of it's properties are:
- Small Size(binary ~= 2MB, tar ~= 700KB)
- Shows if a Virtualenv is enabled
- Shows the Username and Hostname if that system is accessed via SSH
- Shows the Git branch
- Shows the number of untracked and unstaged files as `[+]` and `[!]` respectively. There will be a count of both of the files unstaged or untracked.


You can find Shelby on GitHub [here](https://github.com/athul/shelby) do give it a try and open an issue or two if you find anything unusual😃. It also passed 35 stars on GitHub(my highest starred repo). I also built a GitHub Action to keep me posted on any new stars on telegram just to keep me motivated😊.

I'd like to also thank[Gopikrishnan Sasikumar](https://github.com/GopikrishnanSasikumar) for providing me with a much needed mental support and being my mentor😇, and my Friend Kiran for the support and ideas .


Thanks
