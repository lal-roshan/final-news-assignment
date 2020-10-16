## Final Assignment
	
### Objective:
	
The Objective of this assignment is to integrate the news api front-end solution developed using angular with the RESTful backend developed using .NET Core	
	
### Expected Outcome:	
	
By the end of this assignment you should be able to generate an end-to-end solution using angular as frontend and .NET core as backend

##### Estimated Duration : 8-10 Hours

### Prerequisites

1. Frontend solution with all the requirements as stated in news-level-2 assignment

2. Backend solution with all the requirements as stated in .NET core news-api-step6 assignment


### About 3-Party NewsAPI
	
1. The NEWS API should be used as data source
- To get trending news use the following endpoint. [Top Headlines endpoint]
(https://newsapi.org/v2/top-headlines?country=in&apikey=<<api_key>>&page=1)
2. To register for an API key, follow these steps:
- You need to signup to [NEWSAPI] (https://newsapi.org/register).
- After registration, API key is generated for you.

### Assignment:	

The primary objective of this assignment is to replace the backend NodeJS server with the .NET core server.

### Instructions

1. The UI design should use Bootstrap for responsiveness
2. App should be able to get the news from newsapi.org.
3. App should allow the logged user to view the news, add/remove bookmark to the news for reading later.
4. Every card should have `Read Later` button.
5. As soon as a user clicks on `Read Later` button the full description as well as link of that news should get stored in the backend database along with id of the user
6. The news marked for `Read Later` should be listed on the favorites page
7. The bookmarked news should have `Remove` button
8. As the user click on `Remove` button, the bootmarked news item should get removed from the view as well as backend database
9. Only the authenticated user should be allowed to view news, bookmark news to view later and read the bookmarked news
10. The complete frontend and backend services should be dockerized
11. Provide additional unit test cases for testing removing bookmarked news
12. Provide additional e2e test cases that includes the workflow for removing bookmarked news
13. Add a `README.md` file that contains the solution details that should include:
- solution objective
- key requirements implemented
- technologies used to develop the solution - backend and frontend
- technologies used to develop the test code of the solution
- backend databases used for data persistence
- deployment details
- commands to access and execute the application deployed in containers
- url to access api documentation
14. Ensure the git commit happens frequently at every logical breakpoint with appropriate git command

### Submitting your solution for preliminary automated review  

1. Ensure the final assignment is pushed to git
2. Notify the mentor by providing the git repo url of solution over slack
3. Provide mentor with the reporter access for manual evaluation
4. Post successful evaluation, cadet will have to demonstrate the working of the code to the mentor with a technical discussion


