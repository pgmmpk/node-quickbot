module.exports = function(meany) {

    meany.configure(['meany.app', 'qbapi', function(app, qbapi) {
        var motors;
    
        app.route('/api/motors/run').post(function(req, res) {
            var torqueLeft = +req.body.torqueLeft;
            var torqueRight = +req.body.torqueRight;

            function runMotors() {
                motors.run(torqueLeft, torqueRight);
                return res.json({status: 'OK'});
            }

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
        });
    }]);
};