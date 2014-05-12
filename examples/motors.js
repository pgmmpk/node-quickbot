var config = require('../config');

require('../robot/motors')(config, function(err, motors) {
    if (err) {
        return console.log('ERROR:', err);
    }

    console.log("motors...", motors);

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

});
