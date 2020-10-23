import { browser, by, element, ElementFinder, promise } from 'protractor';

export class SignupPage {
    // navigate to signup page
    navigateToSignup() {
        return browser.get('/signup');
    }
    // get current URL
    getCurrentURL() {
        return browser.getCurrentUrl();
    }
    // navigate to  login page
    navigateToLogin() {
        return browser.get('/login');
    }
    // get signup component
    getsignupComponent(): ElementFinder {
        return element(by.tagName('app-signup'));
    }
    // get username input box
    getUserNameInputBox(): ElementFinder {
        return element(by.className('username'));
    }
    // check username input box is exist or not
    isUserNameInputBoxPresent(): promise.Promise<boolean> {
        return this.getUserNameInputBox().isPresent();
    }
    // get firstname input box
    getFirstNameInputBox(): ElementFinder {
        return element(by.className('firstname'));
    }
    // check fistname input box is exist or not
    isFirstNameInputBoxPresent(): promise.Promise<boolean> {
        return this.getFirstNameInputBox().isPresent();
    }
    // get lastname input box
    getLastNameInputBox(): ElementFinder {
        return element(by.className('lastname'));
    }
    // check lastname input box is exist or not
    isLastNameInputBoxPresent(): promise.Promise<boolean> {
        return this.getLastNameInputBox().isPresent();
    }
    // get email input box
    getEmailInputBox(): ElementFinder {
        return element(by.className('email'));
    }
    // check email input box is exist or not
    isEmailInputBoxPresent(): promise.Promise<boolean> {
        return this.getEmailInputBox().isPresent();
    }
    // get password input box
    getPasswordInputBox(): ElementFinder {
        return element(by.className('password'));
    }
    // check password input box is exist or not
    isPasswordInputBoxPresent(): promise.Promise<boolean> {
        return this.getPasswordInputBox().isPresent();
    }
    // get submit button
    getSubmitButton(): ElementFinder {
        return this.getsignupComponent().element(by.buttonText('Submit'));
    }
    // check submit button is present or not
    isSubmitButtonPresent(): promise.Promise<boolean> {
        return this.getSubmitButton().isPresent();
    }
    // click submit button
    clickSubmitButton(): promise.Promise<void> {
        return this.getSubmitButton().click();
    }
    // default values of input boxes
    getSignupInputBoxesDefaultValues(): any {
        let inputUsername;
        let inputFirstname;
        let inputLastname;
        let inputEmail;
        let inputPassword;
        inputUsername = this.getUserNameInputBox().getAttribute('value');
        inputFirstname = this.getFirstNameInputBox().getAttribute('value');
        inputLastname = this.getLastNameInputBox().getAttribute('value');
        inputEmail = this.getEmailInputBox().getAttribute('value');
        inputPassword = this.getPasswordInputBox().getAttribute('value');
        return Promise.all([inputUsername, inputFirstname, inputLastname, inputEmail, inputPassword]).then((values) => {
            return values;
        });
    }
    // get new user details
    getMockSignupDetail(): any {
        const signupDetail: any = {
            username: 'stranger',
            firstname: 'strangerFirstName',
            lastname: 'strangerLastName',
            email: 'stranger@email.com',
            password: 'password'
        };
        return signupDetail;
    }
    // set new user input box values
    addSignupValues(): any {
        const signup: any = this.getMockSignupDetail();
        this.getUserNameInputBox().sendKeys(signup.username);
        this.getFirstNameInputBox().sendKeys(signup.firstname);
        this.getLastNameInputBox().sendKeys(signup.lastname);
        this.getEmailInputBox().sendKeys(signup.email);
        this.getPasswordInputBox().sendKeys(signup.password);
        return Object.keys(signup).map(key => signup[key]);
    }

}
