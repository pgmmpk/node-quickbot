var io = require('socket.io');

module.exports = function(mean) {

    mean.factory('sockets', ['mean.server', function(server) {
        return io.listen(server).sockets;
    }]);
};