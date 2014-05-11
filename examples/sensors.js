
var config = require('../config');

require('../robot/sensors')(config, function(err, sensors) {

    if (err) {
        return console.log('ERROR:', err);
    }

    sensors.start();

    sensors.read();

    var timer = sensors.timer;
    var ticks_left = sensors.enc_ticks_left;
    var ticks_right = sensors.enc_ticks_right;

    setInterval(ontimer, 100);

    function ontimer() {
        sensors.read();

        if (ticks_left != sensors.enc_ticks_left || ticks_right != sensors.enc_ticks_right) {
            ticks_left = sensors.enc_ticks_left;
            ticks_right = sensors.enc_ticks_right;

            console.log(ticks_left, ticks_right, sensors.speed_left, sensors.speed_right);
        }
    }
});
