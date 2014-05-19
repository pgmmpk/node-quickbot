(function(angular){
    'use strict';

    var module = angular.module('quickbot', ['ui.router', 'motors']);

    module.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 
                   function($stateProvider, $locationProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: '/'
        });

        $stateProvider.state('tools', {
            url: '/tools'
        });

        $locationProvider.html5Mode(true);
    }]);
    
    module.run(['$state', function($state) {
        $state.transitionTo('home');
    }]);
    
})(angular);
