/**
 * Created by ellie on 2014-10-15.
 */
var port = 3000;
var endpoint = "http://localhost:"+port;

var app = require('../lib-coverage/bin/www');
var superrequest = require('supertest');
var request = superrequest.agent(endpoint);
var should = require('should');
var assert = require('assert');

describe('for logged in user', function() {

    describe('GET /profile', function() {
	it('should login', loginUser());
        it('should return 200 when logged in', function (done) {
            request
		.get('/profile')
		.set('Cookie', 'connect.sid=s%3AJjSPY2pQd6Q7bPSIiq9ntFGHaRYtJuwF.fb7bLc1wglzrfExS1v0xU6fzlPDeGBdqDjlb2aHQ37w')
		.end(function(err, res) {
		        if (err) {
			        return done(err);
		        } else {
                    res.statusCode.should.equal(200);
                    done();
                }
		    });
        });
    });

    describe('POST /postmessage', function() {
        it('should login', loginUser());
        it('should post a message on the users wall', function(done) {
            request
            .post('/postmessage')
            .send({name:"testingaccount", text:"testmochatest"})
            .end(function(err, res) {
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('POST /usersearch', function() {
        it('should login', loginUser());
        it('should search for a user, and be redirected to that user', function(done) {
            request
                .post('/usersearch')
                .send({user:"elias"})
                .end(function(err, res) {
                    res.statusCode.should.equal(200);
                    res.text.should.equal(JSON.stringify({success:true}));
                });
                done();
        });
    });

    describe('POST /addfriend', function() {
        it('should login', loginUser());
        it('should add a user', function(done) {
            request
                .post('/addfriend')
                .send({name:"elias"})
                .end(function(err, res) {
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('POST /checkfriendstatus', function() {
        it('should login', loginUser());
        it('should check friend status with friend', function(done) {
            request
                .post('/checkfriendstatus')
                .send({name:"elias"})
                .end(function(err, res) {
                    res.text.should.equal(JSON.stringify({name:'elias', status:true}));
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('POST /removefriend', function() {
        it('should login', loginUser());
        it('should remove a user', function(done) {
            request
                .post('/removefriend')
                .send({name:"elias"})
                .end(function(err, res) {
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('POST /checkfriendstatus', function() {
        it('should login', loginUser());
        it('should check friend status with friend', function(done) {
            request
                .post('/checkfriendstatus')
                .send({name:"elias"})
                .end(function(err, res) {
                    res.text.should.equal(JSON.stringify({name:'elias', status:false}));
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('POST /getall', function() {
        it('should login', loginUser());
        it('should get all messages for user', function(done) {
            request
                .post('/getall')
                .send({name:"testingaccount"})
                .end(function(err, res) {
                    res.text.length.should.greaterThan(1);
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('GET /getfriends', function() {
        it('should login', loginUser());
        it('should return 200 and list users friends', function(done) {
            request.get('/getfriends')
                .end(function(err, res) {
                    res.text.length.should.above(0);
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('GET /getusername', function() {
        it('should login', loginUser());
        it('should return 200 and get user', function(done) {
            request.get('/getusername')
                .end(function(err, res) {
                    res.text.should.equal(JSON.stringify({username:'testingaccount'}));
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('GET /photos', function() {
        it('should login', loginUser());
        it('should return 200 and show viewer list of images', function(done) {
            request.get('/profile/photos')
                .expect(200)
                .end(function(err, res) {
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });


    describe('GET /users/elias', function() {
        it('should login', loginUser());
        it('should return 200 when going to another user', function(done) {
            request.get('/users/elias')
                .end(function(err, res) {
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    describe('GET /users/unknownuser', function() {
        it('should login', loginUser());
        it('should return 200 when going to another user', function(done) {
            request.get('/users/unknownuser')
                .end(function(err, res) {
		    res.text.should.equal('There is no such user');
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });

    /*describe('POST /signout', function() {
        it('should login', loginUser());
        it('should sign user out', function(done) {
            request
                .post('/signout')
                .end(function(err, res) {
                    res.statusCode.should.equal(200);
                });
            done();
        });
    });*/

});

function loginUser() {
    return function(done) {
	request
	    .post('/signin')
	    .send({username: 'testingaccount', password: 'test'})
	    .expect(302)
	    .end(onResponse);
	
	function onResponse(err, res) {
	    if (err) return done(err);
	    return done();
	    }
    }
}
