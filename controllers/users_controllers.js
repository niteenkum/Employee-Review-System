const User = require('../models/users');
module.exports.review = function(req,res){
    return res.end('<h1>Review</h1>');
}

module.exports.signIn = function(req, res){
    return res.render('sign_in');
}

module.exports.signUp = function(req,res){
    return res.render('sign_up');
}

module.exports.create = function(req, res){
    console.log("req.body", req.body);
    if(req?.body?.password !== req.body.confirm_password){
    console.log("password and confirm password didn't matched");
        return res.redirect('back');
    }

    User.findOne({email: req?.body?.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })


}

module.exports.createSession = function(req, res){
    console.log("req.body", req.body);
    return res.redirect('/');
}