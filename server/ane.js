
var toAggregate = {
    js: [],
    css: [],
    seen: {}
};

var aggregated;

var angularModules = [];

function finalizeAggregation() {
    var filecontents = toAggregate.js.map(function(path) {
        return fs.readFileSync(path);
    });

    var angularDependencies = JSON.stringify(angularDependencies);
    var template = '(function(angular){ angular.module("ane", [{dependencies}]); })(angular)';
    filecontents.push(template.replace(/\{dependencies\}/, angularDependencies));

    aggregated = filecontents.join('\n');
}

var pageBuilder = {

    addScriptUrl: function(url) {
        scripts.push(url);
    },

    aggregateScript: function(filename) {
        toAggregate.js.push(filename);
    },

    aggregateCss: function(filename) {
        toAggregate.css.push(filename);
    },

    addAngularModule: function(moduleName) {
        angularModules.push(moduleName);
    }
};
