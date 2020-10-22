import {throwError as observableThrowError, of as observableOf,  Observable } from 'rxjs';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from '../src/app/login/login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { RouteService } from 'src/app/services/route.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const testConfig = {
  error404: {
    error: {message: '404 Not Found'},
    message: 'Http failure response for http://localhost:8083/api/auth/login: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status : 404,
    statusText: 'Not Found',
    url: 'http://localhost:8083/api/auth/login'
  },
  error403: {
    error: {message: 'Forbidden'},
    message: 'Http failure response for http://localhost:8083/api/auth/login: 403 Forbidden',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:8083/api/auth/login'
  },
  error401: {
    error: {message: 'Username or Password is incorrect!!'},
    message: 'Http failure response for http://localhost:8083/api/auth/login: 401 Unauthorized',
    name: 'HttpErrorResponse',
    ok: false,
    status: 401,
    statusText: 'Unauthorized',
    url: 'http://localhost:8083/api/auth/login'
  },
  positive: {
    token: 'token123'
  }
};



describe('LoginComponent', () => {
  let authenticationService: AuthenticationService;
  let positiveResponse: any;

  let loginComponent: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let spyAuthenticateUser: any;
  let spySetBearerToken: any;
  let spyRouteToDashboard: any;
  const routerSpy: any = {};
  let location: Location;
  let routerService: any;
  let errorMessage: any;
  let debugElement: any;
  let element: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [BrowserAnimationsModule, FormsModule,ReactiveFormsModule, MatInputModule, HttpClientModule],
      providers:[AuthenticationService,RouteService,
        { provide: Location, useValue: {} },
        { provide: Router, useValue: routerSpy }
  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    routerService = fixture.debugElement.injector.get(RouteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('should handle to login into the system', fakeAsync(() => {
    positiveResponse = testConfig.positive;
    spyAuthenticateUser = spyOn(authenticationService, 'authenticateUser').and.returnValue(observableOf(positiveResponse));
    const token = testConfig.positive.token;
    spySetBearerToken = spyOn(authenticationService, 'setBearerToken').and.callFake(() => {
      localStorage.setItem('bearerToken', token);
    });
    spyRouteToDashboard = spyOn(routerService, 'toDashboard').and.callFake(() => {});
    const username = new FormControl('stranger');
    loginComponent.username = username;
    const password = new FormControl('password');
    loginComponent.password = password;
    loginComponent.loginSubmit();
    expect(localStorage.getItem('bearerToken')).toBe(token, 'should get token from local storage');
  }));

  it('should handle wrong login and password', fakeAsync(() => {
    errorMessage = testConfig.error401;
    loginComponent.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyAuthenticateUser = spyOn(authenticationService, 'authenticateUser').and.returnValue(observableThrowError(errorMessage));

    const username = new FormControl('stranger');
    loginComponent.username = username;
    const password = new FormControl('password');
    loginComponent.password = password;
    loginComponent.loginSubmit();

    tick();
    fixture.detectChanges();
    if (debugElement !== null) {
      element = debugElement.nativeElement;
      expect(element.textContent).toBe(errorMessage.error.message,
        `should store 'err.error.message' in a varibale 'submitMessage' to show error on login page`);
    } else {
      expect(false).toBe(true,
        `should have an element  as <strong *ngIf="submitMessage" class="error-message">{{submitMessage}}</strong>
        in your login.component.html to show server errror response`);
    }
  }));


  it('should handle 404 error on login', fakeAsync(() => {
    errorMessage = testConfig.error404;
    loginComponent.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyAuthenticateUser = spyOn(authenticationService, 'authenticateUser').and.returnValue(observableThrowError(errorMessage));

    const username = new FormControl('stranger');
    loginComponent.username = username;
    const password = new FormControl('password');
    loginComponent.password = password;
    loginComponent.loginSubmit();

    tick();
    fixture.detectChanges();
    if (debugElement !== null) {
      element = debugElement.nativeElement;
      expect(element.textContent).toBe(errorMessage.error.message,
        `should store 'err.message' in a varibale 'submitMessage' to show error on login page`);
    } else {
      expect(false).toBe(true,
        `should have an element  as <strong *ngIf="submitMessage" class="error-message">{{submitMessage}}</strong>
        in your login.component.html to show server errror response`);
    }
  }));

});
