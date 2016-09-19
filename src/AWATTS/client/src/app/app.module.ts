import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HeroesModule } from '../heroes/heroes.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppComponent } from '../app/app.component';
import { appRouting } from '../app/app.routing';
import { appProviders } from '../app/app.providers';

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
