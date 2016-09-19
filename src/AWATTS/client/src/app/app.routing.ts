import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroesComponent } from '../heroes/heroes.component';
import { HeroDetailComponent } from '../heroes/hero-detail.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',

}, {
  path: 'dashboard',
  component: DashboardComponent,

}, {
  path: 'heroes',
  component: HeroesComponent,

}, {
  path: 'detail/:id',
  component: HeroDetailComponent,

}];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  useHash: false,
  enableTracing: false,
});
