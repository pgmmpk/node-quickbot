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
            robot.motors.run({pwm_left: 50, pwm_right: 50});

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
})(angular);