var http = require("http");
var static = require('node-static');
var sockjs = require('sockjs');

// Sockjs part
var echo = sockjs.createServer();
echo.on('connection', function(conn) {
    conn.on('data', function(message) {
        conn.write(message);
    });
    conn.on('close', function() {});
});

// Node static: public_html folder
var file = new(static.Server)('./public');

// Create server
var srv = http.createServer(function(req, res){
    file.serve(req, res);
});
srv.listen(8080);
echo.installHandlers(srv, {prefix:'/echo'});
