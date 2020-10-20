import {  NewsStoriesViewPage } from './page-objects/news-stories.po';
import { browser } from 'protractor';

describe('news-stories page', () => {
  let page: NewsStoriesViewPage;
  const emptyNoteValues = ['', ''];

  beforeEach(() => {
    page = new NewsStoriesViewPage();
  });

  it('should display news article as card',()=>{
    browser.sleep(1000);
    let elements = page.getCards();
    expect(elements.count()).toBeGreaterThanOrEqual(1);
  })
  
  it('should add news article to reading list on click of `Read Later` button',()=>{
    let elements = page.getReadButton();
    elements.get(0).click();
    let confirmationMessage = page.getConfirmationMessageText();
    expect(confirmationMessage).toEqual('This News Article is Bookmarked');
    browser.sleep(1500);
  })

});
