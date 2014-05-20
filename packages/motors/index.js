var path = require('path'),
    express = require('express');

module.exports = function(mean) {

    mean.app.route('/motors').get(mean.renderHome);

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

    mean.aggregate(__dirname, {
        'js': ['public/controllers.js', 'public/routes.js']
    });
    
    mean.angularDependencies('motors');

    mean.resolveAngularModules({
        'ui-router': '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min.js',
        'pgmmpk-shortcuts': '//pgmmpk.github.io/shortcuts/shortcuts.min.js'
    });

};
