// Angular 2 polyfills

//import 'angular2/bundles/angular2-polyfills';
// (following modules are what are in 'angular2/bundles/angular2-polyfills' so this is not needed)

//import 'ie-shim';  // Internet Explorer
import 'es6-shim';

// Angular 2 libs
import 'reflect-metadata';
import 'zone.js/dist/zone.min';

// Angular 2
// import Angular 2 here, so to have it as common dependencies in vendor bundle
import 'angular2/platform/browser';
import 'angular2/core';
import 'angular2/http';
import 'angular2/router';

if (NODE_ENV === 'development') {
  // activate long strack traces, only in development
  /*
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
  */
}
