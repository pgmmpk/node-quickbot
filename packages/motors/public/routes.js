(function(angular) {

    angular.module('motors').config(['$stateProvider', function($stateProvider){

        $stateProvider.state('motors', {
            url: '/motors',
            templateUrl: '/motors/public/index.html',
            controller: 'MotorsCtrl'
        });
    }]);

})(angular);

// states for my app
