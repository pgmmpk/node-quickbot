(function(angular) {
    
    angular.module('motors').config(['$stateProvider', function($stateProvider){

        $stateProvider.state('motors', {
            url: '/motors',
            templateUrl: '/motors',
        });
    }]);
})(angular);

// states for my app
