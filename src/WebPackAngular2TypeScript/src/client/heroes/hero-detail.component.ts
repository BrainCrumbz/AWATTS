import { Component, OnInit, Input } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'my-hero-detail',
  template: require('./hero-detail.component.html'),
  styles: [require('./hero-detail.component.css')],
})
export class HeroDetailComponent implements OnInit {
  
  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }
  
  @Input() hero: Hero;
  
  ngOnInit() {
    let id = +this._routeParams.get('id');
    
    this._heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
  
}
