import { beforeEachProviders, describe, expect, inject, it, xit } from 'angular2/testing';
import { provide } from 'angular2/core';
import { Location, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { RootRouter } from 'angular2/src/router/router';
import { SpyLocation } from 'angular2/src/mock/location_mock';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../heroes/hero.service';
import { Hero } from '../heroes/hero';

describe('DashboardComponent', () => {

  var heroService : any;

  function mockServiceFactory() : HeroService {
    heroService = jasmine.createSpyObj<HeroService>('HeroService', [
       'getHeroes', 'getHeroesSlowly', 'getHero']);
    
    return <HeroService>heroService;
  }

  beforeEachProviders(() => [
    DashboardComponent,
    provide(HeroService, {useFactory: mockServiceFactory}),
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: DashboardComponent}),
    provide(Router, {useClass: RootRouter})
  ]);
  
  it('true is true', () => expect(true).toBe(true));

  it('should have empty heroes', inject([ DashboardComponent ], (dashboard: DashboardComponent) => {
    expect(dashboard.heroes).toEqual([]);
  }));
  
});

