# betterboxd
by Sam Bernal-Damasco, Jordan Morales, Alex Merced

Live Application - http://betterboxd.herokuapp.com

## Wireframes

![Landing Page](https://res.cloudinary.com/htc0pkenr/image/upload/c_scale,w_450/v1574807796/wireframes/landingPage.png)
Landing Page
![Sign Up Glide](https://res.cloudinary.com/htc0pkenr/image/upload/c_scale,w_450/v1574807796/wireframes/signupGlide.png)
Sign Up Glide
![Main Not Logged In](https://res.cloudinary.com/htc0pkenr/image/upload/c_scale,w_450/v1574807797/wireframes/hotmoviesNotLogged.png)
Main Not Logged In
![Main Logged In](https://res.cloudinary.com/htc0pkenr/image/upload/c_scale,w_450/v1574807796/wireframes/hotmoviesLogged.png)
Main Logged In
![Movie View Not Logged In](https://res.cloudinary.com/htc0pkenr/image/upload/c_scale,w_450/v1574807796/wireframes/movieDetailsNotLogged.png)
Movie View Not Logged In
![Movie View Logged In](https://res.cloudinary.com/htc0pkenr/image/upload/c_scale,w_450/v1574807796/wireframes/movieDetailsLogged.png)
Movie View Logged In

## Project Summary
In this project we sought out to develop a clone of letterboxd.

- Groups Announced.
- Day 0: discussing ideas and personal brainstorming time.
- Assignment assigned.
- Day 1: met, plan, mapped out all basic routes and functions.
- Day 2: Finished writing MVP functionality and started stretch goals.
- Day 3: Finished out all functionality and some stretch goals, collaborated and decided on a frontend.
- Day 4: Primary frontend put together, various individual refinements
- Day 5: Front end touched up, various individual refinements
- Day 6:
- Day 7:
- Presentation on Day 8

Our group did a mixed amount of pair, group programming, and individual coding.

>Primary communication methods used for this team: Slack, Zoom, and Trello. We kept track of the project using Trello and a kanban method.
We frequently maintained contact on Zoom during the main chunk of our coding time. Our group stayed in regular communication and updated on various schedule changes through a slack group chat.

## User Stories
- Users are able to sign up and login.
- Users (logged in or out) can search and view movie details, likes, and comments.
- Only logged in Users are able to comment and like movies.
- A logged in User likes a movie and it's added to a personal favorite list.

## Technology Used
- Express
- AngularJS
- MongoDB/Mongoose
- Node.js
- HTML+CSS(bootstrap and bulma CSS frameworks)

##Feature Walkthroughs

- User is able to create an account, login and maintain a session.
- User logged in or logged out can can search movies and view movies information, likes and comments.
- User logged in can additionally leave comments, like movies and see their liked movies in their profile.

>We wanted our site functionality to be available to both a logged in user and one who has yet to sign up. While some functionality needed to be limited to only logged in users, the primary search and view is not. If a user wants to make a comment on a movie they need to first sign up and log in. Then they can view a movie card, make comments, like, or edit it. A user may only edit or delete their own comments. Liking a movie will both increase the like value for that movie and add the movie to that user's personal list of liked movies.

>An additional feature we designed was to have a section to show the top movies based on highest number of likes. This was a challenge and came with an issue of promises and speed. It required us to learn about async / await functions. Which allowed us to solve our problem.

##Other

- Bootstrap was use partially in the styling
- The project specific styling makes use of CSS Variables and Flexbox
- The hiding and displaying of several element is done with NG-IF

##Unsolved Problems / Challenges
>We wanted a heart to be filled in when the movie is liked and to be emptied/blacked-out when unliked, we got the functionality to work a little bit, but not the way we visioned.


<img src="public/localimg/consolelog.gif?raw=true" width="400px">
We frequently needed our Friend Console.Log

<img src="public/localimg/logstart.gif?raw=true" width="400px">
Console.Log on startup during testing

<img src="public/localimg/working.gif?raw=true" width="400px">
Make a simple heart we said...
