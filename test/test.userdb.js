// var should = require("should");
var assert = require("assert")
var mongoose = require("mongoose");
var User = require("../models/user");

describe('User', function(){
	before(function(done){
		db = mongoose.connect("mongodb://localhost/lt");
		done();
	});

	after(function(done){
		mongoose.connection.close();
		done();
	});

	it('should have empty values for a new user', function(){
		var u = new User();
		assert.equal('', u.name);
		assert.equal(0, u.age);
		assert.equal('', u.work);
		assert.equal(null, u.residence);
	});

	it('should be able to pick up an existing user from the database', function(){
		var new_user =new User({
			"name": 'new user',
			"work": 'occupation',
			"age" : 30,
			"residence" : ["India", "Canada"]
		});
		assert.equal('new user', new_user.name);
		new_user.save();
		User.findOne({name:'new user'}, function(err, res){
			assert.equal('new user', res.name);
			assert.equal(30, res.age);
			assert.equal('occupation', res.work);
			assert.equal(2, res.residence.length());
			assert.equal('India', res.residence[0]);
			assert.equal('Canada', res.residence[1]);
		});
		User.remove({name: new_user.name});
	});
	it('should be able to reflect any changes made in the database', function(){
		var present_rows = null;
		User.find(function(error, results){
			present_rows = results;
		});
		var test_user = new User({
			'name':'test user',
			'age': 20
		});
		test_user.save();
		User.find(function(error, results){
			assert.equal(present_rows.length()+1, results.length());
		});
		User.remove({name: test_user.name, age:test_user.age});
		User.find(function(error, results){
			assert.equal(present_rows.length(), results.length());
		});
	});
});