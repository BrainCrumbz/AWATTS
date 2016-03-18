import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
    selector: 'my-heroes',
    template: require('./heroes.component.html'),
    styles: [require('./heroes.component.css')],
    directives: [HeroDetailComponent],
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
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
    
}
