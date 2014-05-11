(function(angular){
    'use strict';

    var module = angular.module('quickbot', ['ngRoute']);

    module.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
        
        $routeProvider.
            when('/', {
                templateUrl: 'partials/index',
                controller: 'AppCtrl'
            }).
            when('/tools', {
                templateUrl: 'partials/tools',
                controller: 'ToolsCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
        
        $locationProvider.html5Mode(true);
    }]);
    
})(angular);
