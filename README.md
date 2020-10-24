## StackRoute Times

This is an assignment that incorporates an angular application as front-end and RESTful micro services as back-end.

For running the application, use the command 'docker-compose up' and access the application at http://localhost:8087

Services used

1 Authentication Service
* Runs at http://localhost:8083/api/auth
* The service is used for existing user login and authentication and for register credentials of new user while signup.
* The API documentation is available at http://localhost:8083/swagger

2 News Service
* Runs at http://localhost:8084/api/news
* The service is used for fetching bookmarked news, adding news article to bookmarks and deleting them.
* The API documentation is available at http://localhost:8084/swagger

3 User Service
* Runs at http://localhost:8086/api/user
* The service is used while new user signup, for the profile creation.
* The API documentation is available at http://localhost:8086/swagger

4 Trending news API
* The NEWS API should be used as data source for getting trending news use the following endpoint.
https://newsapi.org/v2/top-headlines?country=in&apikey=<api_key>&page=1
* To register for an API key, follow these steps:
o - You need to sign up to [NEWSAPI] (https://newsapi.org/register).
o - After registration, API key is generated for you.


Overview

* The application is a web site for viewing trending news and bookmarked news.
* The user has to login to the system for viewing news.
* On running the application, user is navigated to the login page (http:localhost:8087/login).
* If he/she is a registered user, they can login to the system using their registered username and password.
* If some error occurs while trying to log in, user is informed about the error by displaying error message at the bottom part of the login part.
* If user hasn't registered yet, they can click on the 'Sign Up' link provided in the login page.
* If sign up was chosen, user is redirected to a signup page (http:localhost:8087/signup) where he/she has to fill up the mandatory details like username, first name, email and password.
* On successful registration, user is automatically redirected to login page.
* If some error occurs during registration, user is informed about the error by displaying the message at the bottom part of signup.
* On successful login, user is redirected to a dashboard view (http:localhost:8087/dashboard/newsstories) having cards displayed for trending news.
* The dashboard has a header where the website name, logo and menu item links are provided.
* The 'home' icon is used for navigating to trending news view, 'heart' icon used for navigating to bookmarked news view and 'face' icon for log out.
* Each news article can have some information related to news like Title, image, author, content etc.
* Each news article in trending news has a 'Read Later' button associated with it at the right-bottom corner.
* On clicking the 'Read Later' button, the article is saved to bookmarks and an indication message is shown with a green tick saying 'The Article was bookmarked' and the button will be disabled.
* If some error occurs while adding news to bookmarks, user is informed about it with the error message shown right below the button in red font.
* Now if the user navigates to bookmarked news (http:localhost:8087/dashboard/newsreader) he/she can view all the news that was added to bookmarks.
* The news cards look similar to the cards in the trending news view except that the card won't be having a 'Read Later' button. Instead, each of the cards will be having a url to the original news at the bottom-left corner and a ‘delete’ button at the bottom-right corner.
* On clicking the news url, user is navigated to the original news in a new browser tab.
* On clicking the 'delete' icon, the article is removed from bookmarks and a message is displayed to user confirming the deletion.
* If some error occurs while deleting the news from bookmarks, user is informed about it with an error message displayed below the button in red font.
* Footer is displayed throughout containing social media links and copy right information.



