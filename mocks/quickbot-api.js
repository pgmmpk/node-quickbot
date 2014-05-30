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
        var s = {
            timer: 1010,
            ticksLeft: 123,
            ticksRight: 456,
            speedLeft: 20.2,
            speedRight: 22.1,
            values: [25, 56, 54, 78, 50]
        };
        
        s.start = function() {
            console.log('MOCK sensors.start()');
        };
        
        s.read = function() {
            console.log('MOCK sensors.read()');
            s.timer ++;
            if (s.timer % 100 === 0) {
                s.ticksLeft ++; 
                s.speedLeft = Math.random() * 30.0;
            }
            if (s.timer % 150 === 0) {
                s.ticksRight ++;
                s.speedRight = Math.random() * 20.0;
            }
            
            if (s.timer % 50 === 0) {
                s.values[0] = Math.floor(Math.random() * 1000);
                s.values[1] = Math.floor(Math.random() * 1000);
                s.values[2] = Math.floor(Math.random() * 1000);
                s.values[3] = Math.floor(Math.random() * 1000);
                s.values[4] = Math.floor(Math.random() * 1000);
            }
        };
        
        s.stop = function() {
            console.log('MOCK sensors.stop()');
        };

        callback(null, s);
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
