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

  this.checkArray=[]

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
      // console.log(response)
      controller.loggedInUser = response.data
      controller.topFive();
      controller.openTopMovies = true
      controller.profileOn = true
      controller.showMovieList = false
      // console.log(controller.loggedInUser._id);
      controller.regrabUser(controller.loggedInUser._id)
      // console.log(controller.loggedInUser)
      // console.log(controller.loggedInUser.moviesLiked)
    }, function(){
      console.log('error');
    });
  }

  this.regrabUser = (id) => {
      $http({
        method:'GET',
        url: '/users/'+ id
      }).then(function(response){
        // console.log(response.data)
        controller.loggedInUser = response.data
        controller.updatedUser = response.data
        // console.log(controller.loggedInUser);
        // console.log(controller.updatedUser);
        // console.log(this.updatedUser);
        // return this.updatedUser
        // controller.loggedInUser = response.data
        // return controller.loggedInUser
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
  //LOGIN FUNCTION
  //Takes the Get Function as a Parameter to make sure to populate data on logIn
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
      // (response);
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
  //LOGOUT FUNCTION
  //Takes a function to clear all data as a parameter, so data from previous user doesnt linger
  /////////////////////
  this.logOut = (clearFunction) => {
    $http({
      method:'DELETE',
      url:'/sessions/'
    }).then(function(response){
      // console.log(response);
      clearFunction();
    }, function(error){
      console.log(error);
    });
    this.homePage()
  }

  //////////////////////
  //Clear Data Function
  //Clear any data upon logout or when needed
  //////////////////////

  this.clearData = () => {
    this.loginToggle = false
    this.signupSection = false
    this.loggedInUser = null;
    this.showMovieInfo = false
    this.showMovieList = false

  }



  // --- OMDB API
  //search for movies -- this.movieTitle is coming from the form ng-model in the searchbox
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

  // display specific movie and comments associated -- getInfo function calls OMDB API for the movie details.
  this.getInfo = (movieId) => {
    //turning into false to hide the movie list after clicking
    this.showMovieList = false
    $http({
      method:'GET',
      url: 'https://www.omdbapi.com/?apikey=53aa2cd6&i='+movieId
    }).then( response =>{
      this.movieInfo = response.data;
      this.getComment(movieId);
      // console.log(this.movieInfo);
    }, error => {
      console.log(error);
    })
    this.showNav = true;
    this.showMovieInfo = true;
    this.commentForm = false
  }

  this.firstView = (movieId) => {
    $http({
      method:'POST',
      url:'/moviesapi',
      data: {
        omdbID: movieId
      }
    }).then( response => {
      // console.log(movieId);
    }, error => {
      console.log(error);
    })
  }

  this.getComment = (movieId) => {
    $http({
      method:'GET',
      url:'/moviesapi/'+movieId
    }).then( response => {
      // console.log(response.data[0])
      this.movieLikes = response.data[0].likes || 0
      // console.log(this.movieLikes);
      this.movieComments = response.data[0].comment
      // console.log(this.movieComments);
      this.getLikes(this.updatedUser, movieId)
    })
  }

  this.newComment = (movieId) => {
    // console.log(movieId);
    this.newComments = {
      username:this.loggedInUser.username,
      date: Date.now(),
      message:this.newMessage
    }
    // console.log(this.movieComments);
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

  this.deleteComment = (movieId, index) => {
    // console.log(movieId);
    // console.log(index);
    this.updatedComments = this.movieComments;
    this.updatedComments.splice(index, 1);
    // console.log(this.movieComments);
    $http({
      method: 'PUT',
      url:'/moviesapi/'+movieId + '/deletecomment',
      data: {
        comment: this.updatedComments
      }
    }).then((response) => {
      // this.getComment(movieId);
    })
  }

  this.editComment = (movieId, index) => {
    // console.log(movieId);
    // console.log(index);
    this.updatedComments = this.movieComments;
    this.editedComment = {
      username:this.loggedInUser.username,
      date: Date.now(),
      message:this.updatedMessage
    }
    this.updatedComments.splice(index, 1, this.editedComment);
    // console.log(this.movieComments);
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

  // like movie / unlike movies

  // add movie comment
  // this.addComment = () => {
  //   $http({
  //     method:'POST',
  //     url:'/moviesapi/'+movieId,
  //     data: {
  //       comment:
  //     }
  //   }).then((response) => {
  //     console.log(response.data);
  //   }, (error) => {
  //     $http({
  //       method:'PUT',
  //       url:'/moviesapi/'+movieId
  //     }).then((response) => {
  //       console.log(response.data);
  //     })
  //   })
  // }
  // delete movie comment

  // edit movie comment



  this.getLikes = (user, movieId) => {
    // console.log('get likes', user);
    if (user.moviesLiked === undefined) {
      console.log('movie undefined');
      return;
    } else {
    this.checkArray = user.moviesLiked;
    if (this.checkArray.some(movie => movie.imdbID === movieId)){
      // console.log('here');
      return true
    } else {
      // console.log('not here')
      return false
    }
  }
    // console.log('are we getting here?');
    // console.log(movieId);
    // console.log(user.moviesLiked);

    //   // if movieId found in === user.moviesLiked[].imdbID
    // for (var i = 0; i < checkArray.length; i++) {
    //   if (checkArray[i].filter(checkArray[i] => (checkArray[i].omdbID === "movieId"))){
    //     result = true;
    //     console.log('true');
    //   } else {
    //     result = false;
    //     console.log('false');
    //   }
    //   return result
    //   console.log(result);
  }

  // console.log(foundMovie);


  // if (movieId === foundMovie) {
  // }

  //     // then do:
  //   //else do:
  // $http({
  //   method:'GET',
  //   url:'/moviesapi/'+ user._id + '/' + movieId,
  // }).then( response => {

  //
  // })


  this.addLikes = (user, movieObject) => {
    // console.log(user);
    // this.regrabUser(user.id);
    // console.log(this.regrabUser(user.id));
    // console.log(movieObject);
    $http({
      method:'PUT',
      url:'/users/'+ user._id + '/' + movieObject.imdbID,
      data: {
        movie: movieObject
      }
    }).then( response => {
      // console.log(response);
      this.getInfo(movieObject.imdbID)
    })
  }
  /////////////////
  // function to toggle display of profile
  /////////////////

  this.showProfile = () => {

    // console.log(controller.profileOn);
    // console.log('toggle');
    controller.profileOn = !controller.profileOn;
    // console.log(controller.profileOn);
    // console.log(controller.loggedInUser.moviesLiked)

  }
  /////////////////
  //function to build array of top movies
  ///////////////

  this.topFive = () => {
    $http({
      method:'GET',
      url: '/moviesapi/'
    }).then( response =>{
      // console.log('the response is next')
      // console.log(response)
      let movieList = response.data;
      this.topMovies = [];
      while (this.topMovies.length < 5){
        // console.log('while begins');
        let topLikes = 0;
        let topMovie = {};
        let topMovieIndex;
        // console.log(movieList);
        for (movie in movieList){
          // console.log('for begins');
          // console.log(movie);
          // console.log(movieList[movie]);
          let currentLikes = movieList[movie].likes;
          if (currentLikes > topLikes){
            topLikes = currentLikes;
            // console.log('the current movie is ' + movieList[movie])
            topMovie = movieList[movie];
            topMovieIndex = movie;
          }
        }
        // console.log('the winning movie is' + topMovie.omdbID)
        this.topMovies.push(topMovie);
        movieList[topMovieIndex].likes=0;
        // console.log(this.topMovies)

      }
      // console.log(this.topMovies)
      this.getTopMovieInfo();

    }, error => {
      console.log(error);
    })

    //erasing the input field
    this.movieTitle = ''
  }


  ///////////////////
  //Function to reset the booleans when clicking "home"
  ///////////////////
  this.homePage = () => {
    // console.log('toggle');
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
    // console.log('toggle');
    this.openTopMovies = !this.openTopMovies;
  }

  ///////////////////
  //Function to toggle display for sign up
  ///////////////////
  this.showSignUp = () => {
    // console.log(this.showNav);
    // console.log(this.loggedInUser);
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
      // console.log(this.topMovies[i].omdbID);
      // console.log(i);
      response = await $http({
        method:'GET',
        url: 'https://www.omdbapi.com/?apikey=53aa2cd6&i='+this.topMovies[i].omdbID });
        this.topMovieDetails[i] =  await response.data;
        // console.log(this.topMovieDetails);
      }}

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
