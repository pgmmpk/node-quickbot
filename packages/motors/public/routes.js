(function(angular) {

    angular.module('motors').config(['$stateProvider', '$locationProvider',
                                     function($stateProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $stateProvider.state('motors', {
            url: '/motors',
            templateUrl: '/motors/public/index.html',
            controller: 'MotorsCtrl'
        });
    }]);

})(angular);
