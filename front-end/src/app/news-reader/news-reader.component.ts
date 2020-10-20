import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls: ['./news-reader.component.css']
})
export class NewsReaderComponent implements OnInit {

  /// Property for storing error messages on news fetch
  public errorMessage = '';

  /// Property for storing the list of news fetched
  public newsList: Array<News> = [];

  /// inject dependencies to the constructor
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    /// Fetching and initialising news list
    this.newsService.getBookmarkedNews()
      .subscribe(response => {
        /// If there are any news in the response
        if (response !== undefined &&
          response !== undefined) {
          this.newsList = [...response].reverse();
        }
      },
        error => {
          if (error.status === 404) {
            this.errorMessage = 'Unable to access news server to fetch news';
          } else if (error.status === 403) {
            this.errorMessage = 'Unauthorized Access !!!';
          } else {
            this.errorMessage = 'Internal Server Error, Please Try Again Later';
          }
        });
  }
}
