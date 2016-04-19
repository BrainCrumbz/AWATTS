import { Injectable } from 'angular2/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

/* ERR-OBS to see errors, upgrade to rxjs@5.0.0-beta.3 and uncomment the following
*/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroService {

  constructor() {

    /* ERR-OBS to see errors, upgrade to rxjs@5.0.0-beta.3 and uncomment the following
    */

    const numObs = Observable.of(1, 2, 3, 4);

    const textObs = numObs
      .map(n => 'Nr ' + n);

  }

  getHeroes() : Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }
  
  getHeroesSlowly() : Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(() => resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id: number) : Promise<Hero> {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
    
}
