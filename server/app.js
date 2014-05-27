var express = require('express'), 
    bodyParser = require('body-parser'),
    app     = express(), 
    http    = require('http'), 
    server  = http.createServer(app), 
    pageBuilderFactory = require('./page-builder'),
    injectorFactory = require('./injector');

app.set('port', 3005);

app.use(bodyParser());

var meany = injectorFactory();
meany.configure = meany.inject;  // convenience...
meany.require = function(name) {
    meany.factory(name, [function() {
        return require(name);
    }]);
};

meany.constant('meany', meany);
meany.constant('meany.app', app);
meany.constant('meany.server', server);
require('./page-builder')(meany);

require(process.cwd() + '/meany')(meany);  // configure all meany modules

meany.configure(['meany.pageBuilder', function(pageBuilder) {
    app.get('*', pageBuilder);  // catch-all loads home page, convenient for client-side routing in SPA
}]);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
