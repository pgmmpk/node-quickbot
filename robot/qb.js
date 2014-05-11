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

        qb.on_timer = function() {
            bot.on_timer();
        };

        qb.set_speed = function(speed_left, speed_right) {
            bot.run(speed_left, speed_right);
        };

        qb.get_ir = function() {
            return bot.values();
        };

        qb.get_ir_distances = function() {

            return bot.values().map(function(v, index) {
                var c = ir_calibration[index];

                return distance(c[0], c[1], c[2], v);
            });
        };

        qb.get_ticks = function() {
            var t = bot.ticks();
            return [t[0] - ticks_origin_left, t[1] - ticks_origin_right];
        };

        qb.reset_ticks = function() {
            var t = bot.ticks();
            ticks_origin_left = t[0];
            ticks_origin_right = t[1];
        };

        qb.get_speed = function() {
            return bot.actual_speed;
        };

        qb.motors = bot.motors;

        qb.sensors = bot.sensors;

        callback(null, qb);
    });
}

module.exports = QB;
