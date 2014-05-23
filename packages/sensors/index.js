var path = require('path'),
    express = require('express');

module.exports = function(mean) {

    mean.run(['mean.app', 'qbapi', function(app, qbapi) {
        app.use('/sensors/public', express.static(path.join(__dirname, '/public')));

        var timer;
        var clients = 0;
        var count = 0;
        var sensors;
        
        app.post('/api/sensors/start', function(req, res) {
            console.log(qbapi);
            qbapi.sensors(qbapi.defaultConfig, function(err, _sensors) {
                if (err) {
                    console.log('ERROR:', err);
                    return res.send(500);
                }
                
                sensors = _sensors;
                sensors.start();
                
                res.send({status: 'OK'});
            });
        });

        app.post('/api/sensors/stop', function(req, res) {
            if (sensors !== undefined) {
                sensors.stop();
                sensors = undefined;
            }
            res.send({status: 'OK'});
        });

        app.get('/api/sensors/read', function(req, res) {
            res.send({
                timer: sensors.timer,
                ticksLeft: sensors.ticksLeft,
                ticksRight: sensors.ticksRight,
                speedLeft: sensors.speedLeft,
                speedRight: sensors.speedRight,
                values: sensors.values
            });
        });
    }]);

    //routes(mean);

    mean.run(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('sensors');
        pageBuilder.aggregateScript(__dirname + '/public/app.js');

        pageBuilder.addMenu({link: 'sensors', title: 'Sensors'});
    }]);

};
