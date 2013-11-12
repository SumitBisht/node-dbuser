
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.userlist = function(db){
	return function(req, res){
		try{
			var mongoose = require('mongoose');
			// Fix for OverwriteModelError - reset the saved models and their schemas
			mongoose.models = {};
			mongoose.modelSchemas = {};

			var Schema = mongoose.Schema;
			var collection = db.model('User', new Schema({name: String, work: String, age: Number, residence: String}), 'lt');
			collection.find(function(error, results){
				res.render('uselist', {title: 'Got the results', userlist: results})
			});
		}catch (err){
			res.render('about', { title: 'UserList', message: 'Unable to fetch users due to: '+err });
		}
	};
};

exports.newuser = function(req, res){
	res.render('newuser', {title: 'Add New User'})
}
exports.adduser = function(db){
	return function(req, res){
		var userName = req.body.username;
		var work = req.body.work;
		var age = req.body.age;
		var residence = req.body.residence;

		var collection = db.get('lt');
		//Submit values to db
		collection.insert({
			"name": userName,
			"work": work,
			"age" : age,
			"residence" : residence
		},  function(err, doc){
			if(err){
				res.send("There was a problem in saving the contents");
			}else{
				res.location("/");
				res.redirect("/");
			}
		});
	}
}