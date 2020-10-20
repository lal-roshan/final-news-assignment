import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl = "http://localhost:59643/api/user/";

  /// the url to authentication server
  authenticationUrl = "http://localhost:55392/api/auth/";

  constructor(private httpClient: HttpClient) { }

  // registerUser(userData){
  //   console.log(userData["UserId"]);
  //   let addUser =  this.httpClient.post(this.userApiUrl,{
  //     UserId: userData["UserId"],
  //     FirstName: userData["FirstName"],
  //     LastName: userData["LastName"],
  //     Email: userData["Email"],
  //     CreatedAt: new Date()
  //   });

  //   let registerUser = this.httpClient.post(this.authenticationUrl + 'register',{
  //     UserId: userData["UserId"],
  //     Password: userData["Password"]
  //   });

  //   return forkJoin([addUser, registerUser]);
  // }

  createUserProfile(userData){
    console.log(userData);
    return this.httpClient.post(this.userApiUrl,{
      UserId: userData["UserId"],
      FirstName: userData["FirstName"],
      LastName: userData["LastName"],
      Email: userData["Email"],
      CreatedAt: new Date()
    });
  }

  registerUserCredentials(userData){
    return this.httpClient.post(this.authenticationUrl + 'register',{
          UserId: userData["UserId"],
          Password: userData["Password"]
    });
  }

  deleteUserProfile(userId:string){
    return this.httpClient.delete(this.userApiUrl, {
      params: new HttpParams().set('userId', userId)
    });
  }
}
