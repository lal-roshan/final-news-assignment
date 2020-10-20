import { browser, by, element, ElementFinder } from 'protractor';

export class NewsReaderViewPage {

  // navigate to dashboard view page
  navigateToDashboardView() {
    return browser.get('/dashboard/newsreader');
  }

  // to pause browser
  pauseBrowser(port) {
    browser.pause(port);
  }

  // app component
  getAppComponent(): ElementFinder {
    return element(by.tagName('app-root'));
  }

  getFavoriteIcon() {
    return element.all(by.css('mat-icon')).get(1)
  }
  
  getNewsItem(){
    return element.all(by.css('.news-image'))
  }

  getFaceIcon() {
    return element.all(by.css('mat-icon')).get(2)
  }
}
