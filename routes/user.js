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
				res.location("/userlist");
				res.redirect("/userlist");
			}
		});
	}
}
exports.removeuser = function(db){
	return function(req, res){
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
	User.findById(id, function(err, obj){
		res.render('edituser', {title: 'Update user', param: id, user: obj});
	});
	
}

exports.updateuser = function(db){
	return function(req, res){
		var user_res = req.body.residence;
		if(user_res.indexOf(",")!=-1)
		{
			user_res = user_res.split(",");
		}
		var user_age = parseInt(req.body.age, 10);

		User.findByIdAndUpdate(req.body.id, {residence:user_res, age: user_age, work:req.body.work, name:req.body.username}, function(error, update){
			if(error){
				res.render('about', { title: 'Error in updating', message: 'Unable to fetch users due to: '+error+' with response as: '+req.body });
			}
			res.redirect("/userlist");
		});
	}
}
