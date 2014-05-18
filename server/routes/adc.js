module.exports = function(app, pruadc) {

    var adc = undefined;
    var running = false;

    app.post('/api/adc/setup', function(req, res) {
        if (running) {
            adc.stop();
            adc = undefined;
        }

        if (!adc) {
            pruadc(function(err, a) {
                if (err) {
                    console.log('ERROR:', err);
                    return res.send(500);
                }
                
                adc = a;
                
                setup();
            });
        } else {
            setup();
        }

        function setup() {
            if (req.body.emaPow !== undefined) {
                adc.emaPow(+req.body.emaPow);
            }
            
            if (req.body.encoder0Pin !== undefined) {
                adc.encoder0Pin(+req.body.encoder0Pin);
            }

            if (req.body.encoder1Pin !== undefined) {
                adc.encoder1Pin(+req.body.encoder1Pin);
            }
            
            if (req.body.encoder0Threshold !== undefined) {
                adc.encoder0Threshold(+req.body.encoder0Threshold);
            }

            if (req.body.encoder1Threshold !== undefined) {
                adc.encoder1Threshold(+req.body.encoder1Threshold);
            }

            if (req.body.encoder0Delay !== undefined) {
                adc.encoder0Delay(+req.body.encoder0Delay);
            }

            if (req.body.encoder1Delay !== undefined) {
                adc.encoder1Delay(+req.body.encoder1Delay);
            }
            
            return res.json({status: 'OK'})
        }
    });

    app.post('/api/adc/start', function(req, res) {
        if (running) {
            console.log('ERROR: adc alreay running, stop it first');
            return res.send(500);
        }
        
        if (!adc) {
            console.log('ERROR: adc not there, you must setup it first');
            return res.send(500);
        }
        
        running = true;
        adc.start();
        
        return res.json({status: 'OK'});
    });
    
    app.post('/api/adc/stop', function(req, res) {
        if (adc) {
            adc.stop();
            running = false;
            adc = undefined;
        }
        
        return res.json({status: 'OK'});
    });
    
    app.get('/api/adc/read', function(req, res) {
        if (!running) {
            console.log('ERROR: adc not running');
            return res.send(500);
        }
        return res.json({
            encoder0Values: adc.encoder0Values(),
            encoder1Values: adc.encoder1Values(),
            encoder0Ticks : adc.encoder0Ticks(),
            encoder1Ticks : adc.encoder1Ticks(),
            encoder0Speed : adc.encoder0Speed(),
            encoder1Speed : adc.encoder1Speed(),
            values        : adc.values(),
            timer         : adc.timer()
        });
    });
};
