// ========================
// DEPENDENCIES
// ========================
const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
require('dotenv').config();

// controllers =============
const moviesControl = require('./controllers/moviesController.js');
const usersControl = require('./controllers/usersController.js');
const sessionControl = require('./controllers/sessionController.js');


// ========================
// GLOBAL CONFIG
// ========================
const app = express();
const db = mongoose.connection;
const host = process.env.CLUSTER
const port = process.env.PORT || 5000
const dbupdateobject = { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false , useCreateIndex: true};
const mongoURI = host;

// ========================
// MIDDLEWARE
// ========================

app.use(session({
    secret: "iamlikeabird", //some random string
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());


//Static Files ==============
app.use(express.static('public'));

//Controllers ==============

app.use('/moviesapi', moviesControl);
app.use('/users', usersControl);
app.use('/sessions', sessionControl);



// // ========================
// // TEST ROUTE
// // ========================
// app.get('/', (req, res) => {
//   res.send('hello world')
// })


// ========================
// CONNECTION
// ========================

//DATABASE ==============

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




//LISTENER ==============
app.listen(port, () => console.log(`listening on ${port}!`))
