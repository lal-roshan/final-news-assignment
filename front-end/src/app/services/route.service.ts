import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouteService {

  constructor(private router: Router) { }

  // this method allows navigation to login component
  toLogin() {
    this.router.navigate(['login']);
  }

  // this method allows navigation to signup component
  toSignup() {
    this.router.navigate(['signup']);
  }

  // this method allows navigation to dashboard component
  toDashboard() {
    this.router.navigate(['dashboard']);
  }
}
