import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsReaderCardComponent } from '../src/app/news-reader-card/news-reader-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';

describe('NewsReaderCardComponent', () => {
  let component: NewsReaderCardComponent;
  let fixture: ComponentFixture<NewsReaderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ NewsReaderCardComponent ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[HttpTestingController]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsReaderCardComponent);
    component = fixture.componentInstance;
    component.newsItem = new News();
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

});
