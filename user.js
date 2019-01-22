// import node modules
const mongoose = require('mongoose');

// Define the schema
const UserModelSchema = new mongoose.Scheme ({
	name 		: String,
	googleid 	: String,
	posts 		: Array,
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);