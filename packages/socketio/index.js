var io = require('socket.io');

module.exports = function(meany) {

    meany.factory('sockets', ['meany.server', function(server) {
        return io.listen(server).sockets;
    }]);
};