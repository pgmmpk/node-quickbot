var express = require('express'), 
    bodyParser = require('body-parser'),
    app     = express(), 
    http    = require('http'), 
    server  = http.createServer(app), 
    q       = require('q'),
    path    = require('path'),
    motors  = require('./routes/motors'),
    adc     = require('./routes/adc')
    qbapi   = require('node-quickbot-api');

// all environments
app.set('port', 3005);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon(__dirname + '/graphics/favicon.ico'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '../public')));

/* API */
app.post('/api/quickbot/speed', function(req, res) {
    console.log('set speed:', req.body);
    robot.setSpeed(req.body.speed_left, req.body.speed_right);
    res.json({status: "OK"});
});

app.get('/api/quickbot/speed', function(req, res) {
    console.log('get speed');
    res.json(robot.speed());
});

app.get('/api/quickbot/ticks', function(req, res) {
    res.json(robot.ticks());
});

app.delete('/api/quickbot/ticks', function(req, res) {
    robot.reset_ticks();
    res.json({status: "OK"});
});

app.get('/api/quickbot/ir_distance', function(req, res) {
    res.json(robot.ir_distance());
});

app.get('/api/quickbot/ir_raw', function(req, res) {
    res.json(robot.ir_raw());
});

app.post('/api/quickbot/motors/run', function(req, res) {
    console.log('motors.run:', req.body);
    robot.setSpeed(req.body.pwm_left, req.body.pwm_right);
    res.json({status: "OK"});
});

app.get('/api/quickbot/sensors/encoder0_values', function(req, res) {
    res.json(robot.sensors().adc.encoder0Values());
});

app.get('/api/quickbot/sensors/encoder1_values', function(req, res) {
    res.json(robot.sensors().adc.encoder1Values());
});

app.get('/', renderIndex);
app.get('/tools', renderIndex);
app.get('/research', renderIndex);
app.get('/partials/:name', renderPartial);

function renderIndex(req, res) {
    console.log('rendering index');
    res.render('index');
}

function renderPartial(req, res) {
    res.render('partials/' + req.params.name);
}

motors(app, qbapi);
/**
 * {
    motors: function(config, callback) {
        setTimeout(function() {
            callback(null, {
               run: function(torqueLeft, torqueRight) {
                   console.log('MOCK motors.run', torqueLeft, torqueRight);
               },
               close: function() {
                   console.log('MOCK motors.close');
               }
            });
        });
    }
});
*/

adc(app, function(calback) {
   setTimeout(function() {
       var timer = 0;
       callback(null, {
           encoder0Pin: function(pin) {
               console.log('MOCK adc.encoder0Pin', pin);
           },
           encoder1Pin: function(pin) {
               console.log('MOCK adc.encoder1Pin', pin);
           },
           encoder0Threshold: function(threshold) {
               console.log('MOCK adc.encoder0Threshold', threshold);
           },
           encoder1Threshold: function(pin) {
               console.log('MOCK adc.encoder1Threshold', threshold);
           },
           encoder0Delay: function(delay) {
               console.log('MOCK adc.encoder0Pin', delay);
           },
           encoder1Delay: function(delay) {
               console.log('MOCK adc.encoder1Pin', delay);
           },
           start: function() {
               console.log('MOCK adc.start');
               timer = 0;
           },
           stop: function() {
               console.log('MOCK adc.stop');
           },
           values: function() {
               console.log('MOCK adc.values');
               return [0, 1, 2, 3, 4, 5, 6, 7];
           },
           encoder0Values: function() {
               console.log('MOCK adc.encoder0Values');
               return [1, 2, 3, 4, 5];
           },
           encoder1Values: function() {
               console.log('MOCK adc.encoder1Values');
               return [1, 2, 3, 4, 5];
           },
           encoder0Ticks: function() {
               console.log('MOCK adc.encoder0Ticks');
               return 123;
           },
           encoder1Ticks: function() {
               console.log('MOCK adc.encoder1Ticks');
               return 345;
           },
           encoder0Speed: function() {
               console.log('MOCK adc.encoder0Speed');
               return 0.6;
           },
           encoder1Speed: function() {
               console.log('MOCK adc.encoder1Speed');
               return 0.5;
           },
           timer: function() {
               return ++timer;
           }
       });
   });
});

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
