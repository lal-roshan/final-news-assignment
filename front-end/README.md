# Angular Assignment - News Level 2
	
### Objective:	
	
The Objective of this assignment is to understand routing and security implements in an angular application
	
### Expected Outcome:	
	
By the end of the assignment you should be able to understand	
	
1.  Forms  
2.  Authentication and Security	
3.  Routing and Guards

##### Estimated Duration : 3-4 Hours

### Prerequisites

1. Fork this boilerplate repository  
2. Clone the boilerplate repository and cd into it  
3. Install dependencies `npm install`  
4. Run the backend `npm run serve`  which shall run on port:3000  
5. Run the frontend `npm run start` which shall run on port:4200  

### About 3-Party NewsAPI
	
1. The NEWS API should be used as data source
- To get trending news use the following endpoint. [Top Headlines endpoint]
(https://newsapi.org/v2/top-headlines?country=in&apikey=<<api_key>>&page=1)
2. To register for an API key, follow these steps:
- You need to signup to [NEWSAPI] (https://newsapi.org/register).
- After registration, API key is generated for you.

### Know your server
1. On running npm run serve, following apis would be available for your use:
2. To authenticate user - POST - http://localhost:3000/auth/v1 - expecting data - { username, password }
3. To check if user is authenticated - POST - http://localhost:3000/auth/v1/isAuthenticated - expecting header - { 'Authorization', Bearer ${token} }
4. To get notes - GET - http://localhost:3000/api/v1/news - expecting header - { 'Authorization', Bearer ${token} }
5. To add a note - POST - http://localhost:3000/api/v1/news - expecting header - { 'Authorization', Bearer ${token} } and data - { note }

### Assignment:	

The primary objective of this assignment is to implement Routing, and  security through JWT Authentication and Route Guard
In continuation, to the requirements stated in Level-1 assignment, below are the broad requirements for this assignment:
1. Application should launch with login page
2. Upon sign-in, user should be navigated to dashboard that displays trending news stories
3. Each news story item can be bookmarked for later read by clicking on 'Read Later' button
4. The header should provide link to navigate to news-reader view and display the bookmarked news items
5. Header should contain link to logout 
6. Without login no page should be navigated to and if attempted, user should be redirected to login page

### Instructions

1. Fork and clone the boilerplate

2. Install all the dependencies using `npm install` command

3. The boilerplate code contains code files for 9 Components
	- app
	- header
	- login
	- dashboard
	- news-stories
	- news-story-card
	- news-reader
	- news-reader-card
    - footer

4. The `app` component should be the bootstrap component and load the header, footer components and provide router outlet for login and dashboard components

5. The `header` Component, in addition to handling the requirements stated in assignment-level-1, also handles below requirements:

	5.a Bootstrap navbar component contains `face` mat-icon, which when clicked allows user to logout
	
	5.b The `favorite` mat-icon when clicked will navigate to news-reader page that displays bookmarked news

	5.c The `home` mat-icon when clicked will navigate to news-stories page that displays trending news stories
	
6. The `login` component should be loaded whenever an unauthenticated user accesses the application

	6.a This component is expected to use Angular Reactive Forms with two form controls `username` and `password` with classes `username` and `password` respectively and a button with text Submit to submit the form

	6.b This component is expected to have an element with class name `error-message` to display any server error messages
	
	6.c It should have a `loginSubmit()` method called when form is submitted which shall validate the user credentials with server, if validation is successful, user is redirected to dashboard and his token is saved in local storage

	6.d The component class should contain `submitMessage` property that is assigned with error message, whenever login fails. The value of this property should be displayed on the component in element with class name `error-message`

	6.e The input elements for `username` and `password` are mandatory fields and should display error messages, if the user submits the form with blank fields

7. The `dashboard` component provides router-outlet for enabling navigation to trending news stories and bookmarked news

8. The `news-stories` component is responsible for fetching the trending news details from news api and load the details through news-story-card component

	8.a Should contain `newsList` property which stores the Array of type News fetched for trending news through `getTrendingNews()` method of NewsService

	8.b Should contain `errorMessage` string property which stores the error message `Unable to access news server to fetch news` for Resource Not Found (404) error
	
	8.c For each element in `newsList`, dashboard component loads NewsStoryCard component with the news item details passed to `newsItem` property of this component

	8.d Should contain `errorMessage` string property which stores the error message `Unauthorized Access !!!` for Unauthorized access (403) error

	8.e For any other error the `errorMessage` string property should be assigned the error message `Internal Server Error, Please Try Again Later`

9. The `news-story-card` component should display each news item assigned to it's input property `newsItem`

	9.a This Component uses angular material `card` component to display newsItem.

	9.b Card contains image element for displaying news item image

	9.c Card will display news item title inside it's mat-card-content section.

	9.d The mat-card-actions section should contain button with `Read Later` text

	9.e When the `Read Later` button is clicked for a specific news item, `addNews()` method of NewsService should be called and the value of `newsItem` property should get saved to the db.json file located in server running at port 3000.

	9.f The `card` component should contain `confirmationMessage` string property to display the message `This News Article is Bookmarked` when the news item is stored successfully to db.json file

	9.g `card` component should contain `errorMessage` string to display the error messages as mentioned below:
	- `Unable to access news server to add this news item` in event of error with status code 404
	- `Unauthorized Access !!!` in event of error with status code 403
	- `Internal Server Error, Please Try Again Later` in event of any other error

10. The `news-reader` component is responsible for fetching the bookmarked news details from db.json and load the details through NewsReaderCard component

	10.a Should contain `newsList` property which stores the Array of type News fetched for trending news through `getBookmarkedNews()` method of NewsService

	10.b Should contain `errorMessage` string property which stores the error message `Unable to access news server to fetch news` for Resource Not Found (404) error and `Unauthorized Access !!!` for Unauthorized access (403) error
	
	10.c For each element in `newsList`, dashboard component loads `news-reader-card` component with the news item details passed to `newsItem` property of this component

11. The `news-reader-card` component should display each news item assigned to it's input property `newsItem`

	11.a This component displays image, description details of newsItem and link with news url

	11.b News image is displayed using image element within div element defined with class name `.news-image`

	11.c News description is displayed using div element defined with class name `.news-description`

	11.d News URL is displayed using div element defined with class name `.news-url`

	11.e When the news url link is clicked the news page should open in new tab

12. The boilerplate code also contains code files for following Angular Services:
- NewsService
- AuthenticationService
- RouteService

13. `NewsService` should manage the operations for news data through methods as listed below:

	13.a getTrendingNews() : fetches trending news using newsapi

	13.b addNews(news:News) : accepts News type data and persists it to the server

	13.c getBookmarkedNews() : fetches bookmarked news from server

14. `AuthenticationService` talks to the server for user authentication and shall include methods -

	14.a authenticateUser() to get the user authenticated - accepts { username, password } and returns server response

	14.b setBearerToken() to save user token in local storage with key bearerToken - accepts the token string

	14.c getBearerToken() to fetch user token from local storage

	14.d isUserAuthenticated() to validate authenticity of a user - accepts the token string and returns Promise of authenticated status of user

15. `RouterService` to navigate user to available routes -

	15.a toDashboard() to navigate to dashboard route
	
	15.b toLogin() to navigate to login route

16. The solution should contain 'can-activate` route guard to protect the routes to dashboard and its child components

17. The `footer` component should display the Copyright information and social media link icons (not functional) 

18. The news data should be modelled using `News` class as done with level-1 assignment

19. Ensure following commands succeed in your local machine before submitting your code for Preliminary automated review as described below:


```
npm install
npm run build
npm run lint
npm run test
npm run e2e
```

### Submitting your solution for preliminary automated review  
1. Open `https://hobbes-ust.stackroute.in/#/` and login into the platform  
2. Under `Assignment repository` select `angular-news-level-2-assignment`, and branch `master`
3. Under `Your solution repository` select your own repository and branch
4. Press `Submit`
5. Press `click here` for the feedback
6. Evaluation will take around 5-10 mins to complete after which you need to refresh your browser and get the updated status
7. Watch out for your total score and detailed status on each test and eslint errors in the coloured blocks on the screen  
8. Fix failing test cases as well as eslint errors and re-submit your solution (you may skip any eslint errors reported in the provided spec files)  

### References:	
	
1. [Angular Material](https://material.angular.io)
2. [Angular Architecture](https://angular.io/guide/architecture)
3. [Angular CLI](https://cli.angular.io/)	
4. [Angular Templates](https://angular.io/guide/architecture#templates)	
5. [Angular Data Binding](https://angular.io/guide/architecture#data-binding)	
6. [Angular Reactive Forms](https://angular.io/guide/reactive-forms)
7. [Angular Routing](https://angular.io/guide/router)
8. [Angular Guard](https://angular.io/guide/router#milestone-5-route-guards)
