var bs = require('bonescript');

function Motor(pwm_pin, dir1_pin, dir2_pin) {

    var speed = 0.0;

    bs.pinMode(pwm_pin, bs.OUTPUT);
    bs.pinMode(dir1_pin, bs.OUTPUT);
    bs.pinMode(dir2_pin, bs.OUTPUT);

    var motor = {

        close: function() {
            bs.analogWrite(pwm_pin, 0.0);
        },

        run: function(speed) {
            if (speed > 0) {
                bs.digitalWrite(dir1_pin, 0);
                bs.digitalWrite(dir2_pin, 1);
                bs.analogWrite(pwm_pin, speed > 100.0 ? 1.0 : speed / 100.0);
            } else if (speed < 0) {
                bs.digitalWrite(dir1_pin, 1);
                bs.digitalWrite(dir2_pin, 0);
                bs.analogWrite(pwm_pin, speed < -100.0 ? 1.0 : -speed / 100.0);
            } else {
                bs.digitalWrite(dir1_pin, 0);
                bs.digitalWrite(dir2_pin, 0);
                bs.analogWrite(pwm_pin, 0);
            }

            return motor;
        }
    };

    return motor;
};

function Motors(config) {

    var motor_left = Motor(config.MOTOR_LEFT.pwm, config.MOTOR_LEFT.dir1, config.MOTOR_LEFT.dir2);
    var motor_right = Motor(config.MOTOR_RIGHT.pwm, config.MOTOR_RIGHT.dir1, config.MOTOR_RIGHT.dir2);

    return {
        run: function(pwm_left, pwm_right) {
            motor_left.run(pwm_left);
            motor_right.run(pwm_right);
        },

        close: function() {
            motor_left.close();
            motor_right.close();
        }
    };
}

module.exports = {
    'Motor' : Motor,
    'Motors': Motors
};
