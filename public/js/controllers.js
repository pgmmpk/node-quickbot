(function(angular) {

    var module = angular.module('quickbot');

    module.controller('AppCtrl', ['$scope', function($scope) {

    }]);

    module.controller('ToolsCtrl', ['$scope', 'quickbot.robot', '$timeout', function($scope, robot, $timeout) {

        $scope.result0 = '';
        $scope.result1 = '';
        $scope.message = '';

        $scope.calibrate = function() {
            $scope.result0 = '';
            $scope.result1 = '';

            $scope.message = 'Working. Please wait (approx 2 seconds)...'
            //robot.motors.run({pwm_left: 50, pwm_right: 50});
            robot.speed({speed_left: 50, speed_right: 50});

            $timeout(function() {
                robot.motors.run({pwm_left: 0, pwm_right: 0});

                robot.sensors.encoder0_values().then(function(res) {
                    $scope.result0 = res.data;
                });

                robot.sensors.encoder1_values().then(function(res) {
                    $scope.result1 = res.data;
                });

                $scope.message = '';
            }, 2000);

        };

    }]);
    
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
