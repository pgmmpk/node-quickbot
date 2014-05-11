var config = require('../config');

require('../robot/qb')(config, function(err, qb) {

    if (err) {
        return console.log('ERROR:', err);
    }

    qb.start();

    setInterval(function() {
        qb.onTimer();
    }, 10);

    qb.setSpeed(40, 0);
});
