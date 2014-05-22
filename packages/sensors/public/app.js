(function(angular) {

    var module = angular.module('sensors', ['ui.router']);

    module.controller('SensorsCtrl', ['$scope', 'socket', function($scope, socket) {
        
        socket.on('heartbeat', function(data) {
            console.log('heartbeat:', data.heartbeat);
        });

        $scope.ping = function() {
            console.log('sending Hello')
            socket.emit('ping', {ping: 'Privet'});
        }
    }]);
    
    module.factory('socket', ['$rootScope', function ($rootScope) {
        var socket = io.connect();
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
            controller: 'SensorsCtrl'
        });
    }]);

})(angular);
