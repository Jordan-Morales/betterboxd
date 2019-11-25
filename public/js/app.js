// ========================
// DEPENDENCIES
// ========================
// Angular Module
const app = angular.module('betterboxdApp', []);

// ========================
// CONTROLLERS
// ========================
// Main Controller
app.controller('MainController', ['$http', function($http){

  // ======= GLOBAL CONFIG(aka some variables)
  // validates for showing the movie details on click, it's changed to true when the movie title is clicked after being searched
  this.showMovieInfo = false

  //validates for showing the movie list after clicking to search by name
  this.showMovieList = false

  // for prior ES6 functions to be able to use this.
  controller = this;

  // setting for session validation
  this.loggedInUser = null;

  //setting the index for editing the form to null so the form is hidden
  this.indexOfEditForm = null;

  //for profile button
  this.profileOn = false

  //for the topmovies selection
  this.topMovies = []

  //for topmovies button
  this.openTopMovies = true;

  this.topMovieDetails=[];

  //to toggle the form for signup
  this.signupSection = false

  //to toggle the form for login
  this.loginToggle = false

  //to toggle the movie search form from the page
  this.showSearch = false

  //to toggle the movie search form from the page
  this.showNav = false

  //to toggle the new comment form in the page
  this.commentForm = false

  // for checking getLikes
  this.checkArray=[]

  // Hold updatedUser
  this.updatedUser={}

  // ======= API CALLS ====================

  // --- Users+Session Datapoint
  //////////////////
  //Authentication Functions
  //This function gets the username of the user currently in session, then fetches data
  //takes the get function as a parameter
  /////////////////

  this.displayApp = () => {
    $http({
      method:'GET',
      url: '/sessions/'
    }).then(function(response){
      controller.loggedInUser = response.data
      controller.topFive();
      controller.openTopMovies = true
      controller.profileOn = true
      controller.showMovieList = false
      controller.regrabUser(controller.loggedInUser._id)
    }, function(){
      console.log('error');
    });
  }
  ////////////////////////////
  // Uses loggedInUser to grab the user's and manipulate directly
  ////////////////////////////

  this.regrabUser = (id) => {
    $http({
      method:'GET',
      url: '/users/'+ id
    }).then(function(response){
      controller.loggedInUser = response.data
      controller.updatedUser = response.data
    }, function(){
      console.log('error');
    });
  }

  ////////////////////////////
  // Create User Function
  // Take information from form, create user, and clear form and leave success or fail message
  ////////////////////////////

  this.createUser = () => {
    $http({
      method:'POST',
      url:'/users',
      data: {
        name: this.createname,
        username: this.createusername,
        password: this.createpassword
      }
    }).then(function(response){
      // console.log(response);
      controller.createusername = null;
      controller.createpassword = null;

    }, function(error){
      console.log(error);
      controller.createname = 'fail';
      controller.createusername = null;
      controller.createpassword = null;
    })
  }

  //////////////////////
  // LOGIN FUNCTION
  // Takes the Get Function as a Parameter to make sure to populate data on logIn
  // It passes the get function to displayapp so it can populate after establishing session
  //////////////////////

  this.logIn = (getData) => {
    $http({
      method:'POST',
      url:'/sessions/',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      controller.username = null;
      controller.password = null;
      this.loginToggle = false
      controller.showNav = false
      controller.displayApp();

    }, function(error){
      console.log(error);
      controller.username = 'fail';
      controller.password = null;
    })
  }

  /////////////////////
  // LOGOUT FUNCTION
  // Takes a function to clear all data as a parameter, so data from previous user doesnt linger
  /////////////////////
  this.logOut = (clearFunction) => {
    $http({
      method:'DELETE',
      url:'/sessions/'
    }).then(function(response){
      clearFunction();
    }, function(error){
      console.log(error);
    });
    this.homePage()
  }

  //////////////////////
  // Clear Data Function
  // Clear any data upon logout or when needed
  //////////////////////

  this.clearData = () => {
    this.loginToggle = false
    this.signupSection = false
    this.loggedInUser = null;
    this.showMovieInfo = false
    this.showMovieList = false

  }

  /////////////////
  // --- OMDB API
  // search for movies -- this.movieTitle is coming from the form ng-model in the searchbox
  /////////////////

  this.getMovies = () => {
    $http({
      method:'GET',
      url: 'https://www.omdbapi.com/?apikey=53aa2cd6&s='+this.movieTitle
    }).then( response =>{
      this.movieList = response.data.Search
      this.showMovieInfo = false
      this.openTopMovies = false
      this.profileOn = false

      // console.log(this.movieList);
    }, error => {
      console.log(error);
    })

    //erasing the input field
    this.movieTitle = ''
  }
  /////////////////
  // display specific movie and comments associated --
  // getInfo function calls OMDB API for the movie details.
  /////////////////

  this.getInfo = (movieId) => {
    //turning into false to hide the movie list after clicking
    this.showMovieList = false
    $http({
      method:'GET',
      url: 'https://www.omdbapi.com/?apikey=53aa2cd6&i='+movieId
    }).then( response =>{
      this.movieInfo = response.data;
      this.getComment(movieId);
    }, error => {
      console.log(error);
    })
    this.showNav = true;
    this.showMovieInfo = true;
    this.commentForm = false
  }
  /////////////////
  // function to make sure the first time a
  // movie is viewed it's dropped into our database
  /////////////////

  this.firstView = (movieId) => {
    $http({
      method:'POST',
      url:'/moviesapi',
      data: {
        omdbID: movieId
      }
    }).then( response => {
    }, error => {
      console.log(error);
    })
  }
  /////////////////
  // function to pull comments from movie
  /////////////////

  this.getComment = (movieId) => {
    $http({
      method:'GET',
      url:'/moviesapi/'+movieId
    }).then( response => {
      this.movieLikes = response.data[0].likes || 0
      this.movieComments = response.data[0].comment
      this.getLikes(this.updatedUser, movieId)
    })
  }
  /////////////////
  // function to create a new comment
  /////////////////

  this.newComment = (movieId) => {
    this.newComments = {
      username:this.loggedInUser.username,
      date: Date.now(),
      message:this.newMessage
    }
    $http({
      method: 'PUT',
      url:'/moviesapi/' + movieId + '/newcomment',
      data: {
        comment: this.newComments
      }
    }).then((response) => {
      this.indexOfEditForm = null;
      this.newMessage = null;
      this.getComment(movieId)
    })

    this.commentForm = false
  }

  /////////////////
  // function to delete own comments
  /////////////////

  this.deleteComment = (movieId, index) => {
    this.updatedComments = this.movieComments;
    this.updatedComments.splice(index, 1);
    $http({
      method: 'PUT',
      url:'/moviesapi/'+movieId + '/deletecomment',
      data: {
        comment: this.updatedComments
      }
    }).then((response) => {
    })
  }
  /////////////////
  // function to own edit comments
  /////////////////

  this.editComment = (movieId, index) => {
    this.updatedComments = this.movieComments;
    this.editedComment = {
      username:this.loggedInUser.username,
      date: Date.now(),
      message:this.updatedMessage
    }
    this.updatedComments.splice(index, 1, this.editedComment);
    $http({
      method: 'PUT',
      url:'/moviesapi/'+movieId + '/editcomment',
      data: {
        comment: this.updatedComments
      }
    }).then((response) => {
      this.indexOfEditForm = null;
      this.updatedMessage = null;
      // this.getComment(movieId);
    })
  }

  /////////////////
  // function to toggle display of filled heart
  /////////////////

  this.getLikes = (user, movieId) => {
    if (user.moviesLiked === undefined) {
      console.log('movie undefined');
      return;
    } else {
      this.checkArray = user.moviesLiked;
      if (this.checkArray.some(movie => movie.imdbID === movieId)){
        return 'filled'
      } else {
        return 'toggle'
      }
    }
  }

  /////////////////
  // function to add likes to moviesLiked
  /////////////////

  this.addLikes = (user, movieObject) => {
    $http({
      method:'PUT',
      url:'/users/'+ user._id + '/' + movieObject.imdbID,
      data: {
        movie: movieObject
      }
    }).then( response => {
      this.getInfo(movieObject.imdbID)
    })
  }
  /////////////////
  // function to toggle display of profile
  /////////////////

  this.showProfile = () => {
    controller.profileOn = !controller.profileOn;
  }
  /////////////////
  //function to build array of top movies
  ///////////////

  this.topFive = () => {
    $http({
      method:'GET',
      url: '/moviesapi/'
    }).then( response =>{
      let movieList = response.data;
      this.topMovies = [];
      while (this.topMovies.length < 5){
        let topLikes = 0;
        let topMovie = {};
        let topMovieIndex;
        for (movie in movieList){
          let currentLikes = movieList[movie].likes;
          if (currentLikes > topLikes){
            topLikes = currentLikes;
            topMovie = movieList[movie];
            topMovieIndex = movie;
          }
        }
        this.topMovies.push(topMovie);
        movieList[topMovieIndex].likes=0;
      }
      this.getTopMovieInfo();
    }, error => {
      console.log(error);
    })
    this.movieTitle = ''
  }


  ///////////////////
  //Function to reset the booleans when clicking "home"
  ///////////////////
  this.homePage = () => {
    this.openTopMovies = true
    this.profileOn = true
    this.showNav = false
    this.showMovieList = false
    this.signupSection = false
    this.showSearch = false
    this.showMovieInfo = false
  }


  ///////////////////
  //Function to toggle display the hot movies
  ///////////////////
  this.showTopMovies = () => {
    this.openTopMovies = !this.openTopMovies;
  }

  ///////////////////
  //Function to toggle display for sign up
  ///////////////////
  this.showSignUp = () => {
    this.signupSection = !this.signupSection;
    this.showMovieList = !this.showMovieList
    this.openTopMovies = false
  }

  ////////////////////////
  //function to get details of top movies from omdb
  /////////////////////////

  this.getTopMovieInfo = async (movieId) => {
    //turning into false to hide the movie list after clicking
    for (i=0;i<this.topMovies.length;i++){
      response = await $http({
        method:'GET',
        url: 'https://www.omdbapi.com/?apikey=53aa2cd6&i='+this.topMovies[i].omdbID });
        this.topMovieDetails[i] =  await response.data;
    }
  }

  /////////////////
  //Function to toggle movies on mobile
  /////////////////
  this.showMenu = () => {

    topMenu = document.getElementById('menu');
    if (menu.style.display == 'none'){
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  }
}])
