import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesComponent } from '../heroes/heroes.component';
import { HeroDetailComponent } from '../heroes/hero-detail.component';
import { HeroService } from '../heroes/hero.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
  ],
  providers: [
    HeroService,
  ],
  exports: [
    HeroesComponent,
    HeroDetailComponent,
  ],
})
export class HeroesModule {
}
