var express = require('express'), 
    app     = express(), 
    http    = require('http'), 
    server  = http.createServer(app), 
    q       = require('q'),
    path    = require('path'),
    robot   = require('./robot/index'),
    config  = require('./config');

// all environments
app.set('port', config.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon(__dirname + '/graphics/favicon.ico'));
app.use(express.json());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/* API */
app.post('/api/quickbot/speed', function(req, res) {
    robot.setSpeed(req.body.speed_left, req.body.speed_right);
    res.json({status: "OK"});
});

app.get('/api/quickbot/speed', function(req, res) {
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
    robot.motors().run(req.body.pwm_left, req.body.pwm_right);
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
    res.render('index');
}

function renderPartial(req, res) {
    res.render('partials/' + req.params.name);
}

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
