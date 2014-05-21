var jade = require('jade'),
    fs   = require('fs');

module.exports = function(app) {

    var page;
    var aggregatedJs;
    var pageTitle = 'MEAN APE';
    var scripts = [];
    var filesToAggregate = [];
    var angularModules = [];

    app.get('/ane/modules-aggregated.js', function(req, res) {
        
        if (aggregatedJs === undefined) {
            aggregatedJs = aggregateJsFiles(); 
        }

        res.setHeader('Content-type', 'application/javascript');
        res.send(aggregatedJs);
    });

    var pageBuilder = function(req, res) {
        if (page === undefined) {
            page = jade.renderFile(__dirname + '/views/index.jade', {
                pretty: true,
                title: pageTitle,
                scripts: scripts,
                angularModules: JSON.stringify(angularModules)
            });
        }

        res.setHeader('Content-type', 'text/html');
        res.send(page);
    };
    
    pageBuilder.title = function(value) {
        if (value === undefined) {
            return pageTitle;
        } else {
            pageTitle = value;
            return pageBuilder;
        }
    };
    
    pageBuilder.addScriptUrl = function(url) {
        if (page !== undefined) {
            throw new Error('Page is already finalized');
        }
        scripts.push(url);
        return pageBuilder;
    };

    pageBuilder.aggregateScript = function(filename) {
        if (aggregatedJs !== undefined) {
            throw new Error('Aggregation was already finalized');
        }
        filesToAggregate.push(filename);
        return pageBuilder;
    };
    
    function aggregateJsFiles() {
        var filecontents = filesToAggregate.map(function(path) {
            return fs.readFileSync(path);
        });

        return filecontents.join('\n');
    }

    pageBuilder.addAngularModule = function(moduleName) {
        if (page !== undefined) {
            throw new Error('Page was already finalized');
        }
        angularModules.push(moduleName);
        return pageBuilder;
    };

    return pageBuilder;
};
