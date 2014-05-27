(function(angular) {

    var module = angular.module('sensors', ['ui.router']);

    module.controller('SensorsCtrl', ['$scope', 'socket', function($scope, socket) {
        
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
        $stateProvider.state('sensors', {
            url: '/sensors',
            templateUrl: '/sensors/public/index.html',
            controller: 'SensorsCtrl',
            onEnter: function() {
                if (socket === undefined) {
                    socket = io.connect();
                }
                socket.emit('eyb');
            },
            onExit: function() {
                socket.emit('bye');
            }
        });
    }]);

})(angular);
