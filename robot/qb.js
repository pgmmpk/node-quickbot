function QB(config, callback) {

    require('./controller')(config, function(err, bot) {

        if (err) {
            return callback(err);
        }

        var ticks_origin_left = 0;
        var ticks_origin_right = 0;
        var ir_calibration = config.IR_CALIBRATION;

        var qb = {

        };

        qb.start = function() {
            bot.start();
        };

        qb.stop = function() {
            bot.stop();
        };

        qb.onTimer = function() {
            bot.onTimer();
        };

        qb.setSpeed = function(speed_left, speed_right) {
            bot.run(speed_left, speed_right);
        };

        qb.getIr = function() {
            return bot.values();
        };

        qb.getIrDistances = function() {

            return bot.values().map(function(v) {
                return ir_calibration / v;
            });
        };

        qb.getTicks = function() {
            var t = bot.ticks();
            return [t[0] - ticks_origin_left, t[1] - ticks_origin_right];
        };

        qb.resetTicks = function() {
            var t = bot.ticks();
            ticks_origin_left = t[0];
            ticks_origin_right = t[1];
        };

        qb.getSpeed = function() {
            return bot.actual_speed;
        };

        qb.motors = bot.motors;

        qb.sensors = bot.sensors;

        callback(null, qb);
    });
}

module.exports = QB;
