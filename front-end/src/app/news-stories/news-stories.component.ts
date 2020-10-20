import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-stories',
  templateUrl: './news-stories.component.html',
  styleUrls: ['./news-stories.component.css']
})
export class NewsStoriesComponent implements OnInit {

  /// property for storing error message on news fetch
  public errorMessage = '';

  /// property for storing fetch list of news
  public newsList: Array<News> = [];

  /// inject dependencies
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    /// Fetching and initialising the news list
    this.newsService.getTrendingNews()
      .subscribe(response => {

        /// If there are any news in the response
        if (response['articles'] !== undefined &&
          response['articles'] !== undefined &&
          response['articles'].length > 0) {
          this.newsList = [...response['articles']];
        }
      },
        error => {
          console.log(error.status+"....");
          if (error.status === 404) {
            this.errorMessage = 'Unable to access news server to fetch news';
          } else if (error.status === 403){
            this.errorMessage = 'Unauthorized Access !!!';
          } else{
            this.errorMessage = 'Internal Server Error, Please Try Again Later';
          }
        });
  }
}
