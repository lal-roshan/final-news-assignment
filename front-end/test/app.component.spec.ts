import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../src/app/app.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {

  let fixture;  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      schemas:[NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
      
    }); 

    fixture = TestBed
    .createComponent(AppComponent);
    
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have property named title with value set to 'StackRoute Times`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('StackRoute Times');
  });
  
  it(`should have a header`,()=>{
    const footerComponent = fixture.debugElement.nativeElement.querySelector('app-header');
    expect(footerComponent).toBeTruthy();
  });
  
  it(`should have a footer`,()=>{
    const footerComponent = fixture.debugElement.nativeElement.querySelector('app-footer');
    expect(footerComponent).toBeTruthy();
  });

});
