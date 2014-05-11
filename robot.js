module.exports = {

    speed: function(val) {
        if (val === undefined) {
            return {
                speed_left: 40,
                speed_right: 41
            };
        } else {

        }
    },

    ticks: function() {
        return {
            ticks_left: 102345,
            ticks_right: 233435
        };
    },

    ir_distance: function() {
        return [
            100,
            100,
            100,
            100,
            100
        ];
    },

    ir_raw: function() {
        return [
            30,
            30,
            30,
            30,
            30
        ];
    },

    motors: {
        run: function(vals) {
            console.log('MOCK robot.motors.run', vals);
        }
    },

    sensors: {

        encoder0_values: function() {
            console.log('MOCK encoder0_values');
            return [0, 0, 0, 0];
        },

        encoder1_values: function() {
            console.log('MOCK encoder1_values');
            return [0, 0, 0, 0];
        }
    }
};
