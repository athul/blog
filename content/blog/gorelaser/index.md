---
title: Go ❤️ Travis+Gorelaser
date: "2020-01-05"
description: Using Travis CI with Goreleaser to Build and Deploy Your Go Applications to GitHub Releases and Godownloader to help users download your packages the easy way....🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳
---
Past Month, I've been wworking on Shelby a lot. I had set up my CI pipeline using [Travis CI](https://travis-ci.org/) by a `.travis.yml` file from [Powerline Go](https://github.com/justjanne/powerline-go).I used a shell script from [Mimir](https://github.com/talal/mimir)'s documentaion to help users install the binary or tar.   
I had tweaked both of em a bit to make it work for Shelby's requirements.   

#### The Email
One day morning, I e-mailed [@talal](ttps://github.com/talal/) since I used some of the source code from Mimir for bootstrapping the project. He was so happy to receive the Email and gave mesome much needed feedback for Shelby. Out of this was one to try out Goreleaser for deployment. So I went on try it. Some other feedback also came from one of my telegram group [TinkerHub](https://t.me/TinkerHub/6839) to change the default installation path.
> We'll be using goreleaser to Deploy a Go application to GitHub Releases.I am writing this because the Docs were a bit confusing to me.

---

## Setting Up Goreleaser and Travis CI

All the installation Instructions of Gorelaser can be found in their [Official Docs](https://goreleaser.com/install/).     
After Installing Goreleaser, you just have to `cd` to that go repository you want to deploy and run `goreleaser init`. This command will create a `goreleaser.yml` already filled with some commands and stuff.      

**Here is the Gorelaser part to Deploy the Application to GitHUb Relases**  
```yml
release:
  github:
    owner: <username>
    name: <repo>
```
You can add this to the bottom of the `.gorealeaser.yml` file and it'll work fine.

**For Deploying to GitHub Releases Add this to your `.travis.yml` file**

```yml
deploy:
- provider: script
  skip_cleanup: true
  script: curl -sL https://git.io/goreleaser | bash
  on:
    tags: true
```
This will only deploy to GitHub releases when a tag is created and pushed. You will need a GitHub Token in the Repo scope and while adding it to Travis Secrets you must name it like `GITHUB_TOKEN` only.

---
### Some tips before pushing a tags for checking Goreleaser.
You can always try goreleaser in you the terminal. 
- Try `goreleaser release --skip-publish` command and you can always test with this before you push to GitHub. 
I'd totally suggest this since I had simply pushed without any testing and I had to write the whole thing...again.

---

## GoDownloader
You can install godownloader from their [releases page](https://github.com/goreleaser/godownloader/releases). Follow the next steps to use it Globally
```sh
$ tar -xvf <filename>.tar.gz
$ mv godownloader /usr/local/bin/
```
Now go to your working folder and run
```sh
$ godownloader --repo=<user>/<repo> > godownloader.sh
```
This will make a `godownlaoder.sh` file which can be used as an installation script.

----
## Here are my Pipelines
- `.travis.yml`

```yml
sudo: false
language: go

go:
  - "1.13"
before_script:
  - go get -v
  - go build
  - rm -rf shelby
#
# before we deploy, we go build for all operating systems we would like to support
deploy:
- provider: script
  skip_cleanup: true
  script: curl -sL https://git.io/goreleaser | bash
  on:
    tags: true
```
- `.goreleaser.yml`

```yml

before:
  hooks:
    # you may remove this if you don't use vgo
    - go mod tidy
    # you may remove this if you don't need go generate
    - go get -v 
builds:
- 

  env:
    - CGO_ENABLED=0
  ldflags:
    - -s -w 
  goos:
    - darwin
    - linux
  goarch:
    - amd64
archives:
- replacements:
    darwin: Darwin
    linux: Linux
    amd64: x86_64
checksum:
  name_template: 'checksums.txt'
snapshot:
  name_template: "{{ .Tag }}"
changelog:
  sort: asc
  filters:
    exclude:
    - '^docs:'
    - '^test:'
release:
  github:
    owner: athul
    name: shelby
```
