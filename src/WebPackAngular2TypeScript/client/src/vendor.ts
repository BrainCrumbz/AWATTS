// Angular 2 polyfills

//import 'ie-shim';  // Internet Explorer
import 'core-js/es6';

// Angular 2 libs
import 'reflect-metadata';
import 'zone.js/dist/zone.min';

// Angular 2
// import Angular 2 here, so to have it as common dependencies in vendor bundle
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router-deprecated';

// RxJS
// avoid importing the whole RxJS library here. Although more tedious, look for all
// "import 'rxjs/xxx';" occurences in your source code, and collect them here as well

if (NODE_ENV === 'development') {
  // activate long strack traces, only in development
  /*
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
  */
}
