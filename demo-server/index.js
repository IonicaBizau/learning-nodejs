require("http").createServer(function (req, res) {
    res.end("Hello World");
}).listen(process.env.PORT || 8081);
