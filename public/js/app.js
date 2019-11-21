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

  // ======= API CALLS ====================

  // --- Users+Session Datapoint
  // login

  // signup

  // logout



  // --- OMDB API
  //search for movies -- this.movieTitle is coming from the form ng-model in the searchbox
  this.getMovies = () => {
    $http({
      method:'GET',
      url: 'http://www.omdbapi.com/?apikey=53aa2cd6&s='+this.movieTitle
    }).then( response =>{
      this.movieList = response.data.Search
      console.log(this.movieList);
    }, error => {
      console.log(error);
    })

    //erasing the input field
    this.movieTitle = ''
  }

  // display specific movie and comments associated
  this.getInfo = (movieId) => {
    $http({
      method:'GET',
      url: 'http://www.omdbapi.com/?apikey=53aa2cd6&i='+movieId
    }).then( response =>{
      this.movieInfo = response.data
      console.log(this.movieInfo);
    }, error => {
      console.log(error);
    })
    this.showInfo = true;

  }

  // like movie / unlike movies

  // add movie comment

  // delete movie comment

  // edit movie comment







}])
