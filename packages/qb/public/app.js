(function(angular) {

    var module = angular.module('qb', ['ui.router']);

    module.controller('QbCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.is_running = $http.get('/qb/is_running')

        socket.on('heartbeat', function(data) {
            console.log('heartbeat:', data.heartbeat);
        });

        socket.on('sensors', function(sensors) {
            console.log(sensors);
            $scope.timer = sensors.timer;
            $scope.ticksLeft = sensors.ticksLeft;
            $scope.ticksRight = sensors.ticksRight;
            $scope.speedLeft = sensors.speedLeft;
            $scope.speedRight = sensors.speedRight;
            $scope.values = sensors.values;
        });

        $scope.ping = function() {
            console.log('sending Hello');
            socket.emit('ping', {ping: 'Privet'});
        };
    }]);

    var socket;

    module.factory('socket', ['$rootScope', function ($rootScope) {
        return {
            
            on: function (eventName, callback) {
                socket.on(eventName, function () {  
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
          
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);

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
                        $http.post('/qb/stop')
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
