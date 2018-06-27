const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
	imageName : { type: String, require: true },
	location  : { type: String, require: true },
	dateAdded : { type: Date, default: Date.now }
});


module.exports = mongoose.model('Image', imageSchema);