var mongoose = require('mongoose');
var User = mongoose.model('User');
var express = require('express');
var formidable = require('formidable');
var fs = require('fs-extra');
var qt = require('quickthumb');
var util = require('util');
var router = express.Router();
var dbfunctions = require("../databasefunctions");

router.get('/', function(req, res) {
    if (req.session.user_id) {
	res.redirect('/profile');
    }
    res.render('index', {user_id: req.session.user_id});
});

router.get('/contact', function(req, res) {
    res.render('contact', {user_id: req.session.user_id});
});

router.get('/signup', function(req, res) {
    res.render('signup-in', {
	actionpath:"/signup",
	headingtext:"Fill in wanted username and password to sign up",
	buttontext:"Sign up, its free",
	user_id: req.session.user_id,
    msg: ""
    });
});

router.post('/signup',function(req, res) {
    dbfunctions.registerUser(req, res);
});

router.get('/signin', function(req, res) {
    res.render('signup-in', {actionpath:"/signin", msg: "", headingtext:"Input username and password to sign in", buttontext:"Sign in"})
});

router.post('/signin', function(req,res) {
    dbfunctions.queryUser(req, res);
});

router.get('/signout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
});

router.post('/upload', dbfunctions.restricted, function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(JSON.stringify({success: false}));
        } else {
            res.send(JSON.stringify({success: true}));
        }
    });
    
    form.on('end', function(fields, files) {
        /*temp location for img */
        var temp_path = this.openedFiles[0].path;
        /* file name */
        var file_name = this.openedFiles[0].name;
        /* location were we copy upload file */
        var new_location = 'uploads/';
	
        fs.copy(temp_path, new_location + file_name, function(err) {
            if(err) {
                throw err;
            } else {
                addPhoto(req, file_name);
            }
        });
    });
});

router.get('/profile', dbfunctions.restricted, function(req, res){
    User.findOne({username: req.session.user.username},
		 function(err, user){
		     res.render('profile',
				{
				    username: req.session.user.username,
				    user_id: req.session.user_id,
				    postingas: req.session.user.username,
				    showfriends: true,
                    photo_album: user.photo_album,
				    friends: user.friends,
                    show_messages: true
				});
		 });
});

router.get('/profile/photos', dbfunctions.restricted, function(req,res) {
    User.findOne({username: req.session.user.username}, function(err, user) {
        res.render('photos',
            {
                user_id: req.session.user_id,
                photo_album: user.photo_album
            });
    });
});

router.post('/usersearch', dbfunctions.restricted, function(req, res){
    User.findOne({username:req.body.user},
		 function(err, user) {
		     if (err) {
			 return err;
		     } else if (user) {
                res.send(JSON.stringify({success: true}));
		     }
		     else {
                res.send(JSON.stringify({success: false}));
		     }
		 });
});

router.post('/checkfriendstatus', dbfunctions.restricted, function(req, res){
    // As long as we are not requesting our own profile, lets check the user for friend status
    if (req.body.name && req.body.name != req.session.user.username) {
        User.findOne({username: req.session.user.username},
		     function (err, user) {
			 if (err) {
			     throw err;
			 }
			 else {
			     if (user.friends.indexOf(req.body.name) > -1) {
                     var result = {name:req.body.name, status:true};
                     res.send(JSON.stringify(result));
			     } else {
                     var result = {name:req.body.name, status:false};
                     res.send(JSON.stringify(result));
			     }
             }
             });
    }
});

function addPhoto(req, file_name) {
    User.findOneAndUpdate(
        {
            username: req.session.user.username,
            password: req.session.user.password},
        {"$push": {photo_album: file_name}},
        function (err, user) {
            if (err) {
                console.log("Error adding a photo to the user");
            } else {
                console.log("Added picture: " + file_name + " to the user");
            }
    });
}

router.post('/addfriend', dbfunctions.restricted, function(req, res) {
    var name = req.body.name;
    console.log(req.session.user.username + " adding " + name);
    User.findOneAndUpdate(
        {
            username: req.session.user.username,
            password: req.session.user.password},
        {"$push": { friends: name}},
        function (err, user) {
            if (err) {
		console.log("error adding friend to your friends list");
            }
	});
});

router.post('/removefriend', dbfunctions.restricted, function(req, res) {
    var name = req.body.name;
    console.log(req.session.user.username + " removing" + name);
    User.findOneAndUpdate(
        {
	        username: req.session.user.username,
            password: req.session.user.password
	},
        {"$pull": { friends: name}},
        function (err, user) {
            if (err) {
                console.log("error removing friend to your friends list");
            } else{
                console.log( user.username + "removed" + name + "as friend");
            }
        });
    User.findOneAndUpdate(
        {
        username: name
        },
        {"$pull": {friends: req.session.user.username}},
        function (err, user) {
            if (err) {
                console.log("error removing self from friends list");
            } else {
                console.log("Session user removed " + user.username + "from friends list as well");
            }
        });
});

router.post('/postmessage', dbfunctions.restricted, function(req, res){
    var name = req.body.name;
    var text = req.body.text;
    User.findOneAndUpdate(
        {
            username: name
	    },
        {"$push": { wall_posts: {from: req.session.user.username, text: text}}},
        function (err, result){
            if (err) {
                console.log("error writing to wall");
            }
        });
});

router.post('/getall', dbfunctions.restricted, function(req, res){
    var name = req.body.name;
    User.findOne({username: name}, function(err, user){
	if(err){
            console.log("error getting messages");
	}else if(!user){
            console.log("The error name:" + name);
            console.log("user error");
        }else{
            console.log("getting all from user " + user.username);
            res.send(JSON.stringify(user.wall_posts));
	}
    });
});

router.get('/getfriends', dbfunctions.restricted, function(req,res) {
    User.findOne({username: req.session.user.username}, function(err, user) {
        if(err) throw err;
        res.send(JSON.stringify(user.friends));
    });
});

router.get('/getusername', function(req, res){
    console.log("getting username: "+req.session.user.username);
    User.findOne({username:req.session.user.username}, function(err, user){
        if(err) throw err;
        if(user) res.send(JSON.stringify({username:user.username}));
    })
});

module.exports = router;
