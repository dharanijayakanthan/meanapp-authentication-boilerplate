angular.module('app', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainService' , 'AuthController' , 'AuthService'])
.config(function($httpProvider){
$httpProvider.interceptors.push('authInter');
})
