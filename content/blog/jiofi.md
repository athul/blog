---
title: Jiofi-CLI
date: "2020-08-01"
description: Introducing Jiofi-CLI. A CLI interface for getting your Jiofi Device Info.
---
JioFi ia a portable wifi hotspot for personal use by Jio. They have somewhat generous plans and are a major telecom provider in India. Jiofi has a web dashboard to display the current details regarding the data usage, battery status and number of devices connected to the network. But I am too lazy to go to the dashboard to check the data out. So I built a small Python CLI to monitor the jiofi device from the network. I call it Jiofi-CLI. You can find the source code on GitHub at [Jiofi-CLI](https://github.com/athul/jiofi-cli). It's easy to install and you can install it with `pip`. The Python Package Manager.

## The Build Breakdown

Before digging in deep, I saw a [repo on GitHub](https://github.com/anandubajith/jiofi-status) regarding jiofi that scrapes data from the dashboard of a Jiofi and this seemed a legit solution for getting the info. So Initial solution which came into mind for getting the data was **Web Scraping**!! 😈. So went on to scrape the dashboard without any prior knowledge in web scraping. I read a few articles on using Beautiful Soup with Requests for fetching the data and parsing the HTML. I went forward with it for a bit and I found out that the data part won't be shown in the scraped output. I was *sad*😓. I don't have any idea on moving forward without the data. Then the geek inside me woke up. "If the data can't be scraped, then the data has to come from somewhere". A sudden `Ctrl+Shift+i` took me to the chrome developer console.

I spend half an hour tryin to figure out where the data is coming from. Trying the Networks tab finally yeilded some luck. I saw a pattern in the *waterfall* tab in the Network section. About 300+ requests are send in the span of 10 mins. Okay that seems interesting. I checked all the XHR requests and found the motherlode. A series of POST requests were being sent to the JioFi's internal API server. That was a `xxx-form-url-encoded` requests to the endpoint. *_An internal API⚡️⚡️_*. I checked the request headers and saw that a specific keyword was used to fetch the data. These were for LTEStatus, DeviceStatus, WANStatus and so on. I tried to get the data from Insomnia which is a REST Client since Postwoman had shown me a few errors and I was too lazy to fix the errors with Postwoman for that time. Those errors were due to local endpointsand not anything serious. 

It worked on Insomnia, I received the data that was to be used for the web dashboard or in simple terms, I mocked the web dashboard of JioFi with Insomnia. Win 🙌 Win. The response was like any other API response, in JSON. Here is the sample response.

```json
{
  "Page": "GetLTEStatus",
  "Mask": "",
  "connected_status": "Attached",
  "connection_time": "00:00:57:19",
  "signal_strength": "Normal",
  "operating_mode": "TDD",
  "operating_band": "Band 40",
  "bandwidth": "20 MHz",
  "earfcn": "38750",
  "active_cell_id": "123",
  "plmn": "405 862",
  "apn_in_use": "jionet",
  "gcellid_pcellid": "12345",
  "eCellid": "12345",
  "ecgi": "1234567",
  "rsrp": "-106",
  "rsrq": "-13",
  "rssi": "74",
  "sinr": "9.8",
  "cinr": "not support",
  "tx_rate_total_data_transferred": "11.91 Kbps / 918.67 Kbyte",
  "rx_rate_total_data_received": "359.30 Kbps / 18.31 Mbyte",
  "ul_operator_limit": "50000000",
  "dl_operator_limit": "100000000"
}
```

This JSON response once hooked up with Python will give the precise data. I used Python's requests library to fetch the json from the URL. I divided all the Pages(Page of the specific Keyword, like `"Page": "GetLTEStatus"`) to their respective functions to print the specific data to Stdout. Nothing fancy, just the `print` function of Python.

Once I made out these functions, I need to implement a CLI interface to be the icing on the cake. Initially went on with Argparse since it's builtin and has a lot of cool features. Argparse then felt a bit daunting, so I tried it with Click. Click also showed some errors due to some function's optional arguments, I dropped it. So a=searching for another one, I found out about [fire](https://github.com/google/python-fire). It had a really easy API and it just helped me finish the job quite quickly. I was completed with a CLI and ready for packaging. My friend GKR helped me on packaging the CLI and it was on pypi after a few hours(*I was lazy to finish it duh...*) and that was my first python package on Pypi. You can find it [here](https://pypi.org/project/jiofi/). 

This is the output of Jiofi command when installed on your system

```bash
$ jiofi
NAME
    jiofi

SYNOPSIS
    jiofi COMMAND

COMMANDS
    COMMAND is one of the following:

     devices
       Prints a tabular view of all the connected devices in the network

     speed
       Prints the Current upload and download speed

     basic
       Get basic Details like Battery charge and state, no of connected devices and data used in <time>

     usage
       Get Data usage in Upload and Download data in <time>

     device
       Get Details of the device, Battery Charge, Battery State, Phone number or MSISDN
```

This was the only place I used fire to hook it up with the functions

```python
fire.Fire({
      'devices': getDevices,
      'speed': getBandwidth,
      'basic':getBasicDetails,
      'usage':getWanInfo,
      'device':deviceDetails
  })
```

Finding out about the Internal API was a 🤯 for me and it feels great to hacked on this. You can install the cli by 
```bash
$ pip3 install jiofi --user
```

And this will install system wide. You can use it from anywhere with the terminal. I have tested it on Jiofi4 and heard that Jiofi6 has a different API, maybe rewriting this to Go is in my mind and would be fast too 🤪. There are a few bugs here and there and I try to fix it on my spare time. If you feel like contributing, feel free to open an Issue or a PR on the [GitHub Repository](https://github.com/athul/jiofi-cli), and can contact me via [email](mailto:athul8720@gmail.com). 

Happy Hacking ⚡️