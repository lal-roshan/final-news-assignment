import { SignupPage } from './page-objects/signup.po';
import { browser } from 'protractor';

describe('signup page', () => {
    let page: SignupPage;

    beforeEach(() => {
        page = new SignupPage();
    });

    it('should get username input box', () => {
        page.navigateToSignup();
        expect(page.isUserNameInputBoxPresent())
            .toBeTruthy(`<input class="username" matInput [formControl]='username'> should exist in signup.component.html`);
    });

    it('should get fistname input box', () => {
        page.navigateToSignup();
        expect(page.isFirstNameInputBoxPresent())
            .toBeTruthy(`<input class="firstname" matInput [formControl]='firstname'> should exist in signup.component.html`);
    });

    it('should get lastname input box', () => {
        page.navigateToSignup();
        expect(page.isLastNameInputBoxPresent())
            .toBeTruthy(`<input class="lastname" matInput [formControl]='lastname'> should exist in signup.component.html`);
    });

    it('should get username input box', () => {
        page.navigateToSignup();
        expect(page.isEmailInputBoxPresent())
            .toBeTruthy(`<input class="email" matInput [formControl]='email'> should exist in signup.component.html`);
    });

    it('should get passsword input box', () => {
        page.navigateToSignup();
        expect(page.isPasswordInputBoxPresent())
            .toBeTruthy(`<input class="password" matInput type = 'password' [formControl]='password'>
      should exist in signup.component.html`);
    });

    it('should get submit button', () => {
        page.navigateToSignup();
        expect(page.isSubmitButtonPresent()).toBeTruthy(`<button type="submit" mat-button>Submit</button> should
      exist in signup.component.html`);
    });

    it('default values of new user details should be empty', () => {
        const emptySignupValues = ['', '', '', '', ''];
        page.navigateToSignup();
        expect(page.getSignupInputBoxesDefaultValues()).toEqual(emptySignupValues, 'Default values for new user details should be empty');
    });

    it('should signup and redirect to the login page', () => {
        page.navigateToSignup();
        let newNoteValues = page.addSignupValues();
        expect(page.getSignupInputBoxesDefaultValues()).toEqual(newNoteValues, 'Should be able to set values for new user');
        page.clickSubmitButton();
        browser.sleep(1800);
        page.navigateToLogin();
        page.getCurrentURL().then((url) => {
            if (url.indexOf('signup') > -1) {
                newNoteValues = page.addSignupValues();
                page.clickSubmitButton();
                browser.sleep(1800);
                page.navigateToLogin();
                expect(page.getCurrentURL()).toContain('login', 'Should navigate to login');
            } else {
                expect(page.getCurrentURL()).toContain('login', 'Should navigate to login');
            }
        });
    });
});
