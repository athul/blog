---
title: From 0 to Go, Building a CLI for Postwoman
date: "2020-02-01"
description: Building a CLI for Postwoman without any Prior knowledge in Golang and learning golang better by building the cli.
---
![](/scrot.png)

> "All power is within you. You can do anything and everything. Believe in that" - Swami Vivekananda

You might be thinking why I started with a quote by Swami Vivekananda. This quote has been a driving factor in my pursuits to learn new things and building stuff and moving forward. 

I have been into Go for about 2 months now. I just wrote up two hacks in Go too. One was [Shelby](https://github.com/athul/shelby) and now lemme introduce you to [Postwoman CLI](https://github.com/athul/pwcli). As the name says It's a CLI client for [Postwoman 👽](https://postwoman.io)  in Go.

## The '0' 👦
Learning either Go or Rust was in my TODO list of 2019. It was only in late 2019, I had reached the mindset to learn Go. I started out on tutorials in building servers in Go. I used to code servers in Python and falled for Backend Programming. I made a bunch of servers in Go with Gin. Go was intimidating at first since it felt more like C to me, but in a few days I got the clutch of it. I still don't actually know most of Go like using slices and goroutines that much. I learn mostly by building so, I learn when I build.
## The '-1' 👶
I met Liyas Thomas, the author of Postwoman in the official Telegram Group of Postwoman. Since he too was from the state of Kerala, we had a few convos. I had opened a PR to Postwoman when it launched in August-September but it didn't get merged due to my lack of Vue/Js. But later on I had a chat with him if I did a refactor PR. He really gave me the confidence to do that and I did. The PR was reviewed and made changes by the Maintainers of PW and where it started in 1 commit it changed to 8 and the diff was **+8k and -8k**. The PR got merged and I was the **#11 Contributor of PW 🎉.** The PR didn't give me any satisfaction but later after 2 days, Liyas send me a bug and told me to try to fix that. I traversed over 2k lines of Vue code and found the bug. He made a commit and fixed it. This bug squashing gave me much satisfaction than all the contributions I've done. Later that week, a maintainer and My Friend James made a repo for a CLI in Js. So the idea for making another CLI was basically for learning for me.
## The '1' 👨
So, Liyas gave a Green Flag to work on the CLI. I considered Go as first option since I didnt know how to make one in any lang and Go was fresh in my mind. I built it in almost 2 weeks. `pwcli` is like *httpie* with displaying the Request Headers and Status Code and Output Highlighting. The Output is now limited to Json but will add support to HTML and XML in the coming days. **It also has a `send` feature in which you can give it the Postwoman-Collection.json file and it will test all the endpoints in their respective methods and output the status code**. This was actually a feature request in the Js counterpart of the CLI.    
```bash
NAME:
   Postwoman CLI - Test API endpoints without the hassle

USAGE:
   cli [global options] command [command options] [arguments...]

VERSION:
   0.0.2

DESCRIPTION:
   Made with <3 by Postwoman Team

COMMANDS:
   get      Send a GET request
   post     Send a POST Request
   put      Send a PUT Request
   patch    Send a PATCH Request
   delete   Send a DELETE Request
   send     Test all the Endpoints in the Postwoman Collection.json
   help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --help, -h     show help
   --version, -v  print the version
```
You can find **PwCLI** in GitHub at https://github.com/athul/pwcli. Consider trying it out and Giving a star.
**PwCLI is open sourced under MIT and is waiting for Feature requests and Contributions**
## The '+1' 👨‍💻
In these two weeks, I've learned a lot of Go, HTTP Requests and REST APIs. The main highlights were
- Learned Go Structs
- How to parse Json in Go
- Learned Go Slices
- Learned how to use `net/http` package of
 Go
- HTTP Requests
- Meeting the Postwoman team, especially from Kerala
- Homebrew Packaging and bits of Ruby
- Building CLIs
- My insecurity with starting a convo with new people
- Taking a workshop *(by actually taking one)*

> "Learn like your life depended on it, coz it will" - Unknown
