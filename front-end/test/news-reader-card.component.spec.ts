import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { NewsReaderCardComponent } from '../src/app/news-reader-card/news-reader-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NewsService } from 'src/app/services/news.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { News } from 'src/app/models/news';
import { of, throwError } from 'rxjs';
describe('NewsReaderCardComponent', () => {
  let component: NewsReaderCardComponent;
  let fixture: ComponentFixture<NewsReaderCardComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      declarations: [ NewsReaderCardComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[
        HttpTestingController,
        NewsService,
        AuthenticationService,
        MatSnackBar
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsReaderCardComponent);
    component = fixture.componentInstance;
    component.newsItem = new News();
    newsService = TestBed.get(NewsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain news image within div element with class name .news-image',()=>{
    let matImage = fixture.debugElement.nativeElement.querySelector('.news-image img');
    expect(matImage).toBeTruthy();
  })

  it('should contain news description within div element with class name .news-description',()=>{
    let matCardContent = fixture.debugElement.nativeElement.querySelector('.news-description');
    expect(matCardContent).toBeTruthy();
  })

  it('should contain link with news url within div element with class name .news-url and contain text `Click to Read More`',()=>{
    let matCardContent = fixture.debugElement.nativeElement.querySelector('.news-url a');
    expect(matCardContent).toBeTruthy();
    expect(matCardContent.innerHTML).toContain('Click to Read More')
  })

  it('should contain button with `delete` mat-icon',()=>{
    let matCardButton = fixture.debugElement.nativeElement.querySelectorAll('mat-icon');
    expect(matCardButton[0]).toBeTruthy();
    expect(matCardButton[0].innerText).toBe('delete')
  })

  it('should delete news from read later on click of button',()=>{
    let newsItem : News =  new News();
    newsItem.author = "Times Of India";
    newsItem.title = "Mumbai terror attack mastermind Hafiz Saeed charged by Pakistani court with terror-financing - Times of India",
    newsItem.description = "Pakistan News: Hafiz Saeed, the Mumbai terror attack mastermind and chief of the banned JuD, was indicted on Wednesday by a Pakistani anti-terrorism court on terror-",
    newsItem.url ="https://timesofindia.indiatimes.com/world/pakistan/mumbai-terror-attack-mastermind-hafiz-saeed-charged-by-pakistani-court-with-terror-financing/articleshow/72470392.cms",
    newsItem.urlToImage = "https://static.toiimg.com/thumb/msid-72470383,width-1070,height-580,imgsize-310799,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    newsItem.publishedAt = "2019-12-11T07:46:00Z",
    newsItem.content = "Copyright © 2019 Bennett, Coleman &amp; Co. Ltd. All rights reserved. For reprint rights: Times Syndication Service",
    newsItem.id =  101;

    component.newsItem = newsItem;
    spyOn(newsService,"deleteNews").and.returnValue(of(true));
    
    let matCardButton = fixture.debugElement.nativeElement.querySelector('button');
    
    expect(matCardButton).toBeDefined();
    matCardButton.click();
    fixture.detectChanges();

    expect(newsService.deleteNews).toHaveBeenCalledWith(newsItem.id);
    expect(component.confirmationMessage).toEqual('Deleted');
  })

  it('should handle error 403 when resource is being accessed by an unauthorized user',fakeAsync(()=>{
    let newsItem : News =  new News();
    newsItem.author = "Times Of India";
    newsItem.title = "Mumbai terror attack mastermind Hafiz Saeed charged by Pakistani court with terror-financing - Times of India",
    newsItem.description = "Pakistan News: Hafiz Saeed, the Mumbai terror attack mastermind and chief of the banned JuD, was indicted on Wednesday by a Pakistani anti-terrorism court on terror-",
    newsItem.url ="https://timesofindia.indiatimes.com/world/pakistan/mumbai-terror-attack-mastermind-hafiz-saeed-charged-by-pakistani-court-with-terror-financing/articleshow/72470392.cms",
    newsItem.urlToImage = "https://static.toiimg.com/thumb/msid-72470383,width-1070,height-580,imgsize-310799,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    newsItem.publishedAt = "2019-12-11T07:46:00Z",
    newsItem.content = "Copyright © 2019 Bennett, Coleman &amp; Co. Ltd. All rights reserved. For reprint rights: Times Syndication Service",
    newsItem.id =  1;

    component.newsItem = newsItem;
    spyOn(newsService,'deleteNews').and.callThrough().and.returnValue(throwError({status:403,message:'Unauthorized Access !!!'}));
  
    let matCardButton = fixture.debugElement.nativeElement.querySelector('button');
    
    matCardButton.click();
    fixture.detectChanges();
    
    expect(newsService.deleteNews).toHaveBeenCalledWith(newsItem.id);
    expect(component.errorMessage.length).toBeGreaterThan(0);
    expect(component.errorMessage).toEqual('Unauthorized Access !!!');

  }));

  it('should handle error 404 when resource not found when Read Later button is clicked',fakeAsync(()=>{

    let newsItem : News =  new News();
    newsItem.author = "Times Of India";
    newsItem.title = "Mumbai terror attack mastermind Hafiz Saeed charged by Pakistani court with terror-financing - Times of India",
    newsItem.description = "Pakistan News: Hafiz Saeed, the Mumbai terror attack mastermind and chief of the banned JuD, was indicted on Wednesday by a Pakistani anti-terrorism court on terror-",
    newsItem.url ="https://timesofindia.indiatimes.com/world/pakistan/mumbai-terror-attack-mastermind-hafiz-saeed-charged-by-pakistani-court-with-terror-financing/articleshow/72470392.cms",
    newsItem.urlToImage = "https://static.toiimg.com/thumb/msid-72470383,width-1070,height-580,imgsize-310799,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    newsItem.publishedAt = "2019-12-11T07:46:00Z",
    newsItem.content = "Copyright © 2019 Bennett, Coleman &amp; Co. Ltd. All rights reserved. For reprint rights: Times Syndication Service",
    newsItem.id =  1;

    component.newsItem = newsItem;
    spyOn(newsService,'deleteNews').and.callThrough().and.returnValue(throwError({status:404,message:'Unable to access news server to add this news item'}));
  
    let matCardButton = fixture.debugElement.nativeElement.querySelector('button');
    
    matCardButton.click();
    fixture.detectChanges();
    
    expect(newsService.deleteNews).toHaveBeenCalledWith(newsItem.id);
    expect(component.errorMessage.length).toBeGreaterThan(0);
    expect(component.errorMessage).toEqual('Unable to access news server for deleting this news item');
  }))

  it('should handle errors other than resource not found error when Read Later button is clicked',fakeAsync(()=>{
  
    let newsItem : News =  new News();
    newsItem.author = "Times Of India";
    newsItem.title = "Mumbai terror attack mastermind Hafiz Saeed charged by Pakistani court with terror-financing - Times of India",
    newsItem.description = "Pakistan News: Hafiz Saeed, the Mumbai terror attack mastermind and chief of the banned JuD, was indicted on Wednesday by a Pakistani anti-terrorism court on terror-",
    newsItem.url ="https://timesofindia.indiatimes.com/world/pakistan/mumbai-terror-attack-mastermind-hafiz-saeed-charged-by-pakistani-court-with-terror-financing/articleshow/72470392.cms",
    newsItem.urlToImage = "https://static.toiimg.com/thumb/msid-72470383,width-1070,height-580,imgsize-310799,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
    newsItem.publishedAt = "2019-12-11T07:46:00Z",
    newsItem.content = "Copyright © 2019 Bennett, Coleman &amp; Co. Ltd. All rights reserved. For reprint rights: Times Syndication Service",
    newsItem.id =  1;

    component.newsItem = newsItem;
    spyOn(newsService,'deleteNews').and.callThrough().and.returnValue(throwError({status:0,message:'Internal Server Error, Please Try Again Later'}));
  
    let matCardButton = fixture.debugElement.nativeElement.querySelector('button');
    
    matCardButton.click();
    fixture.detectChanges();
    
    expect(newsService.deleteNews).toHaveBeenCalledWith(newsItem.id);
    expect(component.errorMessage.length).toBeGreaterThan(0);
    expect(component.errorMessage).toEqual('Internal Server Error, Please Try Again Later');
  }))

});
