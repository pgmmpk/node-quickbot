var config = require('../config');

var status = undefined;
var qb = undefined;

require('./qb')(config, function(err, qb_) {
    status = 'Initializing QuickBot...';

    if (err) {
        status = 'ERROR: ' + err;
        return;
    }

    qb = qb_;
    qb.start();
    setInterval(qb.onTimer, 10);
});

module.exports.setSpeed = function(speed_left, speed_right) {
    console.log('setSpeed:', speed_left, speed_right);
    qb.setSpeed(speed_left, speed_right);
};

module.exports.ticks = function() {

    return qb.getTicks();
};

module.exports.ir_distance = function() {
    return qb.getIrDistance();
};

module.exports.ir_raw = function() {
    return qb.getIr();
};

module.exports.motors = function() {
    return qb.motors;
};

module.exports.sensors = function() {
    return qb.sensors;
};

