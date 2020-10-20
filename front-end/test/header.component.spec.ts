import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from '../src/app/header/header.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should have header with responsive bootstrap navbar',()=>{
    let navbar = fixture.debugElement.query(By.css('nav.navbar')).nativeElement;
    expect(navbar).toBeTruthy();
  });

  it('should have brandlogo on navbar',()=>{
    let img = fixture.debugElement.query(By.css('.navbar-brand img')).nativeElement;
    expect(img).toBeTruthy();
  })

  it(`should have title as 'StackRoute Times' on navbar`, () => {
    component.title = "StackRoute Times";
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css('.navbar-brand div')).nativeElement;
    expect(title.innerText).toContain('StackRoute Times');
  });

  it('should contain mat-icon for home, favorite and search',()=>{
    let favoriteIcons = fixture.debugElement.nativeElement.querySelectorAll('mat-icon');
    expect(favoriteIcons[0].textContent).toContain('home');
    expect(favoriteIcons[1].textContent).toContain('favorite');
    expect(favoriteIcons[2].textContent).toContain('face');
    expect(favoriteIcons[3].textContent).toContain('search');
  
  })

});
