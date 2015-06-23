var path = require('path');
var Message = require('./model/message').message;
var async = require('async');
var _ = require('lodash');
module.exports = function(app) {

  app.use(require('express')['static'](path.join(__dirname, 'public')));


 app.get('/message', function(req, res) {
  	return res.render(path.join(__dirname, 'sendMessage'), {
      data: "Hello user"
    });
});

 app.get('/messageList', function(req, res) {

  	Message.find({},function(err,results){
  		 if (err) req.flash(err);
  		 console.log(results)

  var returnObj = _.map(results, function(result){

		return {
			name: result.name.displayValue,
			email :result.email,
			title : result.title,
			createdOn :(new Date(result.createdOn)).toDateString(),
			text: result.text
		}
	});
	return res.render(path.join(__dirname, 'message'), {
      data: returnObj
    });
});
});


//post message to db
  app.post('/postMessage', function(req, res) {
    
    async.waterfall([
            createNewMessageObj,
            saveNewMessage],
            returnResults);

function createNewMessageObj(callback){
	var messageObj =  {
	    createdOn: Date.now(),
		name: {
			displayValue: req.body.name,
			lowerCaseValue:req.body.name.toLowerCase().trim()
		},
	    email     : req.body.email,
	    title     :  req.body.title,
	    text      :  req.body.text
    }
     callback(null, messageObj);
}

function saveNewMessage(messageObj,callback){
    var newMessage= new Message(messageObj);
    newMessage.save(function(err, result){
     if (err) req.flash(err);
      return callback(null, result);
    });
}

 function returnResults(err, returnObj){
            if(err){
	             req.flash(err);
            }else{
	          	req.flash('Message Successfully sent');
	             return res.redirect('/messageList');
            }
        }
});
};