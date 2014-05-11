var config = require('../config'),
    motors = require('../robot/motors').Motors(config);


motors.start();
motors.run(50, 50);

setTimeout(function() {
    motors.run(0, 0);
    motors.close();
}, 2000);