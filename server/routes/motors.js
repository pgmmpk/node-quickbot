module.exports = function(app, qbapi) {

	var motors = undefined;

	app.post('/api/motors/run', function(req, res) {
		var torqueLeft = +req.body.torqueLeft;
		var torqueRight = +req.body.torqueRight;
		
		if (!motors) {
			qbapi.motors(qbapi.defaultConfig, function(err, m) {
				if (err) {
					console.log("Failed to init motors:", err);
					return res.send(500);
				}

				motors = m;
				motors.run(torqueLeft, torqueRight);
				return res.json({status: 'OK'});
			});
		} else {
			motors.run(torqueLeft, torqueRight);
			return res.json({status: 'OK'});
		}
	});
	
	app.get('/motors', function(req, res) {
	    res.render('motors/index');
	});
};