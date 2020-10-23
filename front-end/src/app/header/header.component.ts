import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /// Property holding the title name
  @Input() public title: string;

  /// Injecting router for detecting url changes
  constructor(private router: Router) {
    /// Subscribe to change in routes for highlighting the proper menu icons
    router.events.subscribe(val => {
      if (val instanceof NavigationStart && val.url != undefined) {
        /// If the url is of login or signup the menu items should not be visible
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

  /// Method for highlighting the active menu item
  highlightActiveTab(url: string) {
    url.replace("/", "\/");
    let element = document.querySelector(`li[data-route="${url}"]`);
    if (!element) {
      element = document.querySelector(`li[data-route-base="${url}"]`);
    }
    if (element) {
      document.querySelectorAll(`li[data-route]`).forEach(item => {
        item.classList.remove('active');
      });
      element.classList.add('active');
    }
  }

  /// Method for hiding or showing menu items
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
}
