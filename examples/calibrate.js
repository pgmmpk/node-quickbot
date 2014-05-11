var config = require('../config'),
    motors = require('../robot/motors').Motors(config),
    pruadc = require('pru-adc');

var adc = pruadc();

adc.encoder0_pin(config.MOTOR_LEFT.encoder_pin);
adc.encoder1_pin(config.MOTOR_RIGHT.encoder_pin);
adc.encoder0_threshold(4096);  // unreachable
adc.encoder1_threshold(4096);

motors.run(60, 60);

setTimeout(function() {
    motors.close();

    console.log(adc.encoder0_values());
    console.log(adc.encoder1_values());
}, 2000);