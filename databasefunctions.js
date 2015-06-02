/**
 * Created by eli on 2014-10-07.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

function restricted(req,res, next) {
    if (req.session.user_id) {
        next();
    } else {
        res.writeHead(403);
        res.write("You must be logged in to view this page");
        res.end();
    }
}

function registerUser(req, res) {
    User.findOne({username: req.body.username}, function(err, user){
        if(user){
            res.render('signup-in', {
                actionpath:"/signup",
                headingtext:"Fill in wanted username and password to sign up",
                buttontext:"Sign up, its free",
                user_id: req.session.user_id,
                msg: "That username is already in use"
            });
        }else {
            new User({
                username: req.body.username,
                password: req.body.password,
                friends: [],
                wall_posts: [],
                photo_album: []
            }).save(function (err, user) {
                    if (!err) {
                        req.session.user = user;
                        req.session.user_id = true;
                        res.redirect("/profile");
                    }
                })
        }
    })
}


function queryUser(req, res){
    var query = User.where({username: req.body.username});
    query.findOne(function(err, user){
        if(err) throw(err);
        if(user){
            req.session.user = user;
            req.session.user_id = true;
            res.redirect("/profile");
        }else{
            res.render('signup-in', {actionpath:"/signin", msg: "no user with that username and password",
                headingtext:"Input username and password to sign in", buttontext:"Sign in"})
        }
    })
}

exports.registerUser = registerUser;
exports.queryUser = queryUser;
exports.restricted = restricted;
