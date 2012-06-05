
var ES = require('./email-settings');
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({

   	host 	    : ES.host,
   	user 	    : ES.user,
   	password    : ES.password,
    ssl		    : true

});

EM.send = function(credentials, callback)
{
	EM.server.send({
	   from         : ES.sender,
	   to           : credentials.email,
	   subject      : 'Password Reset',
	   text         : 'something went wrong... :(',
       attachment   : EM.drawEmail(credentials)
	}, callback );
}

EM.drawEmail = function(o)
{
	var link = 'http://176.34.120.236:8889/reset-password?u='+o.pass;
	var html = "<html><body>";
		html += "Hi "+o.name+",<br><br>";
		html += "Your username is :: <b>"+o.user+"</b><br><br>";
		html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>";
		html += "Cheers,<br>";
		html += "<a href='http://twitter.com/elektrifi'>@elektrifi</a><br><br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}