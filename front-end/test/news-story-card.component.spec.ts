import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewsStoryCardComponent } from '../src/app/news-story-card/news-story-card.component';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';
import { Observable, throwError, of } from 'rxjs';

describe('NewsStoryCardComponent', () => {
  let component: NewsStoryCardComponent;
  let fixture: ComponentFixture<NewsStoryCardComponent>;
  let newsService : NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ NewsStoryCardComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[HttpTestingController, 
        {
        provide:NewsService,
        useClass:class NewsServiceStub{
          addNews(news : News):Observable<Object>{
            return of(news);
          }
        }
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsStoryCardComponent);
    component = fixture.componentInstance;
    component.newsItem = new News();
    newsService = TestBed.get(NewsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain mat-card',()=>{
    let matCard = fixture.debugElement.nativeElement.querySelector('mat-card');
    expect(matCard).toBeTruthy();
  });

  it('should contain mat-card with news image',()=>{
    let matImage = fixture.debugElement.nativeElement.querySelector('mat-card img');
    expect(matImage).toBeTruthy();
  })

  it('should contain card content for news title',()=>{
    let matCardContent = fixture.debugElement.nativeElement.querySelector('mat-card-content');
    expect(matCardContent).toBeTruthy();
  })

  it('should contain button in mat-card-actions section with text `Read Later`',()=>{
    let matCardButton = fixture.debugElement.nativeElement.querySelector('mat-card-actions button');
    expect(matCardButton).toBeTruthy();
    expect(matCardButton.innerText).toBe('Read Later')
  })

  it('should add news to read later on click of button',()=>{
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
    spyOn(newsService,"addNews").and.callThrough();
    
    let matCardButton = fixture.debugElement.nativeElement.querySelector('mat-card-actions button');
    
    matCardButton.click();
    fixture.detectChanges();
    
    expect(newsService.addNews).toHaveBeenCalledWith(newsItem);
    expect(component.confirmationMessage).toEqual('This News Article is Bookmarked')
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
    spyOn(newsService,'addNews').and.callThrough().and.returnValue(throwError({status:403,message:'Unauthorized Access !!!'}));
  
    let matCardButton = fixture.debugElement.nativeElement.querySelector('mat-card-actions button');
    
    matCardButton.click();
    fixture.detectChanges();
    
    expect(newsService.addNews).toHaveBeenCalledWith(newsItem);
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
    spyOn(newsService,'addNews').and.callThrough().and.returnValue(throwError({status:404,message:'Unable to access news server to add this news item'}));
  
    let matCardButton = fixture.debugElement.nativeElement.querySelector('mat-card-actions button');
    
    matCardButton.click();
    fixture.detectChanges();
    
    expect(newsService.addNews).toHaveBeenCalledWith(newsItem);
    expect(component.errorMessage.length).toBeGreaterThan(0);
    expect(component.errorMessage).toEqual('Unable to access news server to add this news item');
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
    spyOn(newsService,'addNews').and.callThrough().and.returnValue(throwError({status:0,message:'Internal Server Error, Please Try Again Later'}));
  
    let matCardButton = fixture.debugElement.nativeElement.querySelector('mat-card-actions button');
    
    matCardButton.click();
    fixture.detectChanges();
    
    expect(newsService.addNews).toHaveBeenCalledWith(newsItem);
    expect(component.errorMessage.length).toBeGreaterThan(0);
    expect(component.errorMessage).toEqual('Internal Server Error, Please Try Again Later');
  }))

});
