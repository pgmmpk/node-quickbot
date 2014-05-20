module.exports = ['mean', 'qbapi', function(mean, qbapi) {
    console.log(qbapi);
    var motors = undefined;

    mean.app.route('/api/motors/run').post(function(req, res) {
        var torqueLeft = +req.body.torqueLeft;
        var torqueRight = +req.body.torqueRight;

        if (!motors) {
            qbapi.motors(qbapi.defaultConfig, function(err, m) {
                if (err) {
                    console.log("Failed to init motors:", err);
                    return res.send(500);
                }

                motors = m;

                runMotors();
            });
        } else {
            runMotors();
        }

        function runMotors() {
            motors.run(torqueLeft, torqueRight);
            return res.json({status: 'OK'});
        }
    });
}];
