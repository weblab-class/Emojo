// import node modules
const mongoose = require('mongoose');

// Define the schema
const StoryModelSchema = new mongoose.Schema ({
	userid 			: String,
	username		: String,
	content 		: String,
	timestamp 		: String,
	tags			: Array,
});

// compile model from schema
module.exports = mongoose.model('StoryModel', StoryModelSchema);