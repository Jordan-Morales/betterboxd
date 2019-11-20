const express = require('express')
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;
const host = process.env.CLUSTER
const dbupdateobject = { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false , useCreateIndex: true};
const moment = require('moment');
const bcrypt = require('bcryptjs');
const session = require('express-session');

/////////////////////
//MIDDLEWARE
/////////////////////
// app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: "iamlikeabird", //some random string
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());

//////////////////////
//CONTROLLERS
///////////////////
const moviesControl = require('./controllers/moviesController.js');
const usersControl = require('./controllers/usersController.js');
const sessionControl = require('./controllers/sessionController.js');
app.use('/moviesapi', bookmarkControl);
app.use('/users', usersControl);
app.use('/session', sessionControl);

/////////////////////
//DATABASE
/////////////////////

// Configuration
const mongoURI = host;

// Connect to Mongo
mongoose.connect( mongoURI, dbupdateobject );

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on( 'open' , ()=>{
  console.log('Connection made!');
});


/////////////////////////
//RUNTIME DATA
/////////////////////////




/////////////////////
//Listener
/////////////////////
app.listen(port, () => console.log(`listening on ${port}!`))


/////////////////////
//Static Files
/////////////////////
app.use(express.static('public'));
