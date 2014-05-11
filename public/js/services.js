(function(angular) {

    var module = angular.module('quickbot');

    module.factory('quickbot.robot', ['$http', function($http) {
        
        return {
            speed: function(vals) {
                if (vals === undefined) {
                    return $http.get('/api/quickbot/speed');
                } else {
                    return $http.post('/api/quickbot/speed', vals);
                }
            },

            motors: {
                run: function(vals) {
                    return $http.post('/api/quickbot/motors/run', vals);
                }
            },

            sensors: {
                encoder0_values: function() {
                    return $http.get('/api/quickbot/sensors/encoder0_values');
                },

                encoder1_values: function() {
                    return $http.get('/api/quickbot/sensors/encoder1_values');
                },
            }
        };
    }]);

})(angular);
