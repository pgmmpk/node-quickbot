var path = require('path');

module.exports = function(mean) {

    mean.app.route('/motors').get(mean.renderHome);

    mean.static('/motors/public', path.join(__dirname, '/public'));
    
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

    var aggregate = {
        'js': ['public/controllers.js', 'public/routes.js']
    }

    mean.aggregate(__dirname, aggregate);
};
