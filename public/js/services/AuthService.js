angular.module('AuthService', [])
  //authService
  .factory('auth', function($http, authToken) {
    var authFactory = {};
    authFactory.login = function(loginData) {
      return $http.post('/api/authenticate', loginData).then(function(data) {
        authToken.setToken(data.data.token);
        return data;
      })
    }
    //auth.isLoggedIn();
    authFactory.isLoggedIn = function() {
      if (authToken.getToken()) {
        return true;
      } else {
        return false;
      }
    }
    //auth.getUser();
    authFactory.getUser = function() {
      if (authToken.getToken()) {
        return $http.post('/api/me');
      } else {
        $q.reject({
          "message": "User has no token"
        })
      }
    }
    //auth.isLoggedOut();
    authFactory.isLoggedOut = function() {
      authToken.setToken();
      return true;
    }
    return authFactory;
  })
  //authTokenService
  .factory('authToken', function($window) {
    var authTokenFactory = {};
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    }
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    }
    return authTokenFactory;
  })
  .factory('authInter', function(authToken) {
    var authInterFactory = {};
    authInterFactory.request = function(config) {
      var token = authToken.getToken();
      if (token) config.headers['x-access-token'] = token;
      return config;
    }
    return authInterFactory;
  })
