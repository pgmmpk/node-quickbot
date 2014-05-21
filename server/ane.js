
var toAggregate = {
    js: [],
    css: [],
    seen: {}
};

var aggregated = undefined;

var angularModules = [];

function finalizeAggregation() {
    var filecontents = toAggregate.js.map(function(path) {
        return fs.readFileSync(path);
    });

    var angularDependencies = JSON.stringify(angularDependencies);
    var template = '(function(angular){ angular.module("ane", [{dependencies}]); })(angular)';
    filecontents.push(template.replace(/\{dependencies\}/, angularDependencies));

    aggregated = filecontents.join('\n');
}

var pageBuilder = {

    addScriptUrl: function(url) {
        scripts.push(url);
    },

    aggregateScript: function(filename) {
        toAggregate.js.push(filename);
    },

    aggregateCss: function(filename) {
        toAggregate.css.push(filename);
    },

    addAngularModule: function(moduleName) {
        angularModules.push(moduleName);
    }
};

var mean = {
    routes: {},
    injector: 
};

mean.routes.aggregatedJs = express.Route().get('/ane/modules-aggregated.js', function(req, res) {
    if (aggregated === undefined) {
        finalizeAggregation();
    }
    res.setHeader('Content-type', 'application/javascript');
    res.send(aggregated);
});

mean.routes.index = express.Route().get('/', mean.renderIndex);

var nea = {

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
    }
};

injector.constant('mean', mean);

app.get('/', renderIndex);
