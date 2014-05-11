var config = require('../config');

require('../robot/qb')(config, function(err, qb) {

    if (err) {
        return console.log('ERROR:', err);
    }

    qb.start();

    setInterval(qb.onTimer, 100);

    qb.setSpeed(30, 30);

    setTimeout(function() {
        qb.stop();
    }, 2000);
});
