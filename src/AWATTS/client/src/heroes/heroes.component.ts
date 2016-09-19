import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {

  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  heroes: Hero[];

  selectedHero: Hero;

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    //this._heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }

  gotoDetail() {
    const link = ['/detail', this.selectedHero.id];
    this._router.navigate(link);
  }

}
