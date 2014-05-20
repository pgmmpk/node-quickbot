var express = require('express'), 
    bodyParser = require('body-parser'),
    app     = express(), 
    http    = require('http'), 
    server  = http.createServer(app), 
    q       = require('q'),
    path    = require('path'),
    adc     = require('./routes/adc'),
    fs = require('fs'),
    injector= require('./injector');

// all environments
app.set('port', 3005);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon(__dirname + '/graphics/favicon.ico'));
app.use(bodyParser());

var _aggregation = {
    js: [],
    css: []
};

function finalizeAggregation() {
    _aggregation._js = _aggregation.js.map(function(path) {
        return fs.readFileSync(path);
    }).join('\n');
    _aggregation._css = _aggregation.css.map(function(path) {
        return fs.readFileSync(path);
    }).join('\n');
}

app.route('/modules/aggregated.js').get(function(req, res) {
    if (!_aggregation._js) {
        finalizeAggregation();
    }
    res.setHeader('Content-type', 'application/javascript');
    res.send(_aggregation._js);
});

var mean = {
    app: app,
    injector: injector,
    'static': function(prefix, directory) {
        app.use(prefix, express.static(directory));
    },
    renderHome: renderIndex,
    aggregate: function(base, aggregation) {
        if (aggregation.js) {
            _aggregation.js = _aggregation.js.concat(aggregation.js.map(function(a) {
                return path.join(base, a);
            }));
        }
        if (aggregation.css) {
            _aggregation.css = _aggregation.css.concat(aggregation.css);
        }
    }
};

injector.constant('mean', mean);

app.use(express.static(path.join(__dirname, '../public')));

/* API */

app.get('/', renderIndex);
app.get('/tools', renderIndex);

function renderIndex(req, res) {
    console.log('rendering index');
    res.render('index');
}

injector.constant('mean.app', app);

// bootstrap packages
fs.readdirSync(path.join(__dirname, '../packages')).forEach(function(pkg) {
    console.log(pkg);
    require('../packages/' + pkg)(mean);
});

/*
injector.constant('qbapi', {
    motors: function() {
        console.log('motors called');
    }
});
*/


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
