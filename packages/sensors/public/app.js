(function(angular) {

    var module = angular.module('sensors', ['ui.router']);

    module.controller('SensorsCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
        console.log('initializing controller');

        $http.post('/api/sensors/start');
        
        var timer = $interval(function() {
            $http.get('/api/sensors/read').then(function(sensors) {
                if (sensors.status !== 'OK') {
                    $scope.status = 'Not ready';
                } else {
                    $scope.status = '';
                    $scope.timer = sensors.timer;
                    $scope.ticksLeft = sensors.ticksLeft;
                    $scope.ticksRight = sensors.ticksRight;
                    $scope.speedLeft = sensors.speedLeft;
                    $scope.speedRight = sensors.speedRight;
                    $scope.values = sensors.values;
                }
            }, function(err) {
                $scope.status = 'IO error: ' + err;
            });
        }, 200);

        $scope.$on('$destroy', function() {
            console.log('destroying controller');
            $interval.cancel(timer);
            $http.post('/api/sensors/stop');
        });
    }]);

    module.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('sensors', {
            url: '/sensors',
            templateUrl: '/sensors/public/index.html',
            controller: 'SensorsCtrl'
        });
    }]);

})(angular);
