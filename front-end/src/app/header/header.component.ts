import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { url } from 'inspector';
import { AuthenticationService } from '../services/authentication.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /// Property holding the title name
  @Input() public title: string;

  constructor(private router: Router,
              private authService: AuthenticationService,
              private routeService: RouteService) {
    router.events.subscribe(val => {
      if (val instanceof NavigationStart && val.url != undefined) {
        if (val.url.indexOf('login') > -1 ||
            val.url.indexOf('signup') > -1 ||
            val.url == '/') {
          this.hideOrShowMenuItems(false);
          document.querySelectorAll(`li[data-route]`).forEach(item => {
            item.classList.remove('active');
          });
        } else {
          this.hideOrShowMenuItems(true);
          this.highlightActiveTab(val.url);
        }
      }
    });
  }

  ngOnInit() {
  }

  highlightActiveTab(url: string) {
    url.replace("/", "\/");
    let element = document.querySelector(`li[data-route="${url}"]`);
    if(!element){
      element = document.querySelector(`li[data-route-base="${url}"]`);
    }
    if (element) {
      document.querySelectorAll(`li[data-route]`).forEach(item => {
        item.classList.remove('active');
      });
      element.classList.add('active');
    }
  }

  hideOrShowMenuItems(value: boolean) {
    let toggleButtonClasses = document.getElementById('toggleButton').classList;
    let navbarTogglerClasses = document.getElementById('navbarToggler').classList;
    if (value) {
      if (toggleButtonClasses.contains('hide')) {
        toggleButtonClasses.remove('hide');
      }
      if (navbarTogglerClasses.contains('hide')) {
        navbarTogglerClasses.remove('hide');
      }
    } else {
      if (!toggleButtonClasses.contains('hide')) {
        toggleButtonClasses.add('hide');
      }
      if (!navbarTogglerClasses.contains('hide')) {
        navbarTogglerClasses.add('hide');
      }
    }
  }

  viewDashboard(){
    this.authService.isUserAuthenticated(this.authService.getBearerToken())
    .then(() => {
      this.routeService.toDashboard();
    })
    .catch(() => {
      this.routeService.toLogin();
    })
  }

}
