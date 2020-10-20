import { browser, by, element } from 'protractor';

export class AppPage {
  
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.navbar-brand div')).getText() as Promise<string>;
  }
  
  getTitle() {
    return element(by.css('.navbar-brand div'))
  }
  getBrandLogo() {
    return element(by.css('.navbar-brand img'))
  }
  
}
