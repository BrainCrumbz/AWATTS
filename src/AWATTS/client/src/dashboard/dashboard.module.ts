import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesModule } from '../heroes/heroes.module';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    HeroesModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule {
}
