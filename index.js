require('dotenv').config();
// const dotenv = require("dotenv");
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Add cookie parser
const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// Used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// For sass middleware
const sassMiddleware = require('node-sass-middleware');


// Using Css File for styling
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

//  Using EJS for templating
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

// Extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// Setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// Mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL, 
    })
}));

// Using passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require("./routes/index"));

// Listening to the port
app.listen(port, function(err){
    if(err){
        console.log("Error: " + err);
        return;
    }
    console.log("Server is listening on port " + port);

})