var path = require('path'),
    express = require('express');

module.exports = function(mean) {

    mean.app.use('/motors/public', express.static(path.join(__dirname, '/public')));

    mean.injector.factory('qbapi', [function() {
        var qbapi;
        try {
            qbapi = require('quickbot-api');
        } catch(ex) {
            console.log('USING MOCK qbapi');
            qbapi = require('./server/mocks/quickbot-api');
        }
        return qbapi;
    }]);

    var routes = require('./server/routes');

    mean.injector.inject(routes);
    
    mean.injector.inject(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.aggregateScript(__dirname + '/public/controllers.js');
        pageBuilder.aggregateScript(__dirname + '/public/routes.js');
        pageBuilder.addAngularModule('motors');
    }]);

};
