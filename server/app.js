var express = require('express'), 
    bodyParser = require('body-parser'),
    app     = express(), 
    http    = require('http'), 
    server  = http.createServer(app), 
    pageBuilderFactory = require('./page-builder'),
    injectorFactory = require('./injector');

app.set('port', 3005);

app.use(bodyParser());

var pageBuilder = pageBuilderFactory(app);

var mean = injectorFactory();
mean.constant('mean', mean);
mean.constant('mean.app', app);
mean.constant('mean.server', server);
mean.constant('mean.pageBuilder', pageBuilder);
mean.run = mean.inject;  // convenience
mean.require = function(name) {
    mean.factory(name, [function() {
        return require(name);
    }]);
};

require(process.cwd() + '/bane')(mean);  // configure all mean modules

app.get('*', pageBuilder);  // catch-all loads home page, convenient for client-side routing in SPA

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
