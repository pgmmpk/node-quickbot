var path = require('path'),
    express = require('express'),
    routes = require('./server/routes');

module.exports = function(mean) {

    mean.run(['mean.app', 'sockets', 'qbapi', function(app, sockets, qbapi) {
        app.use('/sensors/public', express.static(path.join(__dirname, '/public')));

        var timer;
        var clients = 0;
        var count = 0;
        var sensors;

        sockets.on('connection', function(socket) {
            
            if (timer !== undefined) {
                socket.emit('You are not the first :(');
            }
            
            socket.on('eyb', function() {
                console.log('EYB', clients);
                if (clients++ === 0) {
                    qbapi.sensors(qbapi.defaultConfig, function(err, _sensors) {
                        if (err) {
                            console.log('ERROR:', err);
                            return;
                        }
                        
                        sensors = _sensors;

                        sensors.start();
                        
                        var throttleCount = 0;
                        
                        timer = setInterval(function() {
                            sensors.read();
                            throttleCount ++;
                            if (throttleCount === 10) {
                                throttleCount = 0;
                                socket.emit('sensors', {
                                    timer: sensors.timer,
                                    ticksLeft: sensors.ticksLeft,
                                    ticksRight: sensors.ticksRight,
                                    speedLeft: sensors.speedLeft,
                                    speedRight: sensors.speedRight,
                                    values: sensors.values
                                });
                            }
                        }, 10);
                    });
                }
            });
            
            socket.on('bye', function() {
                console.log('BYE');
                if (--clients === 0) {
                    sensors.stop();
                    sensors = undefined;
                    clearInterval(timer);
                    timer = undefined;
                }
            });
            
            socket.on('ping', function(data) {
                console.log(data.ping);
            });
        });
    }]);

    //routes(mean);

    mean.run(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('sensors');
        pageBuilder.aggregateScript(__dirname + '/public/app.js');
        pageBuilder.addScriptUrl('//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js');

        pageBuilder.addMenu({link: 'sensors', title: 'Sensors'});
    }]);

};
