import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouteService } from '../src/app/services/route.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import {  routes } from '../src/app/app-routing.module';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { NewsStoriesComponent } from 'src/app/news-stories/news-stories.component';
import { NewsReaderComponent } from 'src/app/news-reader/news-reader.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RouteService', () => { 
  let location: Location;
  let routeService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        DashboardComponent,
        NewsStoriesComponent,
        NewsReaderComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      providers: [ HttpTestingController, RouteService,AuthenticationService ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    location = TestBed.get(Location);
    routeService = TestBed.get(RouteService);
  });

  it('should be created', inject([RouteService], (service: RouteService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle to navigate on news view', fakeAsync(() => {
    routeService.toDashboard();
    tick();
    expect(location.path()).toContain('/dashboard',
        `should navigate to news view page`);
  }));

  it('should handle to navigate login view', fakeAsync(() => {
    routeService.toLogin();
    tick();
    expect(location.path()).toContain('/login',
        `should navigate to login page`);
  }));
});
