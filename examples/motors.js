var config = require('../config'),
    motors = require('../robot/motors').Motors(config);

motors.run(60, 0);
console.log('LEFT motor running forward');

setTimeout(function() {
    motors.run(0, 60);
    console.log('RIGHT motor running forward');

    setTimeout(function() {
        motors.close();
        console.log('All done');
    }, 2000);
    
}, 2000);

