// require Johnny's static
var JohnnysStatic = require("johnnys-node-static"),
    http = require('http');


// set static server: public folder
JohnnysStatic.setStaticServer({root: "./public"});

// set routes
JohnnysStatic.setRoutes({ "/": { "url": "/html/index.html" } });

// create http server
var server = http.createServer(function(req, res) {
    console.log(">>>");
    // safe serve
    if (JohnnysStatic.exists(req, res)) {
        // serve file
        JohnnysStatic.serve(req, res, function (err) {
            // not found error
            if (err.code === "ENOENT") {
                res.end("404 - Not found.");
                return;
            }

            // other error
            res.end(JSON.stringify(err));
        });
        return;
    }

    // serve file
    JohnnysStatic.serveAll(req, res, function(err, result) {
        // check for error
        if (err) {
            res.writeHead(err.status, err.headers);
            res.end();
        } else {
            console.log('%s - %s', req.url, result.message);
        }
    });
});

// Socket.io server listens to our app
var io = require('socket.io').listen(server);

// Send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 10000);

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    console.log(">>>> Welcome");
    socket.emit('welcome', { message: 'Welcome!' });
    socket.on('i am client', console.log);
});

server.listen(3000);
