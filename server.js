var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var port = 8080 || process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));
require('./app/routes')(app);


//change it to your mongodb server
mongoose.connect('mongodb://127.0.0.1:27017/authapp-starterkit',function(err){
if(err){
  console.log("error connecting to db" +err);
}
else{
  console.log("successfully connected to mongo db");
}})


app.listen(port);
console.log('look its happening happens on port ' + port);

// expose app
exports = module.exports = app;
