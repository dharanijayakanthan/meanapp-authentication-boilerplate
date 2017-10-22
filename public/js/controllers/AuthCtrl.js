angular.module('AuthController', ['AuthService'])
  .controller('AuthCtrl', function($http, $location, $timeout, auth, $rootScope) {
    var app = this;
    app.load = true;
    app.loadme = false;
    app.notLoaded = false;


    //Check if the token is present

    $rootScope.$on('$routeChangeStart', function() {
      if (auth.isLoggedIn()) {
        console.log("success token is there");
        auth.getUser().then(function(data) {
          app.isLoggedIn = true;
          app.username = data.data.username;
          app.loadme = true;
          app.notLoaded = true;
        });
      } else {
        app.isLoggedIn = false;
        console.log("error token not found");
        app.loadme = true;
        app.notLoaded = true;
      }
   })
    var app = this;
    this.login = function(loginData) {
      app.errorMessage = false;
      console.log(this.loginData);
      auth.login(this.loginData).then(function(data) {
        console.log(data);
        if (data.data.success) {
          app.successMessage = data.data.message;
          $timeout(function() {
            $location.path('/home');
          }, 2000);
        } else {
          app.errorMessage = data.data.message;
        }
      });
    };
    //Log out
    this.logout = function() {
      var set = auth.isLoggedOut();
      if (set) {
        app.errorMessage = "It looks like you have logged out please login again to continue.. ";
        app.successMessage = "";
        $timeout(function() {
          $location.path('/login');
        }, 2000);
      }
      else {
        app.errorMessage = "It looks your account cant be looged out... Please sign in first to logout";
        $timeout(function() {
          $location.path('/login');
        }, 2000);
      }
    }
  })
