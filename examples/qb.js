var config = require('../config');

require('../robot/qb')(config, function(err, qb) {

    if (err) {
        return console.log('ERROR:', err);
    }

    qb.start();

    var worker = setInterval(function() {
        qb.onTimer();
    }, 10);

    qb.setSpeed(60, 60);

    setTimeout(function() {
	qb.setSpeed(0, 0);
	setTimeout(function() {
	    clearInterval(worker);
	}, 1000);
    }, 2000);
});
