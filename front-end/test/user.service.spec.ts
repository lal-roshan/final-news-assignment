import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Console } from 'console';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

const testConfig = {
    error404: {
        message: 'Http failure response for http://localhost:8086/api/user/: 404 Not Found',
        name: 'HttpErrorResponse',
        ok: false,
        status: 404,
        statusText: 'Not Found',
        url: 'http://localhost:8083/api/auth/login'
    },
    error409: {
        error: { message: 'Username already exists. Please try again with a different one.' },
        message: 'Http failure response for http://localhost:8086/api/user/: 409 Conflict',
        name: 'HttpErrorResponse',
        ok: false,
        status: 409,
        statusText: 'Unauthorized',
        url: 'http://localhost:8083/api/auth/login'
    },
    signupRequestUrl: 'http://localhost:8086/api/user/',
    registerRequestUrl: 'http://localhost:8083/api/auth/register',
    authError404: {
        message: 'Http failure response for http://localhost:8083/api/auth/register: 404 Not Found',
        name: 'HttpErrorResponse',
        ok: false,
        status: 404,
        statusText: 'Not Found',
        url: 'http://localhost:8083/api/auth/register'
    },
    authError409: {
        error: { message: 'Username already exists. Please try again with a different one.' },
        message: 'Http failure response for http://localhost:8083/api/auth/register: 409 Conflict',
        name: 'HttpErrorResponse',
        ok: false,
        status: 409,
        statusText: 'Conflict',
        url: 'http://localhost:8083/api/auth/register'
    },
    success:{
        value: true
    }
};


describe('UserService', () => {

    let httpMock: HttpTestingController;
    let userService: UserService;
    let mockResponsePositive: any;
    let mockResponseError: any;
    let requestURL: any;
    const userProfile: User =  new User();
    userProfile.UserId = 'testId';
    userProfile.FirstName = 'testFirstName';
    userProfile.LastName = 'testLastName';
    userProfile.Email = 'test@mail.com';
    userProfile.Password = 'testPassword';
    userProfile.CreatedAt = new Date().toDateString();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                UserService,
            ]
        });
    });

    beforeEach(() => {
        httpMock = TestBed.get(HttpTestingController);
        userService = TestBed.get(UserService);
    });

    it('should be created', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));

    // ------------ Positive testing of signup user------------//
    it('should handle create user profile', fakeAsync(() => {
        requestURL = testConfig.signupRequestUrl;
        mockResponsePositive = testConfig.success;


        userService.createUserProfile(userProfile).subscribe((res: any) => {
            expect(res).toBeDefined();
            expect(res).toBe(mockResponsePositive, 'should handle to create user profile');
        });

        const mockReq = httpMock.expectOne(requestURL);
        expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
        expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
        mockReq.flush(mockResponsePositive);


    }));

    // ------------ Testing to handle 404 Error of login user------------//
    it('should handle 404 error if create user profile url is not found', fakeAsync(() => {
        requestURL = testConfig.signupRequestUrl;
        mockResponseError = testConfig.error404;


        userService.createUserProfile(userProfile).subscribe((res: any) => {
            expect(res).toBeDefined();
        },
            (err: any) => {
                expect(err.status).toBe(mockResponseError.status, 'should handle 404 error if create user profile url does not match');
            });

        const mockReq = httpMock.expectOne(requestURL);
        expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
        expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
        mockReq.flush(mockResponseError); // TODO: Check status here if failing. Need to use error
    }));


    // ------------ Testing to handle 409 Error of creating user profile------------//
    it('should handle if username already exists', fakeAsync(() => {
        requestURL = testConfig.signupRequestUrl;
        mockResponseError = testConfig.error409;

        userService.createUserProfile(userProfile).subscribe((res: any) => {
            expect(res).toBeDefined();
        },
            (err: any) => {
                expect(err.status).toBe(mockResponseError.status, 'should handle 409 error if user name already exists');
            });

        const mockReq = httpMock.expectOne(requestURL);
        expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
        expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
        mockReq.flush(mockResponseError); // TODO: Check status here if failing. Need to use error

    }));


    // ------------ Positive testing of registering user credentials------------//
    it('should handle registring user credentials', fakeAsync(() => {
        requestURL = testConfig.registerRequestUrl;
        mockResponsePositive = testConfig.success;

        userService.registerUserCredentials(userProfile).subscribe((res: any) => {
            expect(res).toBeDefined();
            expect(res).toBe(mockResponsePositive, 'should handle registring user credentials');
        });

        const mockReq = httpMock.expectOne(requestURL);
        expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
        expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
        mockReq.flush(mockResponsePositive);

    }));

    // ------------ Testing to handle 404 Error of login user------------//
    it('should handle 404 error if register user credentials url is not found', fakeAsync(() => {
        requestURL = testConfig.registerRequestUrl;
        mockResponseError = testConfig.error404;


        userService.registerUserCredentials(userProfile).subscribe((res: any) => {
            expect(res).toBeDefined();
        },
            (err: any) => {
                expect(err.status).toBe(mockResponseError.status, 'should handle 404 error if register user credentials url does not match');
            });

        const mockReq = httpMock.expectOne(requestURL);
        expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
        expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
        mockReq.flush(mockResponseError); // TODO: Check status here if failing. Need to use error
    }));


    // ------------ Testing to handle 409 Error of creating user profile------------//
    it('should handle if username already exists', fakeAsync(() => {
        requestURL = testConfig.registerRequestUrl;
        mockResponseError = testConfig.error409;

        userService.registerUserCredentials(userProfile).subscribe((res: any) => {
            expect(res).toBeDefined();
        },
            (err: any) => {
                expect(err.status).toBe(mockResponseError.status, 'should handle 409 error if user name already exists');
            });

        const mockReq = httpMock.expectOne(requestURL);
        expect(mockReq.request.url).toEqual(requestURL, 'requested url should match with server api url');
        expect(mockReq.request.method).toBe('POST', 'should handle requested method type.');
        mockReq.flush(mockResponseError); // TODO: Check status here if failing. Need to use error

    }));
});
