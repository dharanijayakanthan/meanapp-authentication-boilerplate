// public/js/services/MainService.js
angular.module('MainService', []).factory('user', ['$http', function($http) {
  var userFactory = {};
  //user.create()
  userFactory.create = function(regData){
    return $http.post('/api/user',regData);
  }
  return userFactory;
}]);
