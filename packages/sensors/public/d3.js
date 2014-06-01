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
                var wheelShape = d3.svg.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .interpolate('linear')([
                                            {x: -10, y: -25},
                                            {x: 10, y: -25},
                                            {x: 10, y: 25},
                                            {x: -10, y: 25},
                                            ]) + 'Z';
                var sensorBeam = d3.svg.line()
                    .x(function(d) { return d.x; })
                    .y(function(d) { return d.y; })
                    .interpolate('linear')([
                                            {x: 0, y: 0},
                                            {x: -1, y: -10},
                                            {x: 1, y: -10}
                                            ]) + 'Z';

                var robotShape = d3.svg.line()
                    .x(function(d) {return d.x;})
                    .y(function(d) {return d.y;})
                    .interpolate('linear')([
                                            {x: -45, y: -60},
                                            {x: -15, y: -80},
                                            {x:  15, y: -80},
                                            {x:  45, y: -60},
                                            {x:  45, y: 40},
                                            {x:  35, y: 60},
                                            {x: -35, y: 60},
                                            {x:  -45, y: 40}
                                            ]) + 'Z';
                var beamColor = '#ccffcc';
                var group = svg.append('g')
                    .attr("transform", function(d) { return "translate(200,200)"; });

                group.append('path').attr('d', wheelShape).attr('stroke', 'none').attr('fill', 'black')
                    .attr('transform', 'translate(-40,-25)');
                group.append('path').attr('d', wheelShape).attr('stroke', 'none').attr('fill', 'black')
                    .attr('transform', 'translate(40,-25)');
                group.append('path').attr('d', robotShape).attr('stroke', 'none').attr('fill', 'red');
                group.append('g').attr('transform', 'translate(-45,20)')
                    .append('g').attr('transform', 'rotate(-90)')
                    .append('path').attr('class', 'sensor')
                    .attr('d', sensorBeam).attr('stroke', 'none').attr('fill', beamColor)
                    .attr('transform', 'scale(10,10)');
                group.append('g').attr('transform', 'translate(-35,-65)')
                    .append('g').attr('transform', 'rotate(-45)')
                    .append('path').attr('class', 'sensor')
                    .attr('d', sensorBeam).attr('stroke', 'none').attr('fill', beamColor)
                    .attr('transform', 'scale(10,10)');
                group.append('g').attr('transform', 'translate(0,-75)')
                    .append('g').attr('transform', 'rotate(-0)')
                    .append('path').attr('class', 'sensor')
                    .attr('d', sensorBeam).attr('stroke', 'none').attr('fill', beamColor)
                    .attr('transform', 'scale(10,10)');
                group.append('g').attr('transform', 'translate(35,-65)')
                    .append('g').attr('transform', 'rotate(45)')
                    .append('path').attr('class', 'sensor')
                    .attr('d', sensorBeam).attr('stroke', 'none').attr('fill', beamColor)
                    .attr('transform', 'scale(10,10)');
                group.append('g').attr('transform', 'translate(45,20)')
                    .append('g').attr('transform', 'rotate(90)')
                    .append('path').attr('class', 'sensor')
                    .attr('d', sensorBeam).attr('stroke', 'none').attr('fill', beamColor)
                    .attr('transform', 'scale(10,10)');

                var width = attrs.width || 300;
                var height = attrs.height || 300;

                var xScale = d3.scale.linear().domain([0, 150]).range([0, width]);
                var yScale = d3.scale.linear().domain([0, 4096]).range([0, height]);

                function update(selection) {
                    selection.attr('transform', function(d) { return 'scale(' + ( 5000/(d+1) ) + ')';});
                }

                scope.$watch('data', function() {
                    var data = scope.data || [];
                    var paths = svg.selectAll('.sensor').data(data);

                    paths.call(update);
                });
            }
        };
    }]);
})(angular);