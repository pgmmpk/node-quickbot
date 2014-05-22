(function(angular) {

    var module = angular.module('sensors', ['ui.router']);

    module.controller('SensorsCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.torqueLeft = 0;
        $scope.torqueRight = 0;

        $scope.run = function() {
            $http.post('/api/sensors/read', {
                torqueLeft: $scope.torqueLeft,
                torqueRight: $scope.torqueRight
            });
        };
    }]);

    module.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('sensors', {
            url: '/sensors',
            templateUrl: '/sensors/public/index.html',
            controller: 'SensorsCtrl'
        });
    }]);

})(angular);
