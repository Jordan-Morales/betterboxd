/////////////////////////////////
//To include in HTML
//<div ng-include="'includes/login.html'"></div>
/////////////////////////////////

/////////////////////////////////
//Add the below variables and functions
//to app.js in the controller
/////////////////////////////////

controller = this;
this.loggedInUsername = null;
this.loggedInName = null;

//////////////////
//Authentication Functions
//This function gets the username of the user currently in session, then fetches data
//takes the get function as a parameter
/////////////////

this.displayApp = (getData) => {
    $http({
        method:'GET',
        url: '/sessions/'
    }).then(function(response){
        controller.loggedInUsername = response.data.username;
        controller.loggedInName = response.data.name;
        getData(response.data.username);
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
        console.log(response);
        controller.createname = 'thanks, now login';
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
    console.log(response);
    controller.username = null;
    controller.password = null;
    controller.displayApp(getData);
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
    console.log(response);
    clearFunction();
}, function(error){
    console.log(error);
});
}

//////////////////////
//Clear Data Function
//Clear any data upon logout or when needed
//////////////////////

this.clearData = () => {
    this.loggedInUsername = null;
    this.loggedInName = null;
}
