var express = require('express'), 
    bodyParser = require('body-parser'),
    app     = express(), 
    http    = require('http'), 
    server  = http.createServer(app), 
    PageBuilder = require('./page-builder'),
    config = require('./config');

app.set('port', 3005);

app.use(bodyParser());

var pageBuilder = PageBuilder(app);

config(app, pageBuilder);  // configure all modules

app.get('*', pageBuilder);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
