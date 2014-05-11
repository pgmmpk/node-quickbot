module.exports = {
    
    // port for HTTP server to listen on
    PORT: 3000,

    MOTOR_LEFT: {
        'dir1': 'P8_14',
        'dir2': 'P8_16',
        'pwm' : 'P9_16',

        'encoder_pin'      : 0,  // AIN0
        'encoder_threshold': 3000,  // calibrated!
        'encoder_delay'    : 50
    },

    MOTOR_RIGHT: {
        'dir1': 'P8_12',
        'dir2': 'P8_10',
        'pwm' : 'P9_14',

        'encoder_pin'      : 2,  // AIN2
        'encoder_threshold': 2500,  // calibrated!
        'encoder_delay'    : 50
    },

    IR_PINS: [3, 1, 5, 6, 4],  // AIN3, AIN1, AIN5, AIN6, AIN4

    EMA_POW: 11,  // 2**EMA_POW is the averaging time of IR readings (in ADC timer ticks)
                  // ADC timer runs at about 120000 ticks per second

    // IR sensor calibration constants (see fit.py)
    IR_CALIBRATION = [
        [36.702127659574444, 3995.4255319148942, 1.085106382978724],
        [99.732495511669754, 3262.2980251346507, 0.66786355475763237],
        [-203.41628959275999, 3627.8959276018086, 1.642533936651585],
        [-99.883802816901323, 3060.5915492957743, 0.58098591549295753],
        [-224.55972696245738, 4294.4436860068263, 1.3310580204778155],
    ],

    // Controller parameters
    GO_STRAIGHT: {
        'speed': 40.0,  // how fast do we go?
        'distance_threshold': 7.0  // when do we flag head-on obstacle?
    },

    AVOID_COLLISION = {
        'speed': 40.0,  // how fast do we "jump back"?
        'distance_threshold': 10.0  // at what distance do we stop backtracking?
    },

    FIND_NEW_DIRECTION = {
        'speed': 40.0,  // how fast do we rotate?
        'pause_duration': 10, // how many controller ticks do we stay still?
        'move_duration': 10, // how many controller ticks do we rotate?
        'distance_threshold': 15.0 // if no object closer than this, declare direction "clear"
    }
}
