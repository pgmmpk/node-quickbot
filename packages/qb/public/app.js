(function(angular) {

    var module = angular.module('qb', ['ui.router']);

    module.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('qb', {
            url: '/qb',
            templateUrl: '/qb/public/index.html',
            resolve: {
                is_running: function($http) {
                    return $http.get('/qb/is_running');
                }
            },
            controller: function($scope, is_running, $http) {
                $scope.is_running = is_running.data.is_running;
                $scope.start = function() {
                    if (!$scope.is_running) {
                        $http.post('/qb/start');
                        $scope.is_running = true;
                    }
                };
                $scope.stop = function() {
                    if ($scope.is_running) {
                        $http.post('/qb/stop');
                        $scope.is_running = false;
                    }
                };
                $scope.run = function(speedLeft, speedRight) {
                    $http.post('/qb/run', {
                        speedLeft: speedLeft,
                        speedRight: speedRight
                    });
                };
            }
        });
    }]);

})(angular);
