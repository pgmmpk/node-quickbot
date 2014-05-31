var path = require('path'),
    express = require('express');

module.exports = function(meany) {

    meany.configure(['meany.app', 'qbapi', function(app, qbapi) {
        app.use('/qb/public', express.static(path.join(__dirname, '/public')));

        var qb;
        var timer;

        qbapi.qb(qbapi.defaultConfig, function(err, _qb) {
            if (err) {
                return console.log('ERROR: ' + err);
            }

            qb = _qb;
        });

        app.get('/qb/is_running', function(req, res) {
            res.send({'is_running': !!timer});
        });
        
        app.post('/qb/start', function(req, res) {
            if (!timer) {
                qbapi.qb(qbapi.defaultConfig, function(err, _qb) {
                    if (err) {
                        console.log('ERROR: ' + err);
                        return res.send(500);
                    }
                    
                    qb = _qb;
                    qb.start();
                    
                    timer = setInterval(qb.onTimer, 10);
                    
                    return res.send({'status': 'OK'});
                });
            } else{
                res.send({'startus': 'OK'});
            }
        });
        
        app.post('/qb/stop', function(req, res) {
            if (qb) {
                if (timer) {
                    clearInterval(timer);
                    timer = undefined;
                }
                
                qb.stop();
                qb = undefined;
            }
            
            res.send({'startus': 'OK'});
        });

        app.post('/qb/run', function(req, res) {
            if (!timer) {
                console.log('ERROR: not running');
                return res.send(500);
            }

            qb.run(+req.body.speedLeft, +req.body.speedRight);
            return res.send({'status': 'OK'});
        });
    }]);

    meany.configure(['meany.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('qb');
        pageBuilder.aggregateScript(__dirname + '/public/app.js');

        pageBuilder.addMenu({link: 'qb', title: 'Qb'});
    }]);

};
