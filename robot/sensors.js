var bs = require('bonescript'),
    pruadc = require('pru-adc');

var TIMETICKS_PER_SECOND = 121000;

function Sensors(config, callback) {

    pruadc(function(err, adc) {

        if (err) {
            return callback(err);
        }

        adc.encoder0Pin(config.MOTOR_LEFT.encoder_pin);
        adc.encoder1Pin(config.MOTOR_RIGHT.encoder_pin);
        adc.encoder0Threshold(config.MOTOR_LEFT.encoder_threshold);
        adc.encoder1Threshold(config.MOTOR_RIGHT.encoder_threshold);
        adc.encoder0Delay(config.MOTOR_LEFT.encoder_delay);
        adc.encoder1Delay(config.MOTOR_RIGHT.encoder_delay);
        adc.emaPow(config.EMA_POW);

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
            sensors.enc_ticks_left = adc.encoder0Ticks();
            sensors.enc_ticks_right = adc.encoder1Ticks();
            sensors.speed_left = TIMETICKS_PER_SECOND / (adc.encoder0Speed() + 1.0);
            sensors.speed_right = TIMETICKS_PER_SECOND / (adc.encoder1Speed() + 1.0);

            var v = adc.values();

            sensors.values = ir_pins.map(function(x) {
                return v[x] / scale;
            });
        };

	sensors.adc = adc;

        callback(null, sensors);
    });

}

module.exports = Sensors;
