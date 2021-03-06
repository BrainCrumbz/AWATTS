# AWATTS

### Asp.Net Core, WebPack, Angular Two, TypeScript Starter

---

A Visual Studio 2015 solution showing how to start up a project involving following technologies:

* [ASP.NET Core](https://github.com/aspnet/Home) (formerly ASP.NET 5) to serve web pages,
* [Angular 2](https://angular.io/) framework for client-side Single Page Application,
  - Ahead Of Time (AOT) compilation for a quicker application startup
* [TypeScript](http://www.typescriptlang.org/) 2 as an alternative to JavaScript to write client code,
  - @types to include type definitions of external code
* [WebPack](https://webpack.github.io/) 2 module bundler to process and build client source files,
  - WebPack [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) to
re-compile and reload web page when client source code changes,
  - Development, test and production builds
* [Karma](https://karma-runner.github.io) test runner and [Jasmine](http://jasmine.github.io/) BDD
testing library to unit test client source code.

## Credits

For its client side, this project is based on our own Angular 2 starter project, [YANGTSE](https://github.com/BrainCrumbz/YANGTSE),
which in turn draws from the experience and hints given by other, earlier Angular 2 starter projects.
You might want to have a look at those, in case they might better suits your needs. Among the others, there are:

* [AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)
* [preboot/angular2-webpack](https://github.com/preboot/angular2-webpack)
* [wkwiatek/angular2-webpack2](https://github.com/wkwiatek/angular2-webpack2)

## Prerequisites

Here are the tools that should be present in your development environment in order to work with this project:

### Visual Studio environment

* Visual Studio 2015 Community Edition
* Microsoft ASP.NET and Web Tools. It should already be installed with VS2015, but make sure to update it to latest version

### .NET environment

Server side application relies on .NET:

* [.NET Core 1.0.1 SDK](https://www.microsoft.com/net/core) and .NET Core VS 2015 Tooling Preview 2

Please note that, at current time of writing, .NET Core tooling is still in preview. Things like version, install procedure, naming 
might still change in the next future.

### node.js environment

Client side application relies on JavaScript and TypeScript, but it needs node.js to be built and processed.

* [nvm-windows](https://github.com/coreybutler/nvm-windows) 1.1.0 or later, a node.js version management utility for Windows by Corey Butler
* node.js 4.3.2 or later
* npm 3.8.0 or later

You can run node.js commands from console the classic way or from within VS through Npm Task Runner Explorer, an optional Visual Studio extension.
In order to let VS use current node.js version set by nvm (instead of its own version), go to *Tools\Options*, then
to *Project and Solutions\External Web Tools*, and make sure to sort locations so that `$(PATH)` is **above** the two
`$(DevEnvDir)\...` locations.

![VS Options for current node.js version](https://braincrumbz.github.io/AWATTS/assets/images/Options-ProjectsAndSolutions-ExternalWebTools.png)

## Quick start

Clone or download this repository:

~~~bash
git clone --depth 1 https://github.com/BrainCrumbz/AWATTS.git
cd AWATTS
~~~

Install dependencies:

First time project is opened, you should install found client-side dependencies.
You can fire off `install` task from Npm Task Runner Explorer, or run `npm install` in console the old way, from web project root directory:

~~~bash
cd src\WebPackAngular2TypeScript
npm install
~~~

Enable client live reload and module replacement in development:

~~~bash
npm start
~~~

Run server in development:

Just start debugging web project in VS with F5. Browser will open on web app served *without* live reload.
Browse to `http://localhost:3000/` for web app served through live reload.

## Available commands

For its client side part, this project has a number of `npm`-based commands in order to build and process client
source code. You can run them from console the classic way or from Npm Task Runner Explorer.

### Install

Install all dependencies:

~~~bash
npm install
~~~

Uninstall all dependencies:

~~~bash
npm uninstall
~~~

### Build

Build for development:

~~~bash
npm run build  # or npm run build-dev
~~~

Build for production:

~~~bash
npm run build-prod
~~~

Clean build output:

~~~bash
npm run clean
~~~

Clean build output and all dependencies:

~~~bash
npm run clean-deep
~~~

Before building, output will be automatically cleaned. No need to manually clean.

### Serve

Serve front end in development, with hot module replacement and live reload
(it still needs ASP.NET server to be running):

~~~bash
npm start  # or npm run serve, or npm run serve-dev
~~~

Serve front end in production: no `npm` command needed, apart from building for production.
Only ASP.NET server must be running.

~~~bash
npm run build-prod
~~~

### Test

Test:

~~~bash
npm test  # or npm run test
~~~

Test with debugging enabled (e.g. breakpoints in browser console):

~~~bash
npm run test-debug
~~~

Test in watch mode (keep running tests again when code changes):

~~~bash
npm run test-watch
~~~

## License

[MIT](LICENSE)
