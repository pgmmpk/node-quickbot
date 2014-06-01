(function(angular) {

    var module = angular.module('sensors', ['ui.router']);

    module.controller('SensorsCtrl', ['$scope', 'socket', function($scope, socket) {
        
        console.log('Connected');
        socket.emit('eyb');
        
        $scope.$on('$destroy', function() {
            console.log('Disconnect');
            socket.emit('bye');
        });
        
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

    module.factory('socket', ['$rootScope', function ($rootScope) {
        var sock = io.connect();

        return {
            
            on: function (eventName, callback) {
                sock.on(eventName, function () {  
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(sock, args);
                    });
                });
            },
          
            emit: function (eventName, data, callback) {
                sock.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(sock, args);
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
            controller: 'SensorsCtrl'
        });
    }]);

})(angular);
