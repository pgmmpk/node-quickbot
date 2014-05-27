module.exports = function(meany) {

    // pull in the quickbot-api package (required dependency)
    meany.factory('qbapi', [function() {
        var qbapi;
        try {
            qbapi = require('quickbot-api');
        } catch(ex) {
            console.log('USING MOCK qbapi');
            qbapi = require('./mocks/quickbot-api');
        }
        return qbapi;
    }]);
    
    require('./packages/socketio')(meany);

    // bootstrap packages
    require('./packages/motors')(meany);
    require('./packages/sensors')(meany);
    require('./packages/adc')(meany);

    // configure page title
    meany.configure(['meany.pageBuilder', function(pageBuilder) {
        pageBuilder.title('QuickBot o^o');
    }]);

};