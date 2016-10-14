import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Here import global styles common to all app modules, with require()
require('./shared/common-styles.css');

if (NODE_ENV === 'production') {
  enableProdMode();
}

console.log('Client running, version \'%s\', environment: \'%s\'...', VERSION, NODE_ENV);

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(_ => console.log('Application successfully bootstrapped.'))
  .catch(err => console.error('Error while bootstrapping application. %s', err));
