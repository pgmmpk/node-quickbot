var fs = require('fs'),
    path = require('path'),
    injector = require('./injector');

module.exports = function(app, pageBuilder) {

    var mean = {
        run: function(injectable) {
            injector.inject(injectable);
        },
        
        constant: injector.constant,

        factory: injector.factory
    };

    injector.constant('mean', mean);
    injector.constant('mean.app', app);
    injector.constant('mean.pageBuilder', pageBuilder);

    // bootstrap packages
    fs.readdirSync(path.join(__dirname, '../packages')).forEach(function(pkg) {
        console.log(pkg);
        require('../packages/' + pkg)(mean);
    });

};