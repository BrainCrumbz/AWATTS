import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from '../app/app.component';

describe('AppComponent as declaration', () => {

  beforeEach(async(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
      ],
    });

    TestBed.compileComponents();
  }));

  it('should complete beforeEach', () => expect(true).toBe(true));

  it('should create component', () => {
    // create test fixture (and component)
    const fixture = TestBed.createComponent(AppComponent);

    // get test component from the fixture
    const component = fixture.componentInstance;

    expect(component instanceof AppComponent).toBe(true);
  });

  it('should set title in DOM', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    // trigger data binding to update the view
    fixture.detectChanges();

    // get DOM element compiled from component
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;

    // confirm title element content
    expect(titleElement.textContent).toBe(component.title);
  });

});
