var config = require('../config'),
    motors = require('../robot/motors').Motors(config),
    pruadc = require('pru-adc');

pruadc(function(err, adc) {
		if (err) {
			console.log('ERROR:', err);
			return;
		}

		console.log(adc);

adc.encoder0Pin(config.MOTOR_LEFT.encoder_pin);
adc.encoder1Pin(config.MOTOR_RIGHT.encoder_pin);
adc.encoder0Threshold(4096);
adc.encoder1Threshold(4096);
adc.start();

motors.run(60, 60);

setTimeout(function() {
    motors.close();

    var enc0Values = adc.encoder0Values();
    var enc0Range = enc0Values[2] - enc0Values[1];  // max - min
    var enc1Values = adc.encoder1Values();
    var enc1Range = enc1Values[2] - enc1Values[1];  // max - min

    var enc0Threshold = Math.round(enc0Range * 0.9);
    var enc1Threshold = Math.round(enc1Range * 0.9);

    console.log('Range (left):', enc0Range, 'recommended threshold:', enc0Threshold);
    console.log('Range (right wheel):', enc1Range, 'recommended threshold:', enc1Threshold);
}, 2000);
});
