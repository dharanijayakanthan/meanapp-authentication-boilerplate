var User = require('./models/user');
module.exports = function(app){

app.get('/api/user', function(req,res){
})

app.get('*',function(req,res){
   res.sendfile('./public/index.html');
})
}
