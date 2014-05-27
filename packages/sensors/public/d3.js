(function(angular) {
    
    var module = angular.module('sensors');

    module.directive('livechart', [function() {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function(scope, element, attrs) {
                var svg = d3.select(element[0]).append('svg').style('width', '100%');

                var xScale = d3.scale.linear().domain([0, 150]).range([0, 300]);
                var yScale = d3.scale.linear().domain([0, 4096]).range([0, 300]);

                scope.$watch('data', function() {
                    var data = scope.data || [];
                    svg.selectAll('rect').data(data).enter()
                    .append('rect').attr('height', function(d, i) {
                        return yScale(d);
                    }).attr('width', 20).attr('x', function(d, i) {
                        return i * 30;
                    }).attr('y', 0)
                    .attr('fill', 'green');
                }, true);
            }
        };
    }]);
})(angular);