
function PID(Kp, Ki, Kd, x0, integral_limit) {
    
    if (Ki === undefined) {
        Ki = 0;
    }
    
    if (Kd === undefined) {
        Kd = 0;
    }

    if (x0 == undefined) {
        x0 = 0;
    }

    if (integral_limit === undefined) {
        integral_limit = 10.0;
    }

    var x_prev = x0;
    var acc = 0.0;

    return function(x) {
        acc += x;

        // anti-saturation logic: do not allow acc to grow too large
        if (acc > integral_limit) {
            acc = integral_limit;
        } else if(acc < -integral_limit) {
            acc = -integral_limit;
        }

        var out = Kp * x + Ki * acc + Kd * (x - x_prev);
        x_prev = x;

        return out;
    };
}

module.exports.PID = PID;
