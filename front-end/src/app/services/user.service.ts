import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /// The url for user server
  userApiUrl = "http://localhost:8086/api/user/";

  /// the url to authentication server
  authenticationUrl = "http://localhost:8083/api/auth/";

  /// Injecting http client
  constructor(private httpClient: HttpClient) { }

  /// Method for registering new user profile
  createUserProfile(userData){
    return this.httpClient.post(this.userApiUrl,{
      UserId: userData["UserId"],
      FirstName: userData["FirstName"],
      LastName: userData["LastName"],
      Email: userData["Email"],
      CreatedAt: new Date()
    });
  }

  /// Method for registering new user credentials
  registerUserCredentials(userData){
    return this.httpClient.post(this.authenticationUrl + 'register',{
          UserId: userData["UserId"],
          Password: userData["Password"]
    });
  }

  /// Method for deleting an existing user profile details
  deleteUserProfile(userId:string){
    return this.httpClient.delete(this.userApiUrl, {
      params: new HttpParams().set('userId', userId)
    });
  }
}
