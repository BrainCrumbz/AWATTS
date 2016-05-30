/*
 * This is the entry file for karma tests, running some test environment setup code
 * needed across all tests running in the browser, and then requiring all spec files.
 */

// Turn on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

require('core-js');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');

// Somewhere in the test setup, select BrowserDomAdapter to run tests in the browser
// see https://github.com/AngularClass/angular2-webpack-starter/issues/124
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.setBaseTestProviders(
  browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

// Find all tests and run them
/*
 * Create a webpack context using the 'context()' method provided by webpack itself.
 * Match all spec files to be run, by looking for the specified pattern, starting
 * from current directory and then recursively (with the 'true' flag).
 * Webpack context is both a function and an object. As an object, its keys are the
 * matched filenames. As a function, it 'require's the filename passed as input, so
 * it actually executes that.
 */
var context = require.context('./', true, /\.spec\.ts/);
var matchedFilenames = context.keys();
var execute = context;

matchedFilenames.forEach(execute);
