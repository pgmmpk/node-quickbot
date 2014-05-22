module.exports = {
    defaultConfig: {},

    motors: function(config, callback) {
        callback(null, {
            run: function(torqueLeft, torqueRight) {
                console.log('MOCK robot.motors.run', torqueLeft, torqueRight);
            }
        });
    },

    sensors: function(config, callback) {
        callback(null, {
            start: function() {
                console.log('MOCK sensors.start()');
            },
            stop: function() {
                console.log('MOCK sensors.stop()');
            },
            read: function() {
                console.log('MOCK sensors.read()');
            },
            timer: 1010,
            ticksLeft: 123,
            ticksRight: 456,
            speedLEft: 20.2,
            speedRight: 22.1,
            values: [25, 56, 54, 78, 50]
        });
    },

    qb: function(config, callback) {
        var ticks = 0;
        callback(null, {
            start: function() {
                console.log('MOCK qb.start()');
                ticks = 0;
            },
            stop: function() {
                console.log('MOCK qb.stop()');
            },
            onTimer: function() {
                ticks += 1;
            },
            run: function(speedLeft, speedRight) {
                console.log('MOCK qb.run: ', speedLeft, speedRight);
            },
            irDistances: function() {
                console.log('MOCK qb.irDistances');
                return [0, 1, 2, 3, 4];
            },
            ticks: function() {
                console.log('MOCK qb.ticks()');
                return [123, 456];
            },
            resetTicks: function() {
                console.log('MOCK qb.resetTicks()');
            },
            speed: function() {
                console.log('MOCK qb.speed()');
                return [1.5, 1.6];
            }
        });
    },
};
