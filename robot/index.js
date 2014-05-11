var config = require('../config');

function QbService(config, callback) {

    require('./qb')(config, function(err, qb) {

        if (err) {
	    return collabck(err);
	}

        qb.start();
        var worker = setInterval(qb.onTimer, 10);

	var service = {};

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

	callback(null, service);
});

