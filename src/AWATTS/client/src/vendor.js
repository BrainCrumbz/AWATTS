// Angular 2 polyfills
"use strict";
//import 'ie-shim';  // Internet Explorer
require('core-js/es6');
// Angular 2 libs
require('reflect-metadata');
require('zone.js/dist/zone.min');
// Angular 2
// import Angular 2 here, so to have it as common dependencies in vendor bundle
require('@angular/platform-browser');
require('@angular/platform-browser-dynamic');
require('@angular/core');
require('@angular/common');
require('@angular/http');
require('@angular/router-deprecated');
// RxJS
// avoid importing the whole RxJS library here. Although more tedious, look for all
// "import 'rxjs/xxx';" occurences in your source code, and collect them here as well
if (NODE_ENV === 'development') {
}
//# sourceMappingURL=vendor.js.map