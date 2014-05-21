var injector = require('./injector');

module.exports = function(mean) {

    // bootstrap packages
    require('../packages/motors')(mean);
    require('../packages/adc')(mean);

};