var express = require('express'), 
    bodyParser = require('body-parser'),
    app     = express(), 
    http    = require('http'), 
    server  = http.createServer(app), 
    q       = require('q'),
    path    = require('path'),
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

var _angularDependencies = [];

function finalizeAggregation() {
    var filecontents = _aggregation.js.map(function(path) {
        return fs.readFileSync(path);
    });

    var angularDependencies = _angularDependencies.map(function(moduleName) { return "'" + moduleName + "'"; }).join(", ");
    var template = '(function(angular){ angular.module("ane", [{dependencies}]); })(angular)';
    filecontents.push(template.replace(/\{dependencies\}/, angularDependencies));

    _aggregation._js = filecontents.join('\n');
    _aggregation._css = _aggregation.css.map(function(path) {
        return fs.readFileSync(path);
    }).join('\n');
}

app.route('/ane/modules-aggregated.js').get(function(req, res) {
    if (!_aggregation._js) {
        finalizeAggregation();
    }
    res.setHeader('Content-type', 'application/javascript');
    res.send(_aggregation._js);
});

var mean = {
    app: app,
    injector: injector,
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
    },
    angularDependencies: function() {
        for(var i = 0; i < arguments.length; i++) {
            _angularDependencies.push(arguments[i]);
        }
    },
    resolveAngularModules: function() {} // FIXME
};

injector.constant('mean', mean);

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

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
