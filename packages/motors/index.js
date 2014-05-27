var path = require('path'),
    express = require('express'),
    routes = require('./server/routes');

module.exports = function(meany) {

    meany.configure(['meany.app', function(app) {
        app.use('/motors/public', express.static(path.join(__dirname, '/public')));
    }]);

    routes(meany);

    meany.configure(['meany.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('motors');
        pageBuilder.aggregateScript(__dirname + '/public/app.js');
        
        pageBuilder.addMenu({link: 'motors', title: 'Motors'});
    }]);

};
