var bs = require('bonescript'),
    async = require('async');


function Motor(pwm_pin, dir1_pin, dir2_pin, callback) {

    var speed = 0.0;

    function writeMotorPins(dir1, dir2, pwm, callback) {

        async.parallel([
	
            bs.digitalWrite.bind(null, dir1_pin, dir1),
        
            bs.digitalWrite.bind(null, dir2_pin, dir2),
        
            bs.analogWrite.bind(null, pwm_pin, pwm, undefined)
        
        ].map(function(func) {

            return function(cb) {

                func(function(result) {
                    if (result && result.err) {
                        return cb(result.err);
                    }

                    cb(null);                
                });
            };
        
        }), callback);
    }

    var motor = {

        close: function(cb) {
            writeMotorPins(0, 0, 0, cb);
        },

        run: function(speed, cb) {
            if (speed > 0) {
                writeMotorPins(0, 1, speed > 100.0 ? 1.0 : speed / 100.0, cb);
            } else if (speed < 0) {
                writeMotorPins(1, 0, speed < -100.0 ? 1.0 : -speed / 100.0, cb);
            } else {
                writeMotorPins(0, 0, 0);
            }
        }
    };

    async.parallel([

        bs.pinMode.bind(null, dir1_pin, bs.OUTPUT, undefined, undefined, undefined),
        bs.pinMode.bind(null, dir2_pin, bs.OUTPUT, undefined, undefined, undefined),
        bs.pinMode.bind(null, pwm_pin, bs.OUTPUT, undefined, undefined, undefined)

    ].map(function(func) {

        return function(cb) {
            func(function(result) {
                if (result.err) {
                    return cb(result.err);
                }

                cb(null, 1);
            });
        };

    }), function(err) {
        if (err) {
            return callback(err);
        }

        callback(null, motor);
    });
};


/**
 * On success, callback is called as:
 *
 *      callback(null, motors);
 *
 * where "motor" is an object with methods:
 *  - run(speed_left, speed_right, callback);
 *  - close(callback);
 */
function Motors(config, callback) {


    async.parallel({
    
        motor_left : Motor.bind(null, config.MOTOR_LEFT.pwm, config.MOTOR_LEFT.dir1, config.MOTOR_LEFT.dir2),
    
        motor_right: Motor.bind(null, config.MOTOR_RIGHT.pwm, config.MOTOR_RIGHT.dir1, config.MOTOR_RIGHT.dir2)
    
    }, function(err, result) {


        if (err) {
            return callback(err);
        }

        callback(null, {
            run: function(pwm_left, pwm_right, cb) {

                async.parallel([
                    result.motor_left.run.bind(null, pwm_left),
                    result.motor_right.run.bind(null, pwm_right)
                ], cb);
            },

            close: function(cb) {

                async.parallel([
                    result.motor_left.close,
                    result.motor_right.close
                ], cb);
            }
        });
    });
}

module.exports = Motors;
