---
title: HoppScotch Doc Generation
date: "2020-11-25"
description: Implementing Hopp-CLI's new feature of Automatic Documentation Generation in Go with Markdown
new: true 
---

[Hoppscotch](https://hoppscotch.io) is a popular Open Source project on GitHub. Recently it surpassed the 25k Stars milestone on GitHub. I am the **author** and current maintainer of [Hopp-CLI](hhtps:github.com/hoppscotch/hopp-cli). It had been dormant till October when I revamped the project and it underwent a major refactor. I was cursing myself for the code I had written 6 months ago. I was so ashamed at myself for that Spaghetti code I had written. The rewrite gave me new ideas like implementing a tabular output and Documentation Generation. Tabular output was easily implemented and I had to wait over a month to implement the Doc Generation.

## Initial Thoughts

The Doc generation was an already implemented feature in another Official CLI of HoppScotch. It was named as [`hopp-doc-gen`](https://githbu.com/hoppscotch/hopp-doc-gen) and it was made with JavaScript. The downside I found was that it used Vuepress to generate the docs. Vuepress is a great tool, no doubt about it, but the thought of installing vuepress or any other NPM package for docs generation is alarming. NPM tends to be data hungry and personally I seldom install NPM packages. I'm not a Js Freak. I've heard about Kube CLI generating docs with the CLI and on further research I found that this was done with the `text/template` package of Go. Go provides a Templating library by itself, how cool is that. So without having much experience in templating with Go. I took the challenge. I had commented on a [Lobste.rs](https://lobste.rs/s/q8n0le/what_are_you_doing_this_weekend#c_zvajxk) post that this was my weekend task.

## HTML Templates FTW or so I thought...

Aesthetics are a big part of a Docs site and CSS is the main thing that makes a Webpage aesthetic. TBH I'm not so good with CSS either, so I went on to search for any doc generators. [Doscify](https://docsify.js.org) seemed a good option and I went forward with it. 

I created an `index.html` file and added the templates. The data to be injected was to be taken from a JSON file which looks like this.

```json
[
  {
    "name": "Collection #1 - Prod",
    "folders": [
      {
        "name": "GET",
        "requests": [
          {
            "url": "https://httpbin.org",
            "path": "/get",
            "method": "GET",
            "auth": "Basic Auth",
            "httpUser": "user@mail.com",
            "httpPassword": "password",
            "passwordFieldType": "password",
            "bearerToken": "",
            "headers": [],
            "params": [],
            "bodyParams": [],
            "rawParams": "{}",
            "rawInput": true,
            "contentType": "",
            "requestType": "",
            "preRequestScript": "// pw.env.set('variable', 'value');",
            "testScript": "// pw.expect('variable').toBe('value');",
            "label": "",
            "name": "GET + Basic Auth",
            "collection": 0
          },
        ]
      },
      {
        "name": "POST",
        "requests": [
          {
            "url": "https://httpbin.org",
            "path": "/post",
            "method": "POST",
            "auth": "None",
            "httpUser": "",
            "httpPassword": "",
            "passwordFieldType": "password",
            "bearerToken": "",
            "headers": [],
            "params": [],
            "bodyParams": [
              {
                "key": "bparam1",
                "value": "bval1"
              },
              {
                "key": "bparam2",
                "value": "bval2"
              }
            ],
            "rawParams": "{}",
            "rawInput": false,
            "contentType": "application/json",
            "requestType": "",
            "preRequestScript": "// pw.env.set('variable', 'value');",
            "testScript": "// pw.expect('variable').toBe('value');",
            "label": "",
            "name": "POST + Body Params",
            "collection": 0,
            "folder": 1
          },
        ]
      }
    ]
  },
]
```

So many key and values right, but thankfully for the above mentioned refactor, I had rewrote the JSON parsing to be more ⚡️ and as a function for multipurpose use. 

```go
func ReadCollection(filename string) ([]Collection, error) {
	data, err := ioutil.ReadFile(filename)
	if string(data) == "" {
		return nil, errors.New("PATH is needed")
	}
	if err != nil {
		return nil, err
	}

	var jsonArr []Collection
	err = json.Unmarshal([]byte(data), &jsonArr) // Unmarshal JSON to Collection Type
	if err != nil {
		return nil, fmt.Errorf("Error parsing JSON: %s", err.Error())
	}
	return jsonArr, nil
}
```

> I might have to add better error messages for this

Go's templating is relatively easy and the main plus point is that it comes out of the Box. Like Jinja2 templating, Go templating uses `{{ }}` to define the entrypoints. For the specific purpose here, we had to loop over the `Collection` struct since it is parsed from a JSOn array. We can loop in Go Templating using `range` keyword.

- Eg: `{{ range .Folders }} ... {{ end }}`

Go's templating also supports Conditional Statements(if,else) and comparision operators(equal to, not equal to....).

With a basic understanding, I hacked up a basic template with all the important outputs and ran an HTTP Server to display the docs. Here is a snippet of the template.

```django
{{- range . -}}
      <h1>{{.Name}}</h1>
    {{if .Folders}}{{range .Folders}}
        <h2>Folder: {{.Name}}</h2>
    {{- range .Requests -}}
        <hr/><h3>{{.Name}}</h3> 
            <p>Method: <b>{{.Method}}</b></p>
            <li>{{- .URL -}}{{.Path}}</li>
            {{if .Params}}
                <p>Params</p>
                {{range .Params}}
                        <b>{{.key}}</b>:<i>{{.value}}</i><br/>
                {{- end -}}
            {{- end -}}
        {{if ne .RawParams "{}"}}
        <pre v-pre data-lang="json"><code class="lang-json">{{.RawParams}}</code></pre>
        {{end}}
        <p>Pre Request Script</p>
        <pre v-pre data-lang="js"><code class="lang-js">{{.PreRequestScript}}</code></pre> 
    {{- end -}}
{{end}}
```

This was the initial implementation which I later rewrote. The data came out perfectly, more perfect than I had imagined.

Yeah the data part works but I could't get the full out of docsify js and it became less aesthetic than what I was expecting. So I ditched writing the template in HTML and tried to rewrite the same in MarkDown.

### Down Under

Usage of Markdown is where docsify shines. Docsify automatically parses the markdown and you'll get a wonderful webpage with the docs. I searched on Google to find any blogs or stuff regarding writing templates for markdown and injecting data into them same as injecting data to HTMl. Sadly I couldn't find any........ So I tried my hand in that and it worked.