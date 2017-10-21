var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var db = require('./config/db');


var port = 8080 || process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
require('./app/routes')(app);

app.listen(port);

console.log('look its happening happens on port ' + port);

// expose app
exports = module.exports = app;
