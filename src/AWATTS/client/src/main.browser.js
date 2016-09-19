"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app/app.component');
if (NODE_ENV === 'production') {
    core_1.enableProdMode();
}
console.log('Client running, version \'%s\', environment: \'%s\'...', VERSION, NODE_ENV);
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent)
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.browser.js.map