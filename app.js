// import modules
const path = require('path');
const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const Gallery = require('./models/mygallery.js');

// Hide creds from repo
const mongoDB = process.env.MONGODB_URL;

// Set up default mongoose connection
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set a callback to let us know we've successfully connected
db.once('open', function() {
  console.log('Connected to DB...');
});

// create express app
const app = express();
// EJS still needs to be installed via NPM
app.set('view engine', 'ejs');

// cors origin URL - Allow inbound traffic from origin
// corsOptions = {
//  origin: "https://dashboard.heroku.com",
//  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//    };
//  app.use(cors(corsOptions));

// create set up for moment module for footer
// const yearFormat="YYYY"
app.locals.moment = moment;
// app.locals.yearFormat = yearFormat;

// var dt = new Date();
// dt.getYear()

// automatically check if requested file is found in /public
// if yes, return that file as a response to the browser
app.use(express.static(path.join(__dirname, 'public')));

// Display an image gallery when someone visits the home page
app.get('/', function(request, response){
  response.render('index',{});
});

// Setup many repetitive GET endpoints for each animal. Obviously there has to be a better way!
app.get('/register', function(request, response){
  response.render('register',{title:''});
});
app.get('/login', function(request, response){
  response.render('login',{});
});

// Define an endpoint handler for the individual ejs pages
  app.get('/:id', function(request, response){

  // model.findOne returns the first object it finds
  // model.find will always return an array, even if it only finds one 
  Gallery.findOne({'id': request.params.id}, function(error, item) {
  //  Check for IDs that are not in our list
    if (!item) {
    response.render('error_message');
}
 // The above find() method returns the object that matches by ID
 // We now pass it into our view (the 2nd object must be an object)
  // Compile view and respond
  response.render('single',item);
 });
});


// Create a JSON (no EJS here) that returns the entire animal JSON
// This is the endpoint that the frontend gallery script calls (see: ./public/js/app.js).

app.get('/api/mygallery', function(request, response){
  Gallery.find(function(error, item) { 
    response.json(item)
    // console.log(Gallery); to check what's inside of the Gallery
});

});
// if no file or endpoint found, send a 404 error as a response to the browser
app.use(function(req, res, next) {
  res.status(404);
  res.render('error_message');
});

// start up server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
})