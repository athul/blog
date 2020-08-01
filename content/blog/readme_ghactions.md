---
title: Updating GitHub Readme with Waka-readme
date: "2020-07-18"
description: Wakatime Stats in your Profile Readme
---

Profile Readme are a new way to show off your GitHub profile and gives you all the powers of Markdown for doing it. Let's discuss some ways you can update your profile readme with Python and GitHub Actions and how I use them to update my Profile Readme.

So I would like to introduce you to [waka-readme](https://github.com/athul/waka-readme). Its built with Python and can be used to generate a graph like this in your Profile Repo. It mostly uses regex and GitHub's REST API for Python to update the readme. This graph will be updated every day at 00.00 UTC on schedule thanks to GitHub Actions.

```text
Week #29 : July 13 - 18

Python      8 hrs 52 mins       ███████████████████░░░░░░   75.87% 
Go          1 hr 15 mins        ██░░░░░░░░░░░░░░░░░░░░░░░   10.79% 
Markdown    52 mins             █░░░░░░░░░░░░░░░░░░░░░░░░   7.43% 
Docker      16 mins             ░░░░░░░░░░░░░░░░░░░░░░░░░   2.32% 
YAML        7 mins              ░░░░░░░░░░░░░░░░░░░░░░░░░   1.07%
```

Currently waka-readme has nearly 40 ⭐️s on GitHub and 3 Contributors and about 64 people use this in their Profile. It's not that fancy in any way but totally nerdy in my opinion🤓.

## FlashBack

I don't know if any of you remember, but there was a time when pinnable gists came and the GitHub world just went for new tricks and hacks for creating pinnable gists. I saw some people rickrolling with Pinnable Gists. That was a perfect time time for creating some cool hacks and GitHub Actions were still in the early beta phases. I was a user of WakaTime and the [waka-box](https://github.com/matchai/waka-box) workflow and had been using them till the Profile Readme came.

## Waka-Readme

Once I was able to get the profile readme on my GitHub profile, I tried to hack on it a bit and the first hack was to include the WakaTime stats in the profile readme. The first method I used was to scrape it from the Gist I made for waka-box by simply a GET request to the Gist's raw URL. Then I thought that this wouldn't be useful for any other people since that would simple introduce a bit more overhead for people not using waka-box. So I went to hack on it a bit more and used WakaTime's API to get my data and generate a graph with Python. I used the percentage part of the API response and divided that with 4 and used that value to generate a graph with 25 blocks of `█` and `░`. This will give a good graph for the metrics in regards with the percentage of time spent on a language. This data is collected from the WakaTime plugin in your code-editor and it support almost editors the last time I checked.

I enourage you to update your Profile readme till it gives a whole idea of who you are and if you have time do try waka-readme and fell free to open an issue or ping me on twitter [@athulcajay](https://twitter.com/athulcajay) for any queries plus drop a ⭐️ if you found it useful. Your feedbacks are highly appreciated and go forth and build awesome stuff.
