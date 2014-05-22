(function(angular) {

    var module = angular.module('motors', ['ui.router']);

    module.controller('MotorsCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.torqueLeft = 0;
        $scope.torqueRight = 0;

        $scope.run = function() {
            $http.post('/api/motors/run', {
                torqueLeft: $scope.torqueLeft,
                torqueRight: $scope.torqueRight
            });
        };
    }]);

    module.config(['$stateProvider', function($stateProvider, $locationProvider) {
        $stateProvider.state('motors', {
            url: '/motors',
            templateUrl: '/motors/public/index.html',
            controller: 'MotorsCtrl'
        });
    }]);

})(angular);
