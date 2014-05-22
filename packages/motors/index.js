var path = require('path'),
    express = require('express'),
    routes = require('./server/routes');

module.exports = function(mean) {

    mean.run(['mean.app', function(app) {
        app.use('/motors/public', express.static(path.join(__dirname, '/public')));
    }]);

    routes(mean);

    mean.run(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('motors');
        pageBuilder.aggregateScript(__dirname + '/public/app.js');
        
        pageBuilder.addMenu({link: 'motors', title: 'Motors'});
    }]);

};
