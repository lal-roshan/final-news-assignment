import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { findIndex, tap } from 'rxjs/operators';
import { News } from '../models/news';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  /// The api key for fetching trending news
  api_key: string = `ae9d31dc385f49428d73cc27ac4dea15`;

  /// The url for trending news server
  trending_news_api_url: string = `https://newsapi.org/v2/top-headlines?country=in&apikey=${this.api_key}&page=1`;

  /// url for bookmarked news server
  news_api_url: string = `http://localhost:59637/api/news/`;

  bookmarks: Array<News> = [];

  bookmarksSubject: BehaviorSubject<Array<News>> = new BehaviorSubject(this.bookmarks);

  //inject the required dependencies in constructor
  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) { }

  /// Method for fetching the trending news
  /// <returns>The response from the news API</returns>
  getTrendingNews() {
    return this.httpClient.get(this.trending_news_api_url);
  }

  /// Method for adding the news to read later 
  /// <param name="newsItem">Represents the news to be added to read later</param>
  /// <returns>Returns the News item added</returns>
  public addNews(newsItem: News) {
    return this.httpClient.post<number>(this.news_api_url, newsItem, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    })
      .pipe(tap(
        response => {
          if (!isNaN(response)) {
            console.log(response);
            newsItem.id = response;
            this.bookmarks.push(newsItem);
            console.log("In add service:" + this.bookmarks.entries);
            this.bookmarksSubject.next(this.bookmarks);
            console.log("In add service:" + this.bookmarksSubject.getValue().values);
          }
        }
      ));
  }

  /// Method for fetching all bookmarked news
  /// <returns> Returns the array of bookmarked news </return>
  getBookmarkedNews(): Observable<Array<News>> {
    if (this.bookmarksSubject.getValue().length === 0) {
      this.httpClient.get<Array<News>>(this.news_api_url, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      })
        .subscribe(
          response => {
            this.bookmarks = response;
            this.bookmarksSubject.next(this.bookmarks);
          }
        );
    }
    console.log("get service: " + this.bookmarksSubject.getValue().length);
    return this.bookmarksSubject;
  }

  /// Method for deleting bookmarked news
  deleteNews(newsId: number) {
    return this.httpClient.delete(this.news_api_url + newsId, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    })
      .pipe(tap(
        (response) => {
          if (response) {
            console.log("In delete service:" + response);
            var removeIndex = this.bookmarks.findIndex(item => item.id == newsId || item['newsId'] == newsId);
            console.log("In delete service:" + removeIndex);
            if(removeIndex > -1){
              this.bookmarks.splice(removeIndex, 1);
              this.bookmarksSubject.next(this.bookmarks);
            }
          }
        }
      ));
  }

}
