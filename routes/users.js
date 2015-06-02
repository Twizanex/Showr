var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var dbfunctions = require('../databasefunctions');

router.get('/:name', dbfunctions.restricted, function(req, res) {
    console.log(req.param("name"));
    if(req.param("name") != req.session.user.username) {
        User.findOne({username: req.param("name")},
		     function (err, user) {
			 if (err) {
			     return console.log(err);
			 } else if (!user) {
			     res.send("There is no such user");
			 } else {
			     res.render('profile',
					{
					    username: user.username,
					    user_id: req.session.user_id,
					    postingas: req.session.user.username,
					    showfriends: false,
					    photo_album: user.photo_album,
					    friends: false,
					    show_messages: (user.friends.indexOf(req.session.user.username) > -1)
					});
			 }
		     });
	
    } else {
        res.redirect('/profile');
    }
});

router.get('/:name/photos', dbfunctions.restricted, function(req,res) {
    User.findOne({username: req.param("name")}, function(err, user) {
        res.render('photos',
            {
                user_id: req.session.user_id,
                photo_album: user.photo_album
            });
    });
});
module.exports = router;
