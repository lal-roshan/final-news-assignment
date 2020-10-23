import { throwError as observableThrowError, of as observableOf } from 'rxjs';

import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { RouteService } from 'src/app/services/route.service';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from 'src/app/services/user.service';
import { SignupComponent } from 'src/app/signup/signup.component';
import { User } from 'src/app/models/user';

const testConfig = {
  profileError404: {
    error: { message: '404 Not Found' },
    message: 'Http failure response for http://localhost:8086/api/user: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status: 404,
    statusText: 'Not Found',
    url: 'http://localhost:8086/api/user'
  },
  profileError409: {
    error: { message: 'Username already exists. Please try again with a different one.' },
    message: 'Http failure response for http://localhost:8086/api/user/: 409 Unauthorized',
    name: 'HttpErrorResponse',
    ok: false,
    status: 409,
    statusText: 'Conflict',
    url: 'http://localhost:8086/api/user'
  },
  registerError404: {
    error: { message: '404 Not Found' },
    message: 'Http failure response for http://localhost:8083/api/auth/register: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status: 404,
    statusText: 'Not Found',
    url: 'http://localhost:8083/api/auth/register'
  },
  registerError409: {
    error: { message: 'Username already exists. Please try again with a different one.' },
    message: 'Http failure response for http://localhost:8083/api/auth/register: 409 Unauthorized',
    name: 'HttpErrorResponse',
    ok: false,
    status: 409,
    statusText: 'Conflict',
    url: 'http://localhost:8083/api/auth/register'
  },
  positive: {
    success: true
  }
};



describe('SignupComponent', () => {
  let userService: UserService;
  let signupComponent: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const routerSpy: any = {};
  let routerService: any;
  let errorMessage: any;
  let debugElement: any;
  let element: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        HttpClientModule
      ],
      providers: [AuthenticationService, UserService, RouteService, MatSnackBar,
        { provide: Location, useValue: {} },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    signupComponent = fixture.componentInstance;
    routerService = fixture.debugElement.injector.get(RouteService);
    userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(signupComponent).toBeTruthy();
  });

  it('should handle to signup', fakeAsync(() => {
    const username = new FormControl('stranger');
    signupComponent.username = username;
    const fistname = new FormControl('strangerFirstName');
    signupComponent.firstname = username;
    const lastname = new FormControl('strangerLastName');
    signupComponent.lastname = username;
    const email = new FormControl('strangerEmail');
    signupComponent.email = username;
    const password = new FormControl('password');
    signupComponent.password = password;

    let userData: User = new User();
    userData.UserId = signupComponent.username.value;
    userData.FirstName = signupComponent.firstname.value;
    userData.LastName = signupComponent.lastname.value;
    userData.Email = signupComponent.email.value;
    userData.Password = signupComponent.password.value;

    spyOn(userService, "createUserProfile").and.returnValue(observableOf(true));
    spyOn(userService, "registerUserCredentials").and.returnValue(observableOf(true));

    signupComponent.signupSubmit();
    tick(1800);
    fixture.detectChanges();

    expect(userService.createUserProfile).toHaveBeenCalledWith(userData);
    expect(userService.registerUserCredentials).toHaveBeenCalledWith(userData);
    expect(signupComponent.confirmationMessage).toEqual('Registration Successful. Redirecting to login...');
  }));

  it('should handle existing username registration at profile creation', fakeAsync(() => {
    errorMessage = testConfig.profileError409;
    signupComponent.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyOn(userService, 'createUserProfile').and.returnValue(observableThrowError(errorMessage));

    const username = new FormControl('stranger');
    signupComponent.username = username;
    const fistname = new FormControl('strangerFirstName');
    signupComponent.firstname = username;
    const lastname = new FormControl('strangerLastName');
    signupComponent.lastname = username;
    const email = new FormControl('strangerEmail');
    signupComponent.email = username;
    const password = new FormControl('password');
    signupComponent.password = password;
    signupComponent.signupSubmit();

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

  it('should handle existing username registration at credentials registration', fakeAsync(() => {
    errorMessage = testConfig.registerError409;
    signupComponent.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyOn(userService, "createUserProfile").and.returnValue(observableOf(true));
    spyOn(userService, 'registerUserCredentials').and.returnValue(observableThrowError(errorMessage));
    spyOn(userService, 'deleteUserProfile').and.returnValue(observableOf(true));

    const username = new FormControl('stranger');
    signupComponent.username = username;
    const fistname = new FormControl('strangerFirstName');
    signupComponent.firstname = username;
    const lastname = new FormControl('strangerLastName');
    signupComponent.lastname = username;
    const email = new FormControl('strangerEmail');
    signupComponent.email = username;
    const password = new FormControl('password');
    signupComponent.password = password;


    let userData: User = new User();
    userData.UserId = signupComponent.username.value;
    userData.FirstName = signupComponent.firstname.value;
    userData.LastName = signupComponent.lastname.value;
    userData.Email = signupComponent.email.value;
    userData.Password = signupComponent.password.value;

    signupComponent.signupSubmit();

    tick();
    fixture.detectChanges();
    expect(userService.registerUserCredentials).toHaveBeenCalledWith(userData);
    expect(userService.deleteUserProfile).toHaveBeenCalledWith(userData.UserId);
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

  it('should handle 404 error on create profile', fakeAsync(() => {
    errorMessage = testConfig.profileError404;
    signupComponent.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyOn(userService, 'createUserProfile').and.returnValue(observableThrowError(errorMessage));

    const username = new FormControl('stranger');
    signupComponent.username = username;
    const fistname = new FormControl('strangerFirstName');
    signupComponent.firstname = username;
    const lastname = new FormControl('strangerLastName');
    signupComponent.lastname = username;
    const email = new FormControl('strangerEmail');
    signupComponent.email = username;
    const password = new FormControl('password');
    signupComponent.password = password;
    signupComponent.signupSubmit();

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


  it('should handle 404 error on credentials registration', fakeAsync(() => {
    errorMessage = testConfig.registerError404;
    signupComponent.submitMessage = ' ';
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.error-message'));
    spyOn(userService, "createUserProfile").and.returnValue(observableOf(true));
    spyOn(userService, 'registerUserCredentials').and.returnValue(observableThrowError(errorMessage));
    spyOn(userService, 'deleteUserProfile').and.returnValue(observableOf(true));

    const username = new FormControl('stranger');
    signupComponent.username = username;
    const fistname = new FormControl('strangerFirstName');
    signupComponent.firstname = username;
    const lastname = new FormControl('strangerLastName');
    signupComponent.lastname = username;
    const email = new FormControl('strangerEmail');
    signupComponent.email = username;
    const password = new FormControl('password');
    signupComponent.password = password;


    let userData: User = new User();
    userData.UserId = signupComponent.username.value;
    userData.FirstName = signupComponent.firstname.value;
    userData.LastName = signupComponent.lastname.value;
    userData.Email = signupComponent.email.value;
    userData.Password = signupComponent.password.value;

    signupComponent.signupSubmit();

    tick();
    fixture.detectChanges();
    expect(userService.registerUserCredentials).toHaveBeenCalledWith(userData);
    expect(userService.deleteUserProfile).toHaveBeenCalledWith(userData.UserId);
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
