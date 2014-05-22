var path = require('path'),
    express = require('express'),
    routes = require('./server/routes');

module.exports = function(mean) {

    mean.run(['mean.app', 'sockets', function(app, sockets) {
        app.use('/sensors/public', express.static(path.join(__dirname, '/public')));

        var timer;
        var count = 0;
        
        sockets.on('connection', function(socket) {
            
            if (timer !== undefined) {
                socket.emit('You are not the first :(');
            }
            
            timer = setInterval(function() {
                socket.emit('heartbeat', {heartbeat: count++});
            }, 2000);
            
            socket.on('disconnect', function() {
                clearInterval(timer);
            });
            
            socket.on('ping', function(data) {
                console.log(data.ping);
            });
        });
    }]);

    //routes(mean);

    mean.run(['mean.pageBuilder', function(pageBuilder) {
        pageBuilder.addAngularModule('sensors');
        pageBuilder.aggregateScript(__dirname + '/public/app.js');
        pageBuilder.addScriptUrl('//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js');

        pageBuilder.addMenu({link: 'sensors', title: 'Sensors'});
    }]);

};
