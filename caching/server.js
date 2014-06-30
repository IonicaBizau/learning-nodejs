// Dependencies
var Statique = require("statique");
var lastMod = new Date();

// Statique config
Statique
    .server({root: __dirname + "/public"})
    .setRoutes({
        "/": {
            get: function (req, res) {
                var mtime = lastMod
                  , clientETag = req.headers['if-none-match']
                  , clientMTime = Date.parse(req.headers['if-modified-since'])
                  , contentToSend = "Hello World!"
                  , contentType = "text"
                  , headers = {
                        "Etag": JSON.stringify([0, contentToSend, mtime].join('-'))
                      , "Date": (new Date()).toUTCString()
                      , "Last-Modified": lastMod.toUTCString()
                      , "Content-Type": contentType
                      , "Content-Length": contentToSend.length
                    }
                  ;

                // file is cached
                if ((clientMTime  || clientETag) &&
                    (!clientETag  || clientETag === headers['Etag']) &&
                    (!clientMTime || clientMTime >= mtime)) {
                    // 304 response should not contain entity headers
                    ['Content-Encoding',
                     'Content-Language',
                     'Content-Length',
                     'Content-Location',
                     'Content-MD5',
                     'Content-Range',
                     'Content-Type',
                     'Expires',
                     'Last-Modified'].forEach(function(entityHeader) {
                        delete headers[entityHeader];
                    });
                    Statique.sendRes(res, 304, contentType, null, headers);
                    res.end();
                    return;
                }

                // Set cache-control  header
                headers["cache-control"] = "max-age=" + Statique._cache;
                Statique.sendRes(res, 200, contentType, contentToSend, headers)
            }
        }
    })
  ;

// Create server
require('http').createServer(Statique.serve).listen(8000);

// Output
console.log("Listening on 8000.");
