module.exports = function(mean) {

    // pull in the quickbot-api package (required dependency)
    mean.factory('qbapi', [function() {
        var qbapi;
        try {
            qbapi = require('quickbot-api');
        } catch(ex) {
            console.log('USING MOCK qbapi');
            qbapi = require('./mocks/quickbot-api');
        }
        return qbapi;
    }]);
    
    //require('./packages/socketio')(mean);

    // bootstrap packages
    require('./packages/motors')(mean);
    require('./packages/sensors')(mean);
    require('./packages/adc')(mean);
    
    // configure page title
    mean.run(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.title('QuickBot o^o');
    }]);

};