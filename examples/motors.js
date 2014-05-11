var config = require('../config'),
    bs = require('bonescript'),
    motors = require('../robot/motors').Motors(config);


motors.run(60, 60);

setTimeout(function() {
    motors.close();
}, 2000);

