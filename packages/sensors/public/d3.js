(function(angular) {
    
    var module = angular.module('sensors');

    module.directive('livechart', [function() {
        return {
            restrict: 'E',
            scope: {
                width: '@',
                height: '@',

                data: '='
            },
            link: function(scope, element, attrs) {
                var svg = d3.select(element[0]).append('svg').style('width', '100%');

                var width = attrs.width || 300;
                var height = attrs.height || 300;

                var xScale = d3.scale.linear().domain([0, 150]).range([0, width]);
                var yScale = d3.scale.linear().domain([4096, 0]).range([0, height]);

                function update(selection) {
                    selection.attr('height', function(d, i) {
                        return height - yScale(d);
                    }).attr('width', xScale(20))
                    .attr('x', function(d, i) {
                        return xScale(i * 30);
                    }).attr('y', yScale(0))
                    .attr('fill', 'green');
                }

                scope.$watch('data', function() {
                    var data = scope.data || [];
                    var rects = svg.selectAll('rect').data(data);

                    rects.enter().append('rect').call(update);
                    rects.exit().remove();
                    rects.call(update);

                });
            }
        };
    }]);
})(angular);