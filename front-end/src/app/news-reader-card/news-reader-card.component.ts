import { Component, OnInit, Input } from '@angular/core'; 
import { News } from '../models/news';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-reader-card',
  templateUrl: './news-reader-card.component.html',
  styleUrls: ['./news-reader-card.component.css']
})
export class NewsReaderCardComponent implements OnInit {

  errorMessage:string;

  /// newsItem object representing the news details of the current card component
  @Input() public newsItem: News;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
  }

  deleteNews(){
    console.log(this.newsItem);
    let newsId = this.newsItem['newsId'];
    if(!newsId){
      newsId = this.newsItem.id;
    }
    this.newsService.deleteNews(newsId)
    .subscribe(response => {
      console.log("In component:" + response);
      this.errorMessage = '';
    },error => {
      if(error.status === 404){
        this.errorMessage = 'News not found';
      } else if (error.status === 403) {
        this.errorMessage = 'Unauthorized Access !!!';
      } else {
        this.errorMessage = 'Internal Server Error, Please Try Again Later';
      }
    })
    
  }
}
