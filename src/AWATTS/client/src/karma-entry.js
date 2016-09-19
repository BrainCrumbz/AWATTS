/*
 * This is the entry file for karma tests, running some test environment setup code
 * needed across all tests running in the browser, and then requiring all spec files.
 */

// Set to output "No stacktrace"", usually best for app testing.
Error.stackTraceLimit = 0;

// Turn on full stack traces in error output, to help debugging specific cases
//Error.stackTraceLimit = Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

require('core-js/es6');
require('reflect-metadata');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
// keep these two as last
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

// Somewhere in the test setup, select BrowserDomAdapter to run tests in the browser
// see https://github.com/AngularClass/angular2-webpack-starter/issues/124
var testing = require('@angular/core/testing');
var browserTesting = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
  browserTesting.BrowserDynamicTestingModule,
  browserTesting.platformBrowserDynamicTesting()
);

// Find all tests and run them
/*
 * Create a webpack context using the 'context()' method provided by webpack itself
 * through its provided `require()` function.
 * Match all spec files to be run, by looking for the specified pattern, starting
 * from current directory and then recursively (with the 'true' flag).
 */
var testContext = require.context('./', true, /\.spec\.ts/);

/* Webpack context is a function but has its own properties as object/hash.
 * As an object, its properties are the matched filenames.
 * As a function, it can `require` the filename passed as input, so it can actually
 * execute that filename.
 */
var testFilenames = testContext.keys();
var execute = testContext;

/* Require and execute each test file */
testFilenames.forEach(execute);
