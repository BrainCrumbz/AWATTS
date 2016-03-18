import { enableProdMode } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './app/app.component';

if (NODE_ENV === 'production') {
  enableProdMode();
}

console.log('Client running, version \'%s\', environment: \'%s\'...', VERSION, NODE_ENV);

bootstrap(AppComponent)
  .catch(err => console.error(err));
