/**
 * Created by eli on 10/7/14.
 */
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var S_User = new Schema({
    username: String,
    password: String,
    friends: [String],
    wall_posts: [
        {
            from: String,
            text: String
        }
    ],
    photo_album: [String]
});

mongoose.model('User', S_User, "users");
mongoose.connect('mongodb://localhost/showr');
