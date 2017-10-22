// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', ['MainService']).controller('MainController', function($scope,$http, $location, $timeout,user) {
var app = this;
app.load = true;

    this.regUser = function(regData) {
      app.errorMessage = false;
      user.create(this.regData).then(function(data) {
        if (data.data.success) {
          console.log("dara1"+data);
          app.successMessage = data.data.message;
          $timeout(function() {
            $location.path('/login');
          }, 2000);
        } else {
          app.errorMessage = data.data.message;
        }
      });
    };


});
