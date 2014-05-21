var path = require('path'),
    express = require('express'),
    routes = require('./server/routes');

module.exports = function(mean) {

    mean.factory('qbapi', [function() {
        var qbapi;
        try {
            qbapi = require('quickbot-api');
        } catch(ex) {
            console.log('USING MOCK qbapi');
            qbapi = require('./server/mocks/quickbot-api');
        }
        return qbapi;
    }]);

    mean.run(['mean.app', function(app) {
        app.use('/motors/public', express.static(path.join(__dirname, '/public')));
    }]);

    routes(mean);

    mean.run(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('motors');
        pageBuilder.aggregateScript(__dirname + '/public/controllers.js');
        pageBuilder.aggregateScript(__dirname + '/public/routes.js');
    }]);

};
