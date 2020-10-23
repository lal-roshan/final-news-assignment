import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { RouteService } from '../services/route.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  /// Property for enabling and disabling form fields
  disableForm: boolean = false;
  /// Form control for user name input
  username = new FormControl('', [Validators.required]);

  /// Form control for first name input
  firstname = new FormControl('', [Validators.required]);

  /// Form control for last name input
  lastname = new FormControl('');

  /// Form control for email input
  email = new FormControl('', [Validators.required, Validators.email]);

  /// Form control for password input
  password = new FormControl('', [Validators.required]);

  /// Property for storing messages on submit of form
  submitMessage = '';

  /// Property for storing messages on successful signup
  confirmationMessage = '';

  /// inject the dependencies required for authentication and routing
  constructor(private routeService: RouteService,
    private userService: UserService,
    private snackbar: MatSnackBar) {

  }

  ngOnInit() {
  }

  /// Method for registering new user data
  signupSubmit() {
    this.disableForm = true;
    this.submitMessage = '';
    this.confirmationMessage = '';
    let userData = new User();
    userData.UserId = this.username.value;
    userData.FirstName = this.firstname.value;
    userData.LastName = this.lastname.value;
    userData.Email = this.email.value;
    userData.Password = this.password.value;

    this.userService.createUserProfile(userData)
      .subscribe((profileResponse) => {
        /// If user profile was successfully created the credentials are registered next
        if (profileResponse) {
          this.userService.registerUserCredentials(userData)
            .subscribe((registerResponse) => {
              /// If the registration of credentials was successful a toast message is shown and redirected to login
              if (registerResponse) {
                this.confirmationMessage = 'Registration Successful. Redirecting to login...';
                let toast = this.snackbar.open(this.confirmationMessage, "", {
                  duration: 1800,
                  verticalPosition: 'top'
                });
                toast.afterDismissed()
                  .subscribe(() => {
                    this.routeService.toLogin();
                  });
              }
              else {
                /// If registering credentials failed user profile is deleted
                this.userService.deleteUserProfile(userData.UserId)
                  .subscribe();
                  this.disableForm = false;
              }
            }, registerError => {
              /// If registering credentials failed user profile is deleted
              this.handleError(registerError);
              this.userService.deleteUserProfile(userData.UserId)
                .subscribe();
                this.disableForm = false;
              });
        }
      }, profileError => {
        this.handleError(profileError);
        this.disableForm = false;
      });
  }

  /// Method for handling error while signup
  handleError(error) {
    if (error.status === 409) {
      this.submitMessage = 'Username already exists. Please try again with a different one.';
    } else if (error.status === 404) {
      this.submitMessage = '404 Not Found';
    } else {
      this.submitMessage = 'Some error occured. Please try again!!';
    }
  }

  /// Method for getting error message relating to username field
  getUserNameErrorMessage() {
    if (this.username.invalid && (this.username.dirty || this.username.touched)) {
      return 'Username should not be left blank';
    } else {
      return '';
    }
  }


  /// Method for getting error message relating to username field
  getFirstNameErrorMessage() {
    if (this.firstname.invalid && (this.firstname.dirty || this.firstname.touched)) {
      return 'First name should not be left blank';
    } else {
      return '';
    }
  }


  /// Method for getting error message relating to username field
  getEmailErrorMessage() {
    if (this.email.invalid && (this.email.dirty || this.email.touched)) {
      return 'Invalid Email';
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

  /// Method for determinging whether the form is valid or not
  isSignupFormValid(): boolean {
    return (this.username.valid && this.firstname.valid && this.email.valid && this.password.valid);
  }
}
