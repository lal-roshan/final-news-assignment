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

  /// inject the dependencies required for authentication and routing
  constructor(private routeService: RouteService,
    private userService: UserService,
    private snackbar: MatSnackBar) {

  }

  ngOnInit() {
  }

  signupSubmit() {
    this.submitMessage = '';
    let userData = new User();
    userData.UserId = this.username.value;
    userData.FirstName = this.firstname.value;
    userData.LastName = this.lastname.value;
    userData.Email = this.email.value;
    userData.Password = this.password.value;

    this.userService.createUserProfile(userData)
      .subscribe((profileResponse) => {
        console.log(profileResponse);
        this.userService.registerUserCredentials(userData)
          .subscribe((registerResponse) => {
            console.log(registerResponse);
            let toast = this.snackbar.open("Registration Successful. Redirecting to login...", "", {
              duration: 1800,
              verticalPosition: 'top'
            });
            toast.afterDismissed()
              .subscribe(() => {
                this.routeService.toLogin();
              });
          }, registerError => {
            this.handleError(registerError);
            this.userService.deleteUserProfile(userData.UserId)
            .subscribe();
          });
      }, profileError => {
        this.handleError(profileError);
      });
  }

  /// Method for handling error while signup
  handleError(error) {
    if (error.status === 409) {
      this.submitMessage = 'Username already exists. Please try with a different one.';
    } else if (error.status === 404) {
      this.submitMessage = 'Not Found';
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
