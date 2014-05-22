var jade = require('jade'),
    fs   = require('fs');

module.exports = function(app) {

    var page;
    var aggregatedJs;
    var filesToAggregate = [];
    var vars = {
        title: 'MEAN APE',
        scripts: [],
        angularModules: [],
        menus: [],
        pretty: true
    };

    app.get('/ane/modules-aggregated.js', function(req, res) {
        
        if (aggregatedJs === undefined) {
            aggregatedJs = aggregateJsFiles(); 
        }

        res.setHeader('Content-type', 'application/javascript');
        res.send(aggregatedJs);
    });

    var pageBuilder = function(req, res) {
        if (page === undefined) {
            vars.angularModules = JSON.stringify(vars.angularModules);
            page = jade.renderFile(__dirname + '/views/index.jade', vars);
        }

        res.setHeader('Content-type', 'text/html');
        res.send(page);
    };
    
    pageBuilder.title = function(value) {
        if (value === undefined) {
            return vars.title;
        } else {
            vars.title = value;
            return pageBuilder;
        }
    };
    
    pageBuilder.addScriptUrl = function(url) {
        if (page !== undefined) {
            throw new Error('Page is already finalized');
        }
        vars.scripts.push(url);
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
        vars.angularModules.push(moduleName);
        return pageBuilder;
    };

    pageBuilder.addMenu = function(menu) {
        if (page !== undefined) {
            throw new Error('Page was already finalized');
        }
        vars.menus.push(menu);
        return pageBuilder;
    };

    return pageBuilder;
};
