var bs = require('bonescript'),
    pruadc = require('pru-adc');

var TIMETICKS_PER_SECOND = 121000;

function Sensors(config, callback) {

    pruadc(function(err, adc) {

        if (err) {
            return callback(err);
        }

        adc.encoder0_pin(config.MOTOR_LEFT.encoder_pin);
        adc.encoder1_pin(config.MOTOR_RIGHT.encoder_pin);
        adc.encoder0_threshold(config.MOTOR_LEFT.encoder_threshold);
        adc.encoder1_threshold(config.MOTOR_RIGHT.encoder_threshold);
        adc.encoder0_delay(config.MOTOR_LEFT.encoder_delay);
        adc.encoder1_delay(config.MOTOR_RIGHT.encoder_delay);
        adc.ema_pow(config.EMA_POW);

        var ir_pins = config.IR_PINS;
        var scale = Math.pow(2, config.EMA_POW);

        var sensors = {
            timer: 0,
            speed_left: 0,
            speed_right: 0,
            enc_ticks_left: 0,
            enc_ticks_right: 0,
            values: ir_pins.map(function() { return 0.0; })
        };

        sensors.start = function() {
                adc.start();
        };

        sensors.stop = function() {
                adc.stop();
        };

        sensors.read = function() {

            sensors.timer = adc.timer();
            sensors.enc_ticks_left = adc.encoder0_ticks();
            sensors.enc_ticks_right = adc.encoder1_ticks();
            sensors.speed_left = adc.encoder0_speed() / (TIMETICKS_PER_SECOND + 1.0);
            sensors.speed_right = adc.encoder1_speed() / (TIMETICKS_PER_SECOND + 1.0);

            var v = adc.values();

            sensors.values = ir_pins.map(function(x) {
                return v[x] / scale;
            });
        };

        callback(null, sensors);
    });

}

module.exports = Sensors;
