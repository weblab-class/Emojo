// import node modules
const mongoose = require('mongoose');

// Define the schema
const EmojiModelSchema = new mongoose.Schema ({
    name 		: String,
    aliases     : Array,
    character   : String,
    codePoints  : Array,
    keywords    : Array,
    shortCode   : String,
    tags        : Array,
}, {collection: 'emoji'});

// compile model from schema
module.exports = mongoose.model('EmojiModel', EmojiModelSchema);