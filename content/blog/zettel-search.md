---
title: Indexed 🧠 and Fuzzy 🔍
date: "2020-11-08"
description: How I implemented a search feature on statically generated site in Go 
new: true 
---
In these past few months, I had a plan to set up a wiki for myself. I was exploring my options on what tool I should use. This thought came up in September and this was the same time for FOSS United's Hackathon. Post Hackathon discussions on the group was quite interesting and this was where the whole idea of a [Digital Garden](https://joelhooks.com/digital-garden)  came up. On further research this seemed a good option for me to organize my notes and ideas. I looked at my Options, There were [Roam Research](https://roamresearch.com/) and [Obsidian](https://obsidian.md/) which were quite cool but Roam was paid  and Obsidian was an electron app😬. I also wanted to make these Publically available when it was good, so **hosting** it was also necessary for me so I went on with my searching. Then there was [Foam](https://foambubble.github.io/foam/) and [TiddlyWiki](https://tiddlywiki.com/) but sadly for me these were less *hackable* except for tiddlywiki. Then comes [zettel](https://github.com/hackstream/zettel) which was a project for the said hackathon. In simple terms zettel is a SSG/CLI for markdown files. It supported wikilinks(`[[]]`) and was made with Go 😻. I had been contributing to it's codebase. I had implemented the syntax highlighting and Math Features to it.

Search was a most wanted feature for me since it would reduce my time to look into my articles when I'm would not be in my home(post pandemic). So I tried to implement it

## Searching to set up search

Since Zettel was made with Hugo, I initially searched for how to implement a search feature in a Hugo[^1] website. The results I got from google was from the official Hugo [docs](https://gohugo.io/tools/search/). There were a few commercial services and a few hacked up ones. The [fastSearch](https://gist.github.com/cmod/5410eae147e4318164258742dd053993) gist was quite interesting and matched to my usecase. The next step was how I could port that from Hugo to zettel.

## Indexing

Further searching got me the idea of how search works. For starters, it requires an Index file with the data on details about what we would be searching. Here is a rough representation for need of search indexes

![](./img/search.png)

It's just like the index of a book where you can find what's inside the book by looking at index. The Index file is important because it makes the search faster. It's quite time consuming to scrape the whole website to create the index for use in search and since we don't have a server side to scrape the data, this method becomes a no-go for our case. We want to create an index at build time which is quite a lot easier.

Zettel have this feature of showing a graph about the connected markdown pages. It uses a graph data type to create this and shows in the frontend using [sigma.js](https://github.com/jacomyal/sigma.js/) . The Markdown files are the nodes and the connections are the edges. Sigma JS uses a JSON file to generate in the frontend. This JSON file or `graph.json` is generated at build time.

So I used the same trick to generate the Index file for search. I created a new structure for the Search Index, it looks like this

```go
type PostData struct {
  Title     string   `json:"title"` // the Title of the page
  Permalink string   `json:"permalink"` // the Permalink/Link of the Page
  Tags      []string `json:"tags"` // the Tags of the page if available
}
```

At build-time this will generate a json file like this

```json
[
    {
        "title": "Adguard Telegram Bot",
        "permalink": "posts/adbot.html",
        "tags": [
            "go",
            "code",
            "other"
        ]
    },
    {
        "title": "Config for Zettel local dev with Air",
        "permalink": "posts/air-zettel.html",
        "tags": [
            "code",
            "other"
        ]
    }
]
```

And this will act as the search index for the pages. Next was to work on the frontend with some Js and CSS

## Fu'z'ing

After the Index we need to use a Js library to parse the json index and return us the result. fastSearch gist uses [Fuze.js](https://fusejs.io/) so I too used the same. Fuze.js is a fuzzy search library which takes in a JSON index and returns from the JSON index if the item is found as Js Arrays. The code for making the search work was available on the gist but needed some modifications for the current use case. I'm not that familiar with Js but I could read and understand the code. I was able to ahck the code up and made it working.
```js
// Code by Craig Mod under MIT License
// https://gist.github.com/cmod/5410eae147e4318164258742dd053993
var fuse; 
var list = document.getElementById('searchResults');
var first = list.firstChild;
var last = list.lastChild;
var maininput = document.getElementById('searchInput');
var resultsAvailable = false;
var baseURL = window.location.pathname.split("/")[1]
if (baseURL.length === 0 || baseURL.includes("html") || baseURL.includes("posts")) {
    baseURL = window.location.origin
} else {
    baseURL = "/" + baseURL
}
console.log(baseURL)
loadSearch()
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 27) {
      document.activeElement.blur();
      resultsAvailable = false;
      list.style.display="none"
  }
  if (event.keyCode == 40) {
    if (resultsAvailable) {
      event.preventDefault();
      if ( document.activeElement == maininput) { first.focus(); } 
      else if ( document.activeElement == last ) { last.focus(); } 
      else { document.activeElement.parentElement.nextSibling.firstElementChild.focus(); } 
    }
  }
  if (event.keyCode == 38) {
    if (resultsAvailable) {
      event.preventDefault();
      if ( document.activeElement == maininput) { maininput.focus(); } 
      else if ( document.activeElement == first) { maininput.focus(); } 
      else { document.activeElement.parentElement.previousSibling.firstElementChild.focus(); } 
    }
  }
});
document.getElementById("searchInput").onkeyup = function(e) {
    list.style.display=""
  executeSearch(this.value);
}
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}
function loadSearch() { 
  fetchJSONFile(baseURL + "/data/search.json", function(data){
    var options = { 
      shouldSort: true,
      location: 0,
      distance: 100,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: ['title','tags']
    };
    fuse = new Fuse(data, options); 
  });
}
function executeSearch(term) {
  let results = fuse.search(term); 
  let searchitems = ''; 
  if (results.length === 0) { 
    resultsAvailable = false;
    searchitems = '';
  } else { 
    for (let item in results.slice(0,5)) { 
    const title = results[item].title.replace(new RegExp(term, "gi"), (match) => `<mark class="searchHgl">${match}</mark>`);
    tags = results[item].tags.map((value)=>{
      return value.replace(new RegExp(term, "gi"), (match) => `<mark class="searchHgl">${match}</mark>`);
    })
    searchitems = searchitems + '<li><a href="' + baseURL + '/' + results[item].permalink + '" tabindex="0"><span class="title">' + title + "</span> — " + tags + "</a></li>";
    }
    resultsAvailable = true;
  }
  document.getElementById("searchResults").innerHTML = searchitems;
  if (results.length > 0) {
    first = list.firstChild.firstElementChild; 
    last = list.lastChild.firstElementChild; 
  }
}
```
I also added some fun highlighting for the resulted search terms using the `<mark>` tag of HTML(semantic HTML FTW🙌). I modified the Js code from the original one and removed the `CMD + /` option to start the search. The keys to search from the index are the title and tags. Indexing the contents will add a lot of page load time and the JSON will be of much bigger size when scaled.

The CSS part was a tad tricky since I don't know CSS. I had some help from my friend who over a call made it look better and more compact. 

Here is the End Result 👇

![](./img/search.gif)

I have added the whole code for the JS part and the CSS part as a GitHub Gist[^2] 😁 with instructions too.

[^1]: Hugo is a static site generator in Go, https://gohugo.io 
[^2]:https://gist.github.com/athul/0d47f7e1b677de3f3ed2b756ae1fffac 