import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NewsStoriesComponent } from './news-stories/news-stories.component';
import { NewsStoryCardComponent } from './news-story-card/news-story-card.component';
import { NewsReaderComponent } from './news-reader/news-reader.component';
import { NewsReaderCardComponent } from './news-reader-card/news-reader-card.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

import { AuthenticationService } from './services/authentication.service';
import { RouteService } from './services/route.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NewsStoriesComponent,
    NewsStoryCardComponent,
    NewsReaderComponent,
    NewsReaderCardComponent,
    FooterComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService,
    RouteService,
    UserService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
  ]
})
export class AppModule { }
