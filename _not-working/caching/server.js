// Dependencies
var Http = require("http")

// Constants
const CACHE_SIZE = 100;

// Last modified
var lastMod = new Date();

// Create server
Http.createServer(function (req, res) {

    var mtime = lastMod
      , clientETag = req.headers["if-none-match"]
      , clientMTime = Date.parse(req.headers["if-modified-since"])
      , contentToSend = "Hello World!"
      , contentType = "text"
      , headers = {
            "Etag": JSON.stringify([0, contentToSend, mtime].join("-"))
          , "Date": (new Date()).toUTCString()
          , "Last-Modified": lastMod.toUTCString()
          , "Content-Type": contentType
          , "Content-Length": contentToSend.length
        }
      ;

      debugger
    // File is cached
    if ((clientMTime  || clientETag) &&
        (!clientETag  || clientETag === headers["Etag"]) &&
        (!clientMTime || clientMTime >= mtime)) {
        // 304 response should not contain entity headers
        ["Content-Encoding",
         "Content-Language",
         "Content-Length",
         "Content-Location",
         "Content-MD5",
         "Content-Range",
         "Content-Type",
         "Expires",
         "Last-Modified"].forEach(function(entityHeader) {
            delete headers[entityHeader];
        });

        res.writeHead(304, headers);
        res.end(contentToSend);
        return;
    }

    // Set cache-control  header
    headers["cache-control"] = "max-age=" + CACHE_SIZE;
    res.writeHead(200, headers);
    res.end(contentToSend);
}).listen(8000, function (err) {
    console.log(err || "Listening on 8000.");
});
