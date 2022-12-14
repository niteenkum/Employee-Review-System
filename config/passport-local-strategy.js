require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done){
    // Find the user and establish the identity

    User.findOne({email: email}, function(err, user){
       if(err){
        console.log("Error in finding user --> Passport");
        return done(err);
       } 
       if(!user || user.password !== password){
        console.log("Invalid username or password");
        return done(null, false);
       }
       return done(null, user);

    });

}))

// Serializing the user to decide which key is to be kept in the cookie

passport.serializeUser(function(user, done){
    done(null, user.id);
})


// Deserializing the user from the key in the cookie

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding user --> Passport");
            return done(err);
        }
        return done(null, user);
    })
})

// Check if the user is authenticated

passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, pass the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;