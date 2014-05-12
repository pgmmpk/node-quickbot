
var DT = 0.05;
var ALPHA = 1.0;

function Helper(speed_sensor, ticks_sensor, Kp, Ki, integral_limit) {

    if (Kp === undefined) {
        Kp = 1.6;
    }

    if (Ki === undefined) {
        Ki = 0.2;
    }

    if (integral_limit === undefined) {
        integral_limit = 300.0;
    }

    var pid = require('./pid').PID(Kp, Ki, 0, 0, integral_limit);
    var direction = 0;
    var last_ticks = undefined;
    var predicted_speed = 0;

    var helper = {
        torque: 0,
        computed_torque: 0,
        reference_speed: 0,
        ticks: 0,
        speed: 0
    };

    helper.run = function(speed) {
        helper.reference_speed = speed;
    };

    helper.onTimer = function() {
        helper.computed_torque = helper.torque = pid(helper.reference_speed - helper.speed);

        var ticks = ticks_sensor();
        var speed = speed_sensor();

        if (last_ticks === undefined) {
            last_ticks = ticks;
            return;
        }

        var old_predicted_speed = predicted_speed;
        predicted_speed += DT * (helper.torque * direction - predicted_speed + ALPHA * (speed - predicted_speed));
        if (direction !== 0 && (old_predicted_speed * predicted_speed < 0 || (predicted_speed > 0 && predicted_speed < 1))) {
            direction = 0;
            helper.speed = 0;
        } else if (direction === 0 && predicted_speed > 1) {
            direction = helper.torque > 0 ? 1 : -1;
        }

        var delta_ticks = ticks - last_ticks;
        helper.ticks += direction * delta_ticks;
        helper.speed = direction * speed;
        last_ticks = ticks;
    };

    return helper;
}


function BotController(config, callback) {

    require('./motors')(config, function(err, motors) {

        if (err) {
            return callback(err);
        }

        require('./sensors')(config, function(err, sensors) {

            if (err) {
                return callback(err);
            }

            var left = Helper(function() { return sensors.speed_left; }, function() { return sensors.enc_ticks_left; });
            var right = Helper(function() { return sensors.speed_right; }, function() { return sensors.enc_ticks_right; });

            var bot = {};

            bot.start = function() {
                sensors.start();
            };

            bot.stop = function(cb) {
                async.parallel([
                    motors.close,
                    sensors.stop
                ], cb);
            };

            bot.onTimer = function(cb) {
                sensors.read();
                left.onTimer();
                right.onTimer();
                motors.run(left.torque, right.torque, cb);
            };

            bot.run = function(speed_left, speed_right) {
                left.run(speed_left);
                right.run(speed_right);
            };

            bot.ticks = function() {
                return [left.ticks, right.ticks];
            };

            bot.actualSpeed = function() {
                return [left.speed, right.speed];
            };

            bot.timer = function() {
                return sensors.timer;
            };

            bot.values = function() {
                return sensor.values();
            };

            bot.motors = motors;
            bot.sensors = sensors;

            callback(null, bot);
        });
    });
}

module.exports = BotController;
