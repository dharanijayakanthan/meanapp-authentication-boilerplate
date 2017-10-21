// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
.when('/signup',{
    templateUrl: 'views/signup.html',
    controller: 'AuthController'
})
.when('/login',{
    templateUrl: 'views/login.html',
    controller: 'AuthController'
})
.when('/forget password',{
    templateUrl: 'views/forget.html',
    controller: 'AuthController'

})


    $locationProvider.html5Mode(true);

}]);
