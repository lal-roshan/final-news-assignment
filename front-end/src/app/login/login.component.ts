import { Component, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouteService } from '../services/route.service';
import { AuthenticationService } from '../services/authentication.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /// Flag for disabling or enabling the form fields
  disableFields: boolean = false;

  /// Form control for user name input
  username = new FormControl('', [Validators.required]);

  /// Form control for password input
  password = new FormControl('', [Validators.required]);

  /// Property for storing messages on submit of form
  submitMessage = '';

  /// inject the dependencies required for authentication and routing
  constructor(private authService: AuthenticationService,
    private routeService: RouteService) {

  }

  /// remove already existing user token if any on login screen
  ngOnInit() {
    this.authService.removeBearerToken();
  }

  /// Method invoked on submit button click where user is validated and
  /// decision is taken whether or not to allow further navigation
  loginSubmit() {

    this.submitMessage = '';

    /// Disabling the whole form when clicking submit button
    this.disableFields = true;

    ///Authenticating user credentials
    this.authService.authenticateUser({ UserId: this.username.value, Password: this.password.value })
      .subscribe(data => {
        /// If valid user, the token is saved and further navigation is done
        this.authService.setBearerToken(data['token']);
        this.routeService.toDashboard();
      },
        error => {
          /// enabling the form
          this.disableFields = false;
          if (error.status === 401) {
            this.submitMessage = 'Username or Password is incorrect!!';
          } else if (error.status === 404) {
            this.submitMessage = '404 Not Found';
          } else if (error.status === 403) {
            this.submitMessage = 'Forbidden';
          } else {
            this.submitMessage = 'Some error occured. Please try again!!';
          }
        });
  }

  /// Method for getting error message relating to username field
  getUserNameErrorMessage() {
    if (this.username.invalid && (this.username.dirty || this.username.touched)) {
      return 'Username should not be left blank';
    } else {
      return '';
    }
  }

  /// Method for getting error message relating to password field
  getPasswordErrorMessage() {
    if (this.password.invalid && (this.password.dirty || this.password.touched)) {
      return 'Password should not be left blank';
    } else {
      return '';
    }
  }
}
