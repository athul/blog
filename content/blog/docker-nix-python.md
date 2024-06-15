---
title: "Python + Nix Flakes + Containers"
date: "2024-05-15"
description: "Building Container Images using Nix Flakes for Python(FastAPI)"
tags: ["tech", "nix"]
new: true
---

I always wanted to try out Nix once I got some time other than work. Nix seemed really good and felt like something to invest in and build stuff with. But as every other blog post on the visible internet says, Nix is not something easy to learn and has quite the learning curve.

I recently moved my personal laptop to a ThinkPad running Linux and thought why not try Nix on this. I always heard that with Nix you can build quite the minimal docker images and make it extra reproducible. So I set on the journey to use Nix and build docker images on it, coz why not :shrug:

I'm better off learning by doing which is not the best way to learn things but works for me. So I went on to make something with nix, like lets say make a docker container for a small FastAPI app. 

The FastAPI app only has one route and should be able to run as "dev" using Uvicorn because I don't want it to run on Prod machines or anything but just for building for the fun of it. Initially I was thinking whether I should use nix without flakes and do everything hardcore and later got into the conclusion that flakes are the best and should be the one stop shop for nix stuff. So here goes.

## Level 1: The Development Environment

I generally prefer to not install stuff globally other than my editor and it's configs and some few stuff like Bat, fzf and Python(the interpreter). So to start off Nix, the best way should be to create and use a development environment. I wanted to install Poetry and latest Python3.11 . So I started off by creating a new Directory after install Nix and enabling flakes.

```bash
mkdir base_api
cd base_api

nix flake init
```

So we'll get a template empty flake with just an Input and Output based on the current system architecture. Something like this,

```nix
{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: {

    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;

    packages.x86_64-linux.default = self.packages.x86_64-linux.hello;

  };
}
```

Once I got the template flake all done, I went onto make the devShell. For making the devShell, I need to install a few things like:
- **Python** duh!
- **Poetry** for package management 

DevShells with Nix Flakes require you to add an extra config on the `outputs` of the Flake. Nix gives us `mkShell` function for doing so. So to create the devShell we also need to specify the system architecture to create the shell on. To create the shell, I added the following lines onto the Flake,

```nix
devShells.x86_64-linux.default = pkgs.mkShell {
    buildInputs = [
      pkgs.python3
      pkgs.poetry
    ];
```

Once I added these and ran `nix develop`, Nix installed the required stuff created a new dev shell :tada: . This shell has all the required stuff like Poetry and Python3.

But, running `poetry shell` also gave some bash errors which on further checking showed that bashInteractive was required, so I added that too to the buildInputs of the shell.

```diff
devShells.x86_64-linux.default = pkgs.mkShell {
    buildInputs = [
      pkgs.python3
      pkgs.poetry
+     pkgs.bashInteractive
    ];
```

Once all the devShell was set, I need to write some code.



{{<callout emoji="💡" text="You can also install the dependencies without using poetry altogether using Nix itself too" >}}

## Level 2: Writing the Code

Since I was in the learning phase of Nix, I just thought why not run a FastAPI app? It was simple, no magic was needed and wasn't that hard either. So I just spewed out some code with a single handler to return `Hello from Nix`. The code is basic so not attaching anything of sorts. FastAPI also needs uvicorn so installed that as well

## Level 3: Making it Useful. Making a Container Image

Initially I was thinking in the usual Dockerfile way of installing the dependencies and running the code as is rather than making it a wheel or package of sorts. I was wrong in the thought as Nix was expecting more of a "Nix way" of things. My thought process came from the not-so-required-for-production standpoint that you just need to run the same commands which you use to run in dev like `uvicorn main:app --reload` which usually spins up the dev server and makes the service accessible on the port.

But I was wrongggg.

### Level 3.1: Building the Python Package 

The Nix way as I understand it is to build the package and use. So I went on to set the FastAPI app as a project, whereas I generally tend to do the things as a script and be done with it. I used poetry for setting up the project as a package and it was pretty straightforward.

The next task at hand was to convert the python project into a nix derivation. `poetry2Nix` does this really well and without much headaches, so went on with it. Adding `poetry2Nix` was quite simple too and it was just adding the project URL to the flake inputs and converted the package to nix derivation in the outputs. 

Inputs: 
```diff
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
+   poetry2nix = {
+     url = "github:nix-community/poetry2nix";
+   };
+     inputs.nixpkgs.follows = "nixpkgs";
  };
```

Outputs:
```diff
outputs = { self, nixpkgs, poetry2nix }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
+     inherit (poetry2nix.lib.mkPoetry2Nix { inherit pkgs; }) mkPoetryApplication;
+
+     app = mkPoetryApplication {
+       projectDir = ./.;
+     };
...
```

This is where the part I thought it might go well, but again was met with hardships. The first time I ran this, the python project was not able to successfully make a derivation. There was a lot of verbose output due to some packages not able to compile(PyYaml) and went on to why that happened and it seemed like and some dependencies were not available to build, so added an override to use python wheels as default. But there was also a blocker for another package where there was no wheels built for it. I added an override for that package to build without wheels.

```diff
 outputs = { self, nixpkgs, poetry2nix }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      inherit (poetry2nix.lib.mkPoetry2Nix { inherit pkgs; }) mkPoetryApplication;
+     inherit (poetry2nix.lib.mkPoetry2Nix { inherit pkgs; }) overrides;

    app = mkPoetryApplication {
        projectDir = ./.;
+       preferWheels = true;
+       overrides = overrides.withDefaults (self: super: {
+         watchfiles = super.watchfiles.override {
+           preferWheel = false;
+         };
+       });
      };
```

You can see that I defaulted all packages to use wheels but if wheels aren't available, build the package. The app derivation now works!!!

### Level 3.2: Building the Container Image

This was the end goal of the whole trying out Nix. Nix has a built-in container Image builder called `buildImage` or `buildLayeredImage` which again takes in the inputs of the image config and spews out the image. An OCI compliant image.

Similar to how we made a derivation of the python package we can do the same with making it a container image. Just as above we make a new output for the flake which generates the docker image.

```diff
+dockerImage = pkgs.dockerTools.buildLayeredImage {
+  name = "base_api";
+  tag = "latest";
+  created = "now";
+  contents = [ app.dependencyEnv pkgs.bashInteractive ];
+  config = {
+    Cmd = [ "${app.dependencyEnv}/bin/uvicorn" "base_api.main:app" "--host=0.0.0.0" ];
+    ExposedPorts = {
+      "8000/tcp" = { };
+    };
+  };
+};
```

Yep that's it. You can see that the `app` here is the python derivation that we made from poetry2Nix. The `app.dependencyEnv` is from poetry2Nix where all the python Dependencies are available. Once you're good to go, we need to add one more line to the outputs of the flake to make sure we can build the container

```diff
in
  {
+  packages.x86_64-linux.default = dockerImage;
  ...
```

you can run `nix build` and it will generate the OCI compliant container image. The image will be a tarball and to load that to docker or podman we can run `docker load < result`. Once the image is available you can run it as `docker run -p 8000:8000 --rm localhost/base_api:latest` and further you can tag it and push it to a registry and use it in multiple machines.

Here is how the whole flake looks like

```nix
{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    poetry2nix = {
      url = "github:nix-community/poetry2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, poetry2nix }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      inherit (poetry2nix.lib.mkPoetry2Nix { inherit pkgs; }) mkPoetryApplication;
      inherit (poetry2nix.lib.mkPoetry2Nix { inherit pkgs; }) overrides;

      app = mkPoetryApplication {
        projectDir = ./.;
        preferWheels = true;
        overrides = overrides.withDefaults (self: super: {
          watchfiles = super.watchfiles.override {
            preferWheel = false;
          };
        });
      };

      dockerImage = pkgs.dockerTools.buildLayeredImage {
        name = "base_api";
        tag = "latest";
        created = "now";
        contents = [ app.dependencyEnv pkgs.bashInteractive ];
        config = {
          Cmd = [ "${app.dependencyEnv}/bin/uvicorn" "base_api.main:app" "--host=0.0.0.0" ];
          ExposedPorts = {
            "8000/tcp" = { };
          };
        };
      };
    in
    {
      packages.x86_64-linux.default = dockerImage;
      packages.x86_64-linux.app = app;
      devShells.x86_64-linux.default = pkgs.mkShell {
        buildInputs = [
          pkgs.bashInteractive
          pkgs.poetry
          pkgs.python3
        ];
        shellHook = ''
          echo "Initializing Python env"
          poetry lock
          poetry shell
        '';
      };
    };
}
```

Just make sure to cross compile to ARM machines too for multi system use :sweat_smile:

