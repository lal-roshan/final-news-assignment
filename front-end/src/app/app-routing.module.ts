import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewsReaderComponent } from './news-reader/news-reader.component';
import { NewsStoriesComponent } from './news-stories/news-stories.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateGuard],
    children: [
      {
        path: 'newsreader',
        component: NewsReaderComponent,
        canActivate: [CanActivateGuard],
      },
      {
        path: 'newsstories',
        component: NewsStoriesComponent,
        canActivate: [CanActivateGuard],
      },
      {
        path: '',
        redirectTo: 'newsstories',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
