module.exports = function(meany) {

    meany.configure(['meany.app', 'qbapi', 'sockets', function(app, qbapi, sockets) {
        
        console.log('Sockets:', sockets.sockets);
        sockets.sockets.on('connect', function(sock) {
            console.log('Connected');
            sock.on('message', function() {
                console.log('Received message');
            });
        });
    }]);
};