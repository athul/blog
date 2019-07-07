---
title: Shell Scripting to Automation
date: "2019-07-2"
description: Automating Basic Unix stuff with Shell Scripts/Bash Scripts. From Pushing to different branches to saving you a Few Keypresses 
---

Ever encountered a time when you have a few working branches which you update daily? Then you'll know how tiresome it is to `checkout` to every branch and typing `git push <branch name>` . If you haven't encountered this,try doing it once, you'll know what I'm saying😏😏.   
We could always automate these stuff just by a few line of shell code.It's quite **easy** you know. Starting by taking the above said situation,you've got 5 branches and you want to push to all these 5 branches. We'll write a shell script for it.
```bash
cd ~/path/to/git/repository/ #Assuming you are anywhere                               
for i in 'master' 'dev' 'fix1' 'patch1' 'dope-branch-name'
do
	git checkout $i
	git pull origin $i && git push origin $i
done
```
This 7 line script can help you save some keystrokes.You should save this script with a `.sh` extension and can be  run by typing `sh script_filename.sh` So now,what does this mean? It's the same thing you type in the terminal with a for loop as for extra a _"dev"_ touch😁😁.    
The looping variable `i` will loop through the strings we've passed through, these will be our branch names and inside the for loop the variable is passed by a _$_ prefix. Now wherever we use the _$_ as prefix for the variable name,the script will automatically pass the variable's value, just like that :snap:⚡⚡.  Everything that needs to be executed inside the loop should be between the `do` and `done` keywords. The loop will go on till the parameters are over.

------

Now let us make a script which runs a python program,saves its output to another file and commits it and git push it.
Here I'll be pushing it to a [Gist](https://gist.github.com).   
So some days ago I started using (Wakatime)[] which gets track on your coding activity and its super cool,showing it off in your GitHub profile seemed cool and one [Campus Expert,John Pham](phamous.dev) did do it and it looked super cool. But the way he did was using GitHub Actions, and no I didn't apply for the Beta of GH Actions. So I made a Python🐍 script to make something like his. You can find it [here](https://github.com/Athul-CA/wakatime-metrics).    
It's a tad manual since API requests are 😰😱. The manual thing is you've got to copy a json file from your wakatime dasboard's "embed" page. The rest of the work is done by a shell script👻👻. For showing the activity in my Profile too,I made a public gist with a `.txt` file in GitHub and cloned it to my local machine. The shell script goes like this,👇👇

```bash
cd ~/path/to_the/python_file and json file
nvim filename.json
python main.py filename.json > ~/path_to_cloned_gist_repo/filename.txt
cd ~/path_to_gist_repo
git commit -a -m "New Metrics"
git push origin master

```
When running this script, you'll be first prompted to paste the `json` text you copied from the Wakatime dashboard. You should delete the current contents and paste the new ones and save it. You can use any editor of your choice, I use NeoVim. It will run the python program and it will push the changes to GitHub. Easy Right? Just with a few line of Bash Script we can automate quite a good amount of Tedious Tasks.       
We can set up a script for launching the terminal just as the System turns on but I believe its for you to find out more about it. This post might've helped and possibly this will be the needed push for you to explore the world of shell scripting and automation✌️✌️✌️.    
I will post some more on this when I understand more of this some day.👻
