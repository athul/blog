---
title: Getting new Lobste.rs feed with Python and Telegram
date: "2021-28-02"
description: Writing a small script to get New Lobsters feed in Telegram with Python and Cron Jobs
new: true
---

It's been some time since I written a new technical post. It was because I took a small break from writing code. I have no idea why but it wasn't worth it anyways. 

Back to the point, I've recently discovered https://lobste.rs and found the discussions quite good. But as anyone who writes code, I was lazy to open my browser and navigate to the website. Telegram is one of the major apps I use to get my feed, so I thought why not write a script to get the newest posts from lobste.rs and read and join the discussion. It's easier for me.

So for a problem like this, my mind went to Python. I instantly set up a environment and installed the main packages like `feedparser` and the `deta` library. I'll specify the need of the deta library later.

Why I chose to parse the Atom feed was because lobsters didn't have a official API , but there are some endpoints like `/hottest` but it spews a lot of data which I don't have any need for. Also I hadn't used feedparser before so this was a good opportunity to get comfortable with it.

## Parsing the Feed

This is quite straight forward. Feedparser was built for it.

```py
import feedparser

LOB_URL:str = "https://lobste.rs/rss"

def getfeedData():
    feeds = feedparser.parse(LOB_URL)
    for feed in feeds['entries']:
        title = feed.title
        uri = feed.link
        _id = feed.id
        key = _id.split("/")[-1]
        comments = feed.comments
        feedDict = {"title":title,"url":uri,"post":_id,"comments":comments,"key":key}
    return feedDict

```

This function was more that enough to get the required data.
