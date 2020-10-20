import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news';
import { AuthenticationService } from 'src/app/services/authentication.service';


describe('NewsService', () => {

  let httpMock: HttpTestingController;
  let newsService : NewsService;

  let mockResponsePositive = [{
    "status":"Ok",
    "articles":[
      {
        "author": "Murali Krishnan",
        "title": "Ex-SC judge may probe Telangana encounter that killed 4 rapists: Top court - Hindustan Times",
        "description": "The top court on Wednesday proposed to appoint a retired Supreme Court judge to inquire into the Telangana encounter that killed four accused of raping and murdering a 26-year-old veterinary doctor.",
        "url": "https://www.hindustantimes.com/india-news/ex-sc-judge-may-probe-telangana-encounter-that-killed-4-rapists-top-court/story-FC7GtxQSCzdZwgJz7HXH8O.html",
        "urlToImage": "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/12/11/Pictures/police-officers-veterinarian-killed-encounter-accused-murder_6840a4e6-1bec-11ea-9a53-e5149fe5d3ed.jpg",
        "publishedAt": "2019-12-11T08:03:15Z",
        "content": "A retired Supreme Court judge may be asked to conduct a probe into the killing of four rape accused in last week’s alleged encounter at Chatanpalli near Shadnagar in Telangana. According to the police version, the four men accused of rape and murder of a 26-y… [+2258 chars]",
        "id": 2
      }
    ]
  }]

  let mockResponse404;

 
  beforeEach(()=>{

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [NewsService,
      {
        provide:AuthenticationService,
        useClass : class AuthenticationServiceStub{
          getBearerToken():string{
            return "token"
          }
        }
      }]
    
    })

    
  })

  beforeEach(()=>{
    httpMock = TestBed.get(HttpTestingController);
    newsService = TestBed.get(NewsService);
    newsService.trending_news_api_url="http://localhost:3000/api/news"
    mockResponse404 = {
      message: `Http failure response for ${newsService.trending_news_api_url} : 404 Not Found`,
      name: 'HttpErrorResponse',
      ok: false,
      status : 404,
      statusText: 'Not Found',
      url: `${newsService.trending_news_api_url}`
     };
  })

  it('should create an instance', () => {
    expect(newsService).toBeTruthy();
  });

  it('should handle getTrendingNews() function',fakeAsync(()=>{
    newsService.getTrendingNews().subscribe(response=>{
      expect(response["articles"]).toEqual(mockResponsePositive["articles"])
    });
    const mockRequest = httpMock.expectOne(`${newsService.trending_news_api_url}`)
    expect(mockRequest.request.url).toEqual(`${newsService.trending_news_api_url}`, 'requested url should match with server api url');
    expect(mockRequest.request.method).toBe('GET', 'should handle requested method type.');
    mockRequest.flush(mockResponsePositive);

  }))

  it('should handle 404 error from getTrendingNews() function',fakeAsync(()=>{
    newsService.getTrendingNews().subscribe(response=>{ },
    error=>{
      console.log(error.message)
      expect(error).toBeDefined('should throw error for resource not found')
      expect(error.status).toBe(404,'should respond with status 404')
    });
    const mockRequest = httpMock.expectOne(`${newsService.trending_news_api_url}`)
    expect(mockRequest.request.url).toEqual(`${newsService.trending_news_api_url}`, 'requested url should match with server api url');
    expect(mockRequest.request.method).toBe('GET', 'should handle requested method type.');
    mockRequest.error(new ErrorEvent('Not Found'),{status:404})
  }))

  it('should handle addNews() function with right parameter',()=>{
    let newsItem : News = new News();
    newsItem.author = "Hindustan Times";
    newsItem.title = "Jayeshbhai Jordaar: Arjun Reddy actor Shalini Pandey to make Bollywood debut opposite Ranveer Singh - Hindustan Times";
    newsItem.description = "Shalini Pandey says she is ‘very fortunate to be sharing screen space with Ranveer Singh who is one of the biggest superstars of our generation’.";
    newsItem.url = "https://www.hindustantimes.com/bollywood/jayeshbhai-jordaar-arjun-reddy-actor-shalini-pandey-to-make-bollywood-debut-opposite-ranveer-singh/story-33vzmNqEOVlZkz2jllSZUJ.html";
    newsItem.urlToImage = "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/12/11/Pictures/_846a2632-1be3-11ea-9a53-e5149fe5d3ed.jpg";
    newsItem.publishedAt = "2019-12-11T06:57:50Z";
    newsItem.content = "Actor Shalini Pandey, who featured in the Telugu blockbuster Arjun Reddy, will make her Bollywood debut opposite Ranveer Singh in Jayeshbhai Jordaar. The film is produced by Yash Raj Films. \r\nSpeaking with Hindustan Times, Shalini said about her debut, “I’ve … [+1258 chars]";
    newsItem.id = 2;
 

    newsService.addNews(newsItem).subscribe(
      response=>{
        expect(response).toEqual(newsItem)
      },
      error=>{}
    );
    const mockRequest = httpMock.expectOne(`http://localhost:3000/api/v1/news`)
    expect(mockRequest.request.url).toEqual(`http://localhost:3000/api/v1/news`, 'requested url should match with server api url');
    expect(mockRequest.request.method).toBe('POST', 'should handle requested method type.');
    mockRequest.flush(newsItem);
  })

  it('should handle 404 error from addNews() function',fakeAsync(()=>{
    let newsItem : News = new News();
    newsItem.author = "Hindustan Times";
    newsItem.title = "Jayeshbhai Jordaar: Arjun Reddy actor Shalini Pandey to make Bollywood debut opposite Ranveer Singh - Hindustan Times";
    newsItem.description = "Shalini Pandey says she is ‘very fortunate to be sharing screen space with Ranveer Singh who is one of the biggest superstars of our generation’.";
    newsItem.url = "https://www.hindustantimes.com/bollywood/jayeshbhai-jordaar-arjun-reddy-actor-shalini-pandey-to-make-bollywood-debut-opposite-ranveer-singh/story-33vzmNqEOVlZkz2jllSZUJ.html";
    newsItem.urlToImage = "https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/12/11/Pictures/_846a2632-1be3-11ea-9a53-e5149fe5d3ed.jpg";
    newsItem.publishedAt = "2019-12-11T06:57:50Z";
    newsItem.content = "Actor Shalini Pandey, who featured in the Telugu blockbuster Arjun Reddy, will make her Bollywood debut opposite Ranveer Singh in Jayeshbhai Jordaar. The film is produced by Yash Raj Films. \r\nSpeaking with Hindustan Times, Shalini said about her debut, “I’ve … [+1258 chars]";
    newsItem.id = 2;
 

    newsService.addNews(newsItem).subscribe(
      response=>{},
      error=>{
        console.log(error.message)
        expect(error).toBeDefined('should throw error for resource not found')
        expect(error.status).toBe(404,'should respond with status 404')
      }
    );
    const mockRequest = httpMock.expectOne(`http://localhost:3000/api/v1/news`)
    expect(mockRequest.request.url).toEqual(`http://localhost:3000/api/v1/news`, 'requested url should match with server api url');
    expect(mockRequest.request.method).toBe('POST', 'should handle requested method type.');
    mockRequest.error(new ErrorEvent('Not Found'),{status:404})
    
  }))

});
