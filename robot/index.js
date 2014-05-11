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

function ensureLoaded() {
    if (qb === undefined) {
        throw new Error(status);
    }
}

module.exports = {

    service.speed = function(val) {
        if (val === undefined) {
            return qb.getSpeed();
        } else {
            qb.setSpeed(val.speed_left, val.speed_right);
        }
    };

    service.ticks = function() {

        return qb.getTicks();
    };

    service.ir_distance = function() {
        return qb.getIrDistance();
    };

    service.ir_raw = function() {
        return qb.getIr();
    };

    service.motors = qb.motors;

    service.sensors = qb.sensors;
};

