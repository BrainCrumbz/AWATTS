import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeroesModule } from '../heroes/heroes.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppComponent } from '../app/app.component';
import { appRouting } from '../app/app.routing';
import { appProviders } from '../app/app.providers';

/* TODO None of these works with AOT production build. At least for `require`,
 * there seems to be issues with AOT.
// Here import global styles common to all app modules
require('../shared/common-styles.css');
*/
import '../shared/common-styles.css';

@NgModule({
  imports: [
    // third-party modules
    BrowserModule,
    FormsModule,
    // this is not currently used in sample, but probably needed in most apps
    HttpModule,

    appRouting,
    // feature modules
    DashboardModule,
    HeroesModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    appProviders,
  ],
})
export class AppModule {
}
