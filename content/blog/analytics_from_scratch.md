---
title: Building Analytics Servers because Why not?
date: "2020-12-01"
description: Using FastAPI and deta.sh bases to build an Analytics Site from scratch
---
Recent days, I have a hard time going to sleep. I have no idea why but it may be because I wake up early or sit infront of my computer all day long. Anyways these sleepless paved way for quite a handfull of ideas and the most recent one was an Analytics Server. 
I was heavily inspired by [Shynet](https://github.com/milesmcc/shynet) for it's simplicity and aesthetics and I had been using it for getting the analytics of this Blog and a few Personal Projects. Shynet was built with Django which again piqued my interest.
I had the usual NIH[^1]-ish thought, why not build one. Why borrow when you can create. I only wanted a barebones Analytics Server with the main outputs like how man URL hits do I receive on the site, what are the referrers, which devices are being used to access and so on... 
And from that sleeplessness idea, I tried my hand on it the next day and I would say I succeeded.

The core is hacky but it gets the Job done. 

> You can find the whole source code [here](https://github.com/athul/jimbru).

## Starting to start 

I tend to work on my side projects between my Google Meet classes and I tend to be lazy most of the time. Reduce the complexity, reduce the dependency and reduce unwanted additions. This is a new way of working for my projects and before I used to implement a new feature if I was in a good mood and wordly surroundings were okay. Now I follow my project guildelines, which I had [jotted down](https://athul.github.io/notes/posts/project.html). 

Initially I googled for the same and an old 2014 blog post came up. It was in Python but with Flask and gave me an idea on how it should work. It gave me a lot of insights on how everything should be glued together to work with and how to use the Js side of things effectively.

FastAPI was all the way in my mind because I could host that and use it for some sites of mine with ease. I hacked up the basic working server in a few hours and tried to get some data from it. All this data needed to be stored somewhere and I used [deta.sh](https://deta.sh)'s Base which is a nosql DB with an easy API for working with Python. 

The base working model was barebones and didn't provide much insights on anything. It did as it was told to do, nothing more nothing less.

## Goldmine of Sorts.

To get more insights on the working of Shynet, I found out that the http-headers were used to get all the data. An HTTP-Header response contains almost every needed data to make something like this. Imagine the data being sent to any server for every page load, it may be hard to comprehend but it's a lot of data.  
```json
{
  "accept": "image/webp,image/apng,image/*,*/*;q=0.8",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
  "referer": "https://athul.github.io/",
  "sec-fetch-dest": "image",
  "sec-fetch-mode": "no-cors",
  "sec-fetch-site": "cross-site",
  "user-agent": "Mozilla/5.0 (Linux; Android 9; LLD-AL10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36",
  "x-amzn-trace-id": "Root=<some_trace_id>",
  "x-forwarded-for": "2.3.4.5",
  "x-forwarded-host": "<host_url>",
  "x-forwarded-port": "443",
  "x-forwarded-proto": "https",
  "x-original-forwarded-for": "1.2.3.4",
  "x-real-ip": "1.2.3.4",
  "x-request-id": "1234gasdjhgi",
  "x-scheme": "https"
}
```
This is a sample header request from my website to the Ananlytics server. See, we can get many details from these if we've got the right tools. There is a site called https://ipapi.co/ and we can get quite a handful of details from them wit just the IP address, we could get data like the network provider, the location of the User logged in and so on...

These are some Gems I learned from Reading Shynet's Source code. Shynet uses a DB called MaxMind GeoIP DB which is hosted with shynet itself. 

Okay now I can use the Data. But where would I see all these? I could go to Deta's DB explorer and Read all these as JSON and get the idea. But what's the point in reading JSON and understanding JSON, without getting any meaningfull insights??

## API or Templates?


[^1]:https://athul.github.io/notes/posts/nih.htmlhttps://athul.github.io/notes/posts/nih.html
