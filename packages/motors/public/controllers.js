(function(angular) {

    var module = angular.module('quickbot.motors', []);

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

})(angular);
