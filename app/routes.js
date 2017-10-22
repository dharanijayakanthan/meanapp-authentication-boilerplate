var User = require('./models/user');
var jwt = require('jsonwebtoken');
var secret = 'yoursecretkey';
module.exports = function(app){

app.post('/api/user', function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
      res.json({
        "success": false,
        "message": "Dont leave any fields empty please !!.."
      });
    } else {

      user.save(function(err) {
        if (err) {
          res.json({
            "success": false,
            "message": "username already exist.. try another username"
          });
        } else {
          res.json({
            "success": true,
            "message": "user created .. Redirecting to Your home page"
          });
        }
      });
    }
  });



    //route for login backend
    app.post('/api/authenticate', function(req, res) {
      User.findOne({
        username: req.body.username
      }).select('email username password').exec(function(err, user) {
        if (err) throw err;
        if (!user) {
          res.json({
            "success": false,
            "message": "Username Provided doesnot match"
          });
        } else if (user) {
          if (req.body.password) {
            var validPassword = user.comparePassword(req.body.password);
          } else {
            res.json({
              "success": false,
              "message": "Please provide your password"
            });
          }

          if (!validPassword) {
            res.json({
              "success": false,
              "message": "Wrong password for the User Name provided"
            });
          } else {
            var token = jwt.sign({
              username: user.username,
              email: user.email
            }, secret, {
              expiresIn: '24h'
            })
            res.json({
              "success": true,
              "message": "authenticated",
              'token': token
            });
          }
        }
      })
    });
    /**jwt.sign({
    data: 'foobar'
  }, 'secret', { expiresIn: '1h' });
**/
    app.use(function(req, res, next) {
      var token = req.body.token || req.body.query || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, secret, function(err, decoded) {
          if (err) {
            res.json({
              "success": false,
              "message": "not a valid token"
            });

          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
      next();
    })

    app.post('/api/me', function(req, res) {
      res.send(req.decoded);
    })


  app.get('*', function(req, res) {
           res.sendfile('./public/index.html'); // load our public/index.html file
       });

return app;
}
