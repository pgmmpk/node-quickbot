var path = require('path'),
    express = require('express'),
    routes = require('./server/routes');

module.exports = function(mean) {

    mean.run(['mean.app', function(app) {
        app.use('/sensors/public', express.static(path.join(__dirname, '/public')));
    }]);

    routes(mean);

    mean.run(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('sensors');
        pageBuilder.aggregateScript(__dirname + '/public/app.js');
        
        pageBuilder.addMenu({link: 'sensors', title: 'Sensors'});
    }]);

};
