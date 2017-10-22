// public/js/appRoutes.js
var app = angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider)
{
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'MainController',
      controllerAs:'main'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl',
      controllerAs:'authc'
    })
    .when('/forget password', {
      templateUrl: 'views/forget.html',
      controller: 'AuthCtrl',
      controllerAs:'authc'
    })
    .otherwise({
      RedirectTo:'/'
    })
    $locationProvider.html5Mode({
      enabled:true,
      requireBase:false
    });
}]);
