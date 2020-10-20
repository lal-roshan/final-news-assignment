import { AppPage } from './page-objects/app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('StackRoute Times');
  });
  
  it('should navigate to home when brand-logo is clicked',()=>{
    let element = page.getBrandLogo();
    element.click();
    expect(browser.getCurrentUrl()).toMatch('localhost:4205')
  })

  it('should navigate to home when title is clicked',()=>{
    let element = page.getTitle();
    element.click();
    expect(browser.getCurrentUrl()).toMatch('localhost:4205')
    
  })
  
  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
