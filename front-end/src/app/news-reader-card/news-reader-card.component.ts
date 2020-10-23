import { Component, OnInit, Input } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-reader-card',
  templateUrl: './news-reader-card.component.html',
  styleUrls: ['./news-reader-card.component.css']
})
export class NewsReaderCardComponent implements OnInit {

  errorMessage: string;

  confirmationMessage: string = '';

  /// newsItem object representing the news details of the current card component
  @Input() public newsItem: News;

  constructor(private newsService: NewsService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  /// Method for deleting a news
  deleteNews() {
    /// Setting the id of the news to be deleted
    let newsId = this.newsItem['newsId'];
    if (!newsId) {
      newsId = this.newsItem.id;
    }
    this.newsService.deleteNews(newsId)
      .subscribe(response => {
        /// If news was successfully deleted a toast message is shown as confirmation
        if (response) {
          this.confirmationMessage = 'Deleted';
          let toast = this.snackbar.open(this.confirmationMessage, "", {
            duration: 1000,
            verticalPosition: 'top'
          });
        }
      }, error => {
        if (error.status === 404) {
          this.errorMessage = 'Unable to access news server for deleting this news item';
        } else if (error.status === 403) {
          this.errorMessage = 'Unauthorized Access !!!';
        } else {
          this.errorMessage = 'Internal Server Error, Please Try Again Later';
        }
      });
  }
}
