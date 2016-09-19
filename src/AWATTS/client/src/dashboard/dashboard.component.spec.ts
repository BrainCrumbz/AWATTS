import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../heroes/hero.service';
import { Hero } from '../heroes/hero';

describe('DashboardComponent', () => {

  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let router: Router;
  let heroService: HeroService;

  beforeEach(async(() => {

    router = jasmine.createSpyObj<Router>('Router', [
      'navigate',
    ]);

    heroService = jasmine.createSpyObj<HeroService>('HeroService', [
       'getHeroes', 'getHeroesSlowly', 'getHero']);

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: HeroService, useValue: heroService },
      ],
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
    });

  }));

  it('should start with empty heroes', () => {
    expect(component.heroes).toEqual([]);
  });

  describe('when service resolves (on init)', () => {

    const dummyHeroes: Hero[] = [
      { id: 0, name: 'Hero 0' },
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
    ];

    beforeEach(async(() => {
      (<jasmine.Spy>heroService.getHeroes).and.returnValue(Promise.resolve(dummyHeroes));

      component.ngOnInit();
    }));

    it('should have heroes', () => {
      const expected = dummyHeroes.slice(1);
      expect(component.heroes).toEqual(expected);
    });

  });

  describe('when service resolves (on detect changes)', () => {

    const dummyHeroes: Hero[] = [
      { id: 0, name: 'Hero 0' },
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' },
    ];

    beforeEach(async(() => {
      (<jasmine.Spy>heroService.getHeroes).and.returnValue(Promise.resolve(dummyHeroes));

      fixture.detectChanges();
    }));

    it('should set heroes in DOM', () => {
      const expected = dummyHeroes.slice(1);

      fixture.detectChanges();

      const heroElements = fixture.debugElement
        .queryAll(By.css('h4'))
        .map(debugEl => debugEl.nativeElement);

      expect(heroElements.length).toBe(expected.length);

      heroElements.forEach((elem, i) => {
        const expectedText = expected[i].name;

        expect(elem.textContent).toContain(expectedText);
      });
    });

  });

});
