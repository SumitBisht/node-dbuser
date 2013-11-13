var mongoose = require('mongoose')
, schema = mongoose.Schema

var UserSchema = new schema({
	name: { type: String, default: '' },
	work: { type: String, default: '' },
	age: { type: Number, default: 0 },
	residence: {}
});

module.exports = mongoose.model('User', UserSchema, 'lt');