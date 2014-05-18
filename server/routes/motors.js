var api = require('quickbot-api');

module.exports = function(app) {

	var motors = undefined;

	app.route('/motors/run').post(function(req, res) {
		var torqueLeft = +req.body.torqueLeft;
		var torqueRight = +req.body.torqueRight;
		
		if (!motors) {
			api.motors(api.defaultConfig, function(err, m) {
				if (err) {
					console.log("Failed to init motors:", err);
					return res(500);
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
};