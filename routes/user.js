var mongoose = require('mongoose'), UserModel = require('../models/user.js'),User = mongoose.model('User')
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.userlist = function(db){
	return function(req, res){
		try{
			// Fix for OverwriteModelError - reset the saved models and their modelSchemas
			// $mongoose.models = {};
			// $mongoose.modelSchemas = {};
			// var Schema = $mongoose.Schema;
			// var collection = db.model('User', new Schema({name: String, work: String, age: Number, residence: String}), 'lt');
			// var user = new User();
			User.find(function(error, results){
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
		var age = parseInt(req.body.age, 10);
		var residence = req.body.residence
		if(residence.indexOf(",")!=-1)
		{
			residence = residence.split(",");
		}
		// $mongoose.models = {};
		// $mongoose.modelSchemas = {};
		// var Schema = $mongoose.Schema;
		// var User = db.model('User', new Schema({name: String, work: String, age: Number, residence: String}), 'lt');
		//Submit values to db
		var collection =new User({
			"name": userName,
			"work": work,
			"age" : age,
			"residence" : residence
		});
		collection.save( function(err){
			if(err){
				res.send("There was a problem in saving the contents");
			}else{
				res.location("/");
				res.redirect("/");
			}
		});
	}
}
exports.removeuser = function(db){
	return function(req, res){
	// 	$mongoose.models = {};
	// 	$mongoose.modelSchemas = {};
	// 	var Schema = $mongoose.Schema;
	// 	var User = db.model('User', new Schema({name: String, work: String, age: Number, residence: String}), 'lt');

		User.findOne({_id:req.params.id}, function(err, result){
			if(err){
				throw err;
			}
			if(result){
				User.remove({_id:req.params.id}, function(err, result){
					if(err){
						throw err;
					}
					res.render('about', {title:'Removed user', message: "Removed user with ID:"+req.params.id})
				});
			}
		});
	}
}

exports.changeuser = function(req, res){
	var id = req.params.id;
	res.render('edituser', {title: 'Update user', id: id, name:'username', work: 'work', age: 'age', residence:'residence'})
}
exports.updateuser = function(db){
	return function(req, res){
		return null;
	}
}