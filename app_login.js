
/**
 * Node.js Node Login
 * Author :: Stephen Braitsch
 * Updated by Jonathan Forbes
 */

var exp = require('express');
var app = exp.createServer();

app.root = __dirname;
global.host = '54.247.165.223';

require('./app/core/config')(app, exp);
require('./app/router')(app);

app.listen(8889, function(){
 	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});