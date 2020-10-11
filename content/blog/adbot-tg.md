---
title: Telegram Bot with Adguard
date: "2020-10-10"
description: A Telegram Bot for receiving Adguard Home statistics
new: true 
---
Recently I had this idea of setting up a network-level adblocker in my Home. But sadly I don't use a fibre/broadband connection 🤷‍♂️ so I thought of setting up one on my laptop. The initial choice was PiHole(obviously) but due to the extremities of setting it up on Mac, I jumped ship to [Adguard Home](https://github.com/AdguardTeam/AdguardHome) on getting some feedback from friends. It also piqued my interest when I saw Adguard Home was written in Go and the frontend in React rather than the PHP frontend of PiHole. It was easy to set up and running and they give the instructions quite well. 

> I use Brave as my daily driver, It blocks almost all the ads(even Spotify ads on the web player)

## AdBot

No, It's not a bot that sends you ads(😝). It's a one-way bot(as of now) which means I can only receive messages like the statistics of the ads blocked overtime via adguard. I wrote the bot in Go to achieve independency of installing packages and making it run on a Raspberry Pi with a single binary.  This binary can be hooked up with a CronJob to send the data over a specified time. So, if I'm not home, I can get the statistics of the number of users on my network and related stuff. If you're unaware of creating a Telegram Bot and getting a chat id, refer [Telegram Bot Documnetation](https://core.telegram.org/bots#6-botfather)

I hooked it up a graph generator to send me an Ascii line graph and a Pie Chart image with the most blocked domains. The whole thing was hacked in 2 hours. It was a fun build. I'll explain the code piece by piece.

## The Code

As I told you the code is in Go. For starters, I used my favourite HTTP client [Insomnia](https://insomnia.rest/) to check the API endpoints on the Adguard Home's Server. Funnily enough, the only required header for such a request is an `agh_session` token. This is fixed for a server and you only need to get it once from the server and use it indefinitely for the bot. They also have a "not-so-much" working [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) header auth. It'll work with a single token the whole time. I used Insomnia's code-generator to bootstrap the bot for receiving the JSON Payload. The only things you'll need will be the Adguard Home installed and the `agh_session` token. Here is a gif of how you could get one

![AGH_Session-GIF](https://file.coffee/u/nuAQBNHR_M.gif)

### HTTP request

Here is the generated code from insomnia.

```go
package main

import (
    "encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)
func main() {

	req, _ := http.NewRequest("GET", "http://127.0.0.1/control/stats", nil)

	req.Header.Add("cookie", "agh_session=<some sha string>")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println(err)
	}

	defer res.Body.Close()
    body, _ := ioutil.ReadAll(res.Body)
}
```
The next step was to unmarshal the JSON to be used in Go.

### JSON → Go

The JSON payload received was long since it had the data regarding the blocked domains too. I used a [Json to Struct](https://mholt.github.io/json-to-go/) to convert the JSON to its valid struct types. But some JSON arrays were hard for it to comprehend so it made each struct key for each key, which was not the expected one. So I used [Go Maps](https://gobyexample.com/maps) to make it workable. This is the struct type of the JSON payload

```go
// Stats represents the data from Adguard as JSON
type Stats struct {
	ProcessingTime    float64              `json:"avg_processing_time"`
	BlockedFilter     []float64            `json:"blocked_filtering"`
	DNSQueries        []float64            `json:"dns_queries"`
	BlockedFilterNum  float64              `json:"num_blocked_filtering"`
	DNSQueriesNum     float64              `json:"num_dns_queries"`
	PT                float64              `json:"num_replaced_parental"`
	NumSB             float64              `json:"num_replaced_safebrowsing"`
	NumSS             float64              `json:"num_replaced_safesearch"`
	ReplacedPT        []float64            `json:"replaced_parental"`
	ReplacedSB        []float64            `json:"replaced_safebrowsing"`
	TimeUnits         string               `json:"time_units"`
	TopBlockedDomains []map[string]float64 `json:"top_blocked_domains"`
	TopClients        []map[string]float64 `json:"top_clients"`
	TopQueriedDomains []map[string]float64 `json:"top_queried_domains"`
}
```
So this struct unmarshals the Json to Go readable types. This makes it easier to handle the data wrangling in Go. Here is the code which parses the JSON and uses it.

```go
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// Stats represents the data from Adguard as JSON
type Stats struct {
	ProcessingTime    float64              `json:"avg_processing_time"`
	BlockedFilter     []float64            `json:"blocked_filtering"`
	DNSQueries        []float64            `json:"dns_queries"`
	BlockedFilterNum  float64              `json:"num_blocked_filtering"`
	DNSQueriesNum     float64              `json:"num_dns_queries"`
	PT                float64              `json:"num_replaced_parental"`
	NumSB             float64              `json:"num_replaced_safebrowsing"`
	NumSS             float64              `json:"num_replaced_safesearch"`
	ReplacedPT        []float64            `json:"replaced_parental"`
	ReplacedSB        []float64            `json:"replaced_safebrowsing"`
	TimeUnits         string               `json:"time_units"`
	TopBlockedDomains []map[string]float64 `json:"top_blocked_domains"`
	TopClients        []map[string]float64 `json:"top_clients"`
	TopQueriedDomains []map[string]float64 `json:"top_queried_domains"`
}

func main() {

	req, _ := http.NewRequest("GET", "http://127.0.0.1/control/stats", nil)

	req.Header.Add("cookie", "agh_session=<some sha string>")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println(err)
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	var stats Stats

	if err := json.Unmarshal(body, &stats); err != nil {
		log.Println(err)
    }
```
Nothing fancy of any type, just plain Go code. The next is to generate the Ascii graph from the data we got.

### Ascii 📈

There was a [package in Go](https://github.com/guptarohit/asciigraph)  which generates Ascii graphs, not to reinvent the wheel, I just hooked it up to work with the data received. I reduced it's height to enclose it inside a single message. Here are the code and output of the graph

```go

func (s *Stats) generateGraph(tp string) string {
	defer log.Println("Graph Generated")
	graphof := map[string][]float64{
		"DNS": s.DNSQueries,
		"BLK": s.BlockedFilter,
	}
	caption := map[string]string{
		"DNS": "Number of DNS Queries",
		"BLK": "Number of Blocked Queries",
	}
	graph := asciigraph.Plot(graphof[tp], asciigraph.Height(10), asciigraph.Caption(caption[tp]))
	return graph
}

```
This is not a function but a method in Go. This depends on the Struct type Stats(specifically the pointer) to work. I also introduced a map to get the data of the specified stuff like no. of DNS queries and the number of blocked queries.  

Here is a sample output of the Graphs from the data I received both the DNS Queries and Blocked queries

```text

DNS Query Graph :

 888 ┼╭╮
 799 ┤││               ╭╮   ╭
 710 ┤││               ││   │
 622 ┤│╰╮             ╭╯│   │
 533 ┤│ │ ╭╮          │ │   │
 444 ┤│ │ ││          │ │   │
 355 ┤│ │ │╰╮        ╭╯ │   │
 266 ┤│ │ │ │        │  │   │
 178 ┤│ │╭╯ │        │  │   │
  89 ┤│ ╰╯  │        │  │   │
   0 ┼╯     ╰────────╯  ╰───╯

    Number of DNS Queries

-----

Blocked Graph:

 213 ┼                      ╭
 192 ┤                      │
 170 ┤                 ╭╮   │
 149 ┤╭╮   ╭╮          ││   │
 128 ┤││   ││          ││   │
 106 ┤││   ││          ││   │
  85 ┤││  ╭╯│         ╭╯│   │
  64 ┤││  │ │         │ │   │
  43 ┤│╰╮ │ │         │ │   │
  21 ┤│ │ │ │        ╭╯ │   │
   0 ┼╯ ╰─╯ ╰────────╯  ╰───╯

    Number of Blocked Queries

```

The graph data is an array of 24 elements which means data for each hour. I don't use my laptop 24 hours so the 0 lines in some places. We call this method from the main function just as we unmarshal the JSON.

### Pie  📈

The Pie Chart will be the data of the Top Blocked Domains. I used `github.com/wcharczuk/go-chart` as the charting library for the pie graph. Initially, it was a bit hard to work with but got the idea of it after some time tinkering with it. It creates an image, unlike the Ascii Chart which is just string. Here is the code for the generating the Pie Chart image.

```go
func (s *Stats) pieGrph() {
	defer log.Println("Pie Graph Generated and Image Send")
	var chartValues []chart.Value
	for i := range s.TopBlockedDomains {
		for k, v := range s.TopBlockedDomains[i] {
			values := chart.Value{Label: fmt.Sprintf("%.f:%s", v, k), Value: v}
			chartValues = append(chartValues, values)
		}
	}
	pie := chart.PieChart{
		Width:  512,
		Height: 512,
		Values: chartValues,
	}
	f, _ := os.Create("output.png")
	defer f.Close()
    pie.Render(chart.PNG, f)
```
This too is a method. This method creates a 512x512 image and saves it as `output.png`. This image will be sent to us via telegram. We also call this method from the main function just as we unmarshal the JSON.

### Sending the Message

Telegram has an HTTP API which makes it quite easy to send messages via bots. But I used a package in Go which handles the Telegram API quite okay, so I used it. Here is the code for sending the Ascii Graph via telegram,

```go
func (s *Stats) sendTGMessage() {
	defer log.Println("Message Sent...")
	percent := (s.BlockedFilterNum / s.DNSQueriesNum) * 100
	message := fmt.Sprintf("Total DNS Queries : %.f\n\nDNS Queries Blocked : %.f\n\n-----\n\nPercent of Queries Blocked: %.2f%%\n\n-----\n\nDNS Query Graph :\n\n`%s`\n\n-----\n\nBlocked Graph:\n\n`%s`\n", s.DNSQueriesNum, s.BlockedFilterNum, percent, s.generateGraph("DNS"), s.generateGraph("BLK"))
	c := tbot.NewClient("<telegram_bot_token>", http.DefaultClient, "https://api.telegram.org")
	if _, err := c.SendMessage("<telegram_chat_id>", message, tbot.OptParseModeMarkdown); err != nil {
		log.Printf("unable to send message: %v", err)
    }
    s.pieGrph()
	if _, err := c.SendPhotoFile("<telegram_chat_id>", "output.png", tbot.OptCaption("PieGraph of Blocked Domains")); err != nil {
		log.Printf("unable to send image: %v", err)
	}
}
```

This sends a bit more numerical values which are related to Adguard. It just takes in the image in `output.png` and sends it to the chat. Here is the output image. The ugly thing is that there is a lot of data than the pie graph can hold so it renders some of the text quite poorly but I don't mind that. Here is the output for the above method.

```text
Total DNS Queries: 5273

DNS Queries Blocked: 927

-----

Per cent of Queries Blocked: 17.58%

-----

DNS Query Graph :

 888 ┼╭╮
 799 ┤││               ╭╮   ╭
 710 ┤││               ││   │
 622 ┤│╰╮             ╭╯│   │
 533 ┤│ │ ╭╮          │ │   │
 444 ┤│ │ ││          │ │   │
 355 ┤│ │ │╰╮        ╭╯ │   │
 266 ┤│ │ │ │        │  │   │
 178 ┤│ │╭╯ │        │  │   │
  89 ┤│ ╰╯  │        │  │   │
   0 ┼╯     ╰────────╯  ╰───╯

    Number of DNS Queries

-----

Blocked Graph:

 213 ┼                      ╭
 192 ┤                      │
 170 ┤                 ╭╮   │
 149 ┤╭╮   ╭╮          ││   │
 128 ┤││   ││          ││   │
 106 ┤││   ││          ││   │
  85 ┤││  ╭╯│         ╭╯│   │
  64 ┤││  │ │         │ │   │
  43 ┤│╰╮ │ │         │ │   │
  21 ┤│ │ │ │        ╭╯ │   │
   0 ┼╯ ╰─╯ ╰────────╯  ╰───╯

    Number of Blocked Queries

```

![PieGraph](https://file.coffee/u/9ItgsPR2Xu.jpeg)

So that's the whole bot. Here is the full code, I'll upload it to GitHub later 😁

```go

// main.go

package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/guptarohit/asciigraph"
	"github.com/wcharczuk/go-chart"
	"github.com/yanzay/tbot"
)

// Stats represents the data from Adguard as JSON
type Stats struct {
	// Average Processing Time for DNS Queries
	ProcessingTime float64 `json:"avg_processing_time"`
	// When the Filters did the Job. The slice consists of 24 elements(24 hours)
	// Each item represents the Blockings of Each Hour
	BlockedFilter []float64 `json:"blocked_filtering"`
	// Number of DNSQueries received by Adguard.
	//The slice consists of 24 elements(24 hours)
	// Each element is the queries received in an hour
	DNSQueries        []float64            `json:"dns_queries"`
	BlockedFilterNum  float64              `json:"num_blocked_filtering"`
	DNSQueriesNum     float64              `json:"num_dns_queries"`
	PT                float64              `json:"num_replaced_parental"`
	NumSB             float64              `json:"num_replaced_safebrowsing"`
	NumSS             float64              `json:"num_replaced_safesearch"`
	ReplacedPT        []float64            `json:"replaced_parental"`
	ReplacedSB        []float64            `json:"replaced_safebrowsing"`
	TimeUnits         string               `json:"time_units"`
	TopBlockedDomains []map[string]float64 `json:"top_blocked_domains"`
	TopClients        []map[string]float64 `json:"top_clients"`
	TopQueriedDomains []map[string]float64 `json:"top_queried_domains"`
}

func main() {

	req, _ := http.NewRequest("GET", "http://127.0.0.1/control/stats", nil)

	req.Header.Add("cookie", "agh_session=<some sha string>")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Println(err)
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	var stats Stats

	if err := json.Unmarshal(body, &stats); err != nil {
		log.Println(err)
	}
	stats.sendTGMessage()
	stats.pieGrph()
}
func (s *Stats) generateGraph(tp string) string {
	defer log.Println("Graph Generated")
	graphof := map[string][]float64{
		"DNS": s.DNSQueries,
		"BLK": s.BlockedFilter,
	}
	caption := map[string]string{
		"DNS": "Number of DNS Queries",
		"BLK": "Number of Blocked Queries",
	}
	graph := asciigraph.Plot(graphof[tp], asciigraph.Height(10), asciigraph.Caption(caption[tp]))
	return graph
}

func (s *Stats) sendTGMessage() {
	defer log.Println("Message Sent...")
	percent := (s.BlockedFilterNum / s.DNSQueriesNum) * 100
	message := fmt.Sprintf("Total DNS Queries : %.f\n\nDNS Queries Blocked : %.f\n\n-----\n\nPercent of Queries Blocked: %.2f%%\n\n-----\n\nDNS Query Graph :\n\n`%s`\n\n-----\n\nBlocked Graph:\n\n`%s`\n", s.DNSQueriesNum, s.BlockedFilterNum, percent, s.generateGraph("DNS"), s.generateGraph("BLK"))
	c := tbot.NewClient("<telegram_bot_token>", http.DefaultClient, "https://api.telegram.org")
	if _, err := c.SendMessage("<telegram_chat_id>", message, tbot.OptParseModeMarkdown); err != nil {
		log.Printf("unable to send message: %v", err)
    }
    s.pieGrph()
    if _, err := c.SendPhotoFile("<telegram_chat_id>", "output.png", tbot.OptCaption("PieGraph of Blocked Domains"));err != nil {
		log.Printf("unable to send image: %v", err)
	}
}

func (s *Stats) pieGrph() {
	defer log.Println("Pie Graph Generated and Image Send")
	var chartValues []chart.Value
	for i := range s.TopBlockedDomains {
		for k, v := range s.TopBlockedDomains[i] {
			values := chart.Value{Label: fmt.Sprintf("%.f:%s", v, k), Value: v}
			chartValues = append(chartValues, values)
		}
	}
	pie := chart.PieChart{
		Width:  512,
		Height: 512,
		Values: chartValues,
	}
	f, _ := os.Create("output.png")
	defer f.Close()
	pie.Render(chart.PNG, f)
}
```

That's it. Try a `$ go run main.go` to try out the bot. For any queries feel free to create a comment or reach out to me via [Twitter](https://twitter.com/athulcajay).

---
Shameless Plug but you can donate to me on [BMC ☕️](https://www.buymeacoffee.com/athulca) or [Paypal](https://paypal.me/athulca)
<p align="center">Happy Hacking ⚡️</p>
