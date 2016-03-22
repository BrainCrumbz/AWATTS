# AWATTS

### Asp.Net Core, WebPack, Angular Two, TypeScript Starter

---

A Visual Studio 2015 solution showing how to start up a project involving following technologies:

* [Asp.Net Core](https://github.com/aspnet/Home) (formerly Asp.Net 5) to serve web pages, 
* [Angular 2](https://angular.io/) framework for client-side Single Page Application, 
* [TypeScript](http://www.typescriptlang.org/) as an alternative to JavaScript to write client code,
* [WebPack](https://webpack.github.io/) module bundler to process and build client source files, 
* WebPack [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) to 
re-compile and reload web page when client source code changes,
* [Karma](https://karma-runner.github.io) test runner and [Jasmine](http://jasmine.github.io/) BDD 
testing library to unit test client source code.

## Prerequisites

Here are the tools that should be present in your development environment in order to work with this project:

### Visual Studio environment

* Visual Studio 2015 Community Edition
* Microsoft ASP.NET and Web Tools. It should already be installed with VS2015, but make sure to update it to latest version
* Node.js Tools for Visual Studio (NTVS). It should already be installed with VS2015
* [Npm Task Runner](https://github.com/madskristensen/NpmTaskRunner), an extension for VS Task Runner Explorer 
to run npm scripts from Visual Studio, by Mads Kristensen

### .NET environment

Server side application relies on .NET:

* .NET Version Manager command line tool (DNVM). It should already be installed with VS2015
* .NET 1.0.0-rc1-update1 CLR execution environment, the full .NET framework for ASP.NET Core projects
* .NET 1.0.0-rc1-update1 Core CLR execution environment, just the Core .NET framework for ASP.NET Core projects

At current time of writing, ASP.NET 5 is still in the process of being renamed as ASP.NET Core 1, and RC1 is already out.
Things like version, install procedure, tool naming might still change in the next future.

### node.js environment

Client side application relies on JavaScript and TypeScript, but it needs node.js to be built and processed.

* [nvm-windows](https://github.com/coreybutler/nvm-windows) 1.1.0, a node.js version management utility for Windows by Corey Butler
* node.js 4.3.2
* npm 3.8.0

In order to let VS use current node.js version set by nvm (instead of its own version), go to *Tools\Options*, then
to *Project and Solutions\External Web Tools*, and make sure to sort locations so that `$(PATH)` is **above** the two 
`$(DevEnvDir)\...` locations.

![VS Options for current node.js version](https://braincrumbz.github.io/AWATTS/assets/images/Options-ProjectsAndSolutions-ExternalWebTools.png)

## First time install

Once project is opened in VS, thanks to NTVS, Visual Studio should right away suggest to update dependencies found
in package.json. If that's not the case, you can fire off `install` task from Npm Task Runner Explorer, or run 
`npm install` from console the old way (make sure to `cd` into web project root directory, first).
