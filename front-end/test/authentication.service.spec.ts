import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from '../src/app/services/authentication.service';

const testConfig = {
  login: {
    username: 'stranger',
    password: 'password'
  },
  error404: {
    message: 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status : 404,
    statusText: 'Not Found',
    url: 'http://localhost:3000/auth/v1'
  },
  error403: {
    error: {message: 'Unauthorized'},
    message: 'Http failure response for http://localhost:3000/auth/v1/: 403 Forbidden',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:3000/auth/v1/'
  },
  positive: {
    token: 'token123'
  },
  requestURL: 'http://localhost:3000/auth/v1/',
  isAuth: {isAuthenticated: true},
  isAuthURL: 'http://localhost:3000/auth/v1/isAuthenticated',
  authError404: {
    message: 'Http failure response for http://localhost:3000/auth/v1/isAuthenticated: 404 Not Found',
    name: 'HttpErrorResponse',
    ok: false,
    status : 404,
    statusText: 'Not Found',
    url: 'http://localhost:3000/auth/v1'
  },
  authError403: {
    error: {message: 'Unauthorized'},
    message: 'Http failure response for http://localhost:3000/auth/v1/isAuthenticated: 403 Forbidden',
    name: 'HttpErrorResponse',
    ok: false,
    status: 403,
    statusText: 'Forbidden',
    url: 'http://localhost:3000/auth/v1/isAuthenticated'
  },
};


describe('AuthenticationService', () => {
  
  let httpMock: HttpTestingController;
  let authenticationService: AuthenticationService;
  let mockResponsePositive: any;
  let mockResponseError: any;
  let requestURL: any;
  const loginDetail: any = testConfig.login;
  const token: any = testConfig.positive.token;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
      AuthenticationService,
      ]
    });
  });

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  // ------------ Positive testing of login user------------//
  it('should handle login user', fakeAsync(() => {
    requestURL = testConfig.requestURL;
    mockResponsePositive = testConfig.positive;


    authenticationService.authenticateUser(loginDetail).subscribe((res: any) => {
    expect(res).toBeDefined();
    expect(res).toBe(mockResponsePositive, 'should handle to authenticate user and get token');
    });

    const mockReq = httpMock.expectOne(requestURL);
    expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
    expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
    mockReq.flush(mockResponsePositive);


  }));

  // ------------ Testing to handle 404 Error of login user------------//
  it('should handle 404 error if login url is not found', fakeAsync(() => {
    requestURL = testConfig.requestURL;
    mockResponseError = testConfig.error404;



    authenticationService.authenticateUser(loginDetail).subscribe((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.status).toBe(mockResponseError.status, 'should handle 404 error if login url does not match');
    });

    const mockReq = httpMock.expectOne(requestURL);
    expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
    expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
    mockReq.flush(mockResponseError); // TODO: Check status here if failing. Need to use error
  }));


  // ------------ Testing to handle 403 Error of login user------------//
  it('should handle if username and password is wrong', fakeAsync(() => {
    requestURL = testConfig.requestURL;
    mockResponseError = testConfig.error403;

    authenticationService.authenticateUser(loginDetail).subscribe((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.status).toBe(mockResponseError.status, 'should handle 403 error if user name and password is wrong');
    });

    const mockReq = httpMock.expectOne(requestURL);
    expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
    expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
    mockReq.flush(mockResponseError); // TODO: Check status here if failing. Need to use error

  }));


  // ------------ Testing to handle to set token in local storage------------//
  it('should handle to set and get jwt token in local storage', fakeAsync(() => {
    mockResponsePositive = testConfig.positive.token;
    authenticationService.setBearerToken(mockResponsePositive);
    tick();
    expect(mockResponsePositive).toBe(authenticationService.getBearerToken(), 'should handle to set and get token from local storage');
  }));


  // ------------ Positive testing of isUserAuthenticated------------//
  it('should handle to know if user is aunthenticated', fakeAsync(() => {
    requestURL = testConfig.isAuthURL;
    mockResponsePositive = testConfig.isAuth;

    authenticationService.isUserAuthenticated(token).then((res: any) => {
    expect(res).toBeDefined();
    expect(res).toBe(mockResponsePositive.isAuthenticated, 'should handle to check if isAuthenticated method is returns true');
    });

    const mockReq = httpMock.expectOne(requestURL);
    expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
    expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
    mockReq.flush(mockResponsePositive);

  }));


  // ------------ Testing to handle 404 Error of IsUserAuthenticated ------------//
  it('should handle 404 error of isAuthenticated function', fakeAsync(() => {
    requestURL = testConfig.isAuthURL;
    mockResponseError = testConfig.authError404;

    authenticationService.isUserAuthenticated(token).then((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.error.status).toBe(mockResponseError.status, 'should handle to check 404 error of isAuthenticated method');
    });

    const mockReq = httpMock.expectOne(requestURL);
    expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
    expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
    mockReq.error(mockResponseError);
  }));


  // ------------ Testing to handle 403 Error of IsUserAuthenticated ------------//
  it('should handle 403 error of isAuthenticated funtion', fakeAsync(() => {
    requestURL = testConfig.isAuthURL;
    mockResponseError = testConfig.authError403;

    authenticationService.isUserAuthenticated(token).then((res: any) => {
      expect(res).toBeDefined();
    },
    (err: any) => {
      expect(err.error.status).toBe(mockResponseError.status, 'should handle to check 403 error of isAuthenticated method');
    });

    const mockReq = httpMock.expectOne(requestURL);
    expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
    expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
    mockReq.error(mockResponseError);
  }));
});
