var config = require('../config'),
    qb     = require('./qb').QB(config);

    qb.start();

module.exports = {

    speed: function(val) {
        if (val === undefined) {
            return qb.get_speed();
        } else {
            qb.set_speed(val.speed_left, val.speed_right);
        }
    },

    ticks: function() {
        return qb.get_ticks();
    },

    ir_distance: function() {
        return qb.ir_distance();
    },

    ir_raw: function() {
        return qb.get_ir();
    },

    motors: qb.motors,

    sensors: qb.sensors
};
