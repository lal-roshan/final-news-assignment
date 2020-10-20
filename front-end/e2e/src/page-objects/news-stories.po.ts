import { browser, by, element, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class NewsStoriesViewPage {

  // navigate to dashboard view page
  navigateToDashboardView() {
    return browser.get('/dashboard');
  }

  // to pause browser
  pauseBrowser(port) {
    browser.pause(port);
  }

  // app component
  getAppComponent(): ElementFinder {
    return element(by.tagName('app-root'));
  }

  getCards() {
    return element.all(by.css('mat-card'))
  }
  getReadButton() {
    return element.all(by.css('mat-card mat-card-actions button'))
  }
  getConfirmationMessageText() {
    return element.all(by.css('mat-card small')).get(0).getText();
  }
}
