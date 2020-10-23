import { NewsReaderViewPage } from './page-objects/news-reader.po';
import { browser } from 'protractor';

describe('news-reader page', () => {
  let page: NewsReaderViewPage;
  const emptyNoteValues = ['', ''];

  beforeEach(() => {
    page = new NewsReaderViewPage();
  });

  it('should navigate to newsreader page on clicking favorite icon', () => {
    page.getFavoriteIcon().click();
    expect(browser.getCurrentUrl()).toContain('dashboard/newsreader')
    browser.sleep(1500);
  })

  it('should display bookmarked news', () => {
    expect(page.getNewsItem().count()).toBeGreaterThanOrEqual(1)
    browser.sleep(1000);
  })

  it('should delete news article on `delete` icon click', () => {
    let elements = page.getDeleteButton();
    elements.get(0).click();
    expect(page.getNewsItem().count()).toEqual(0);
    browser.sleep(1000);
  })

  it('should logout when face icon is clicked', () => {
    page.getFaceIcon().click();
    expect(browser.getCurrentUrl()).toContain('login')
    browser.sleep(1000);
  })

});
