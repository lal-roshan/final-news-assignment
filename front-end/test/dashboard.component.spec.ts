import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from '../src/app/dashboard/dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      
      declarations: [ DashboardComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

});
