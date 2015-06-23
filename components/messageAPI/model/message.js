var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = mongoose.Schema({
	createdOn: Number,
	name: {
		displayValue: { type: String, default: '' },
		lowerCaseValue: { type: String, default: '' }
	},
    email     : { type: String, default :''},
    title     : { type: String, default :''},
    text      : { type: String, default :''}
   
  });

exports.message = mongoose.model('message', messageSchema);


