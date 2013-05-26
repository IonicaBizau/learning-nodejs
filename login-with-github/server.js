// Require http, node static
var http = require("http");
var static = require("node-static");
var spawn = require("child_process").spawn;
var request = require("request");

// Node static: public_html folder
var file = new(static.Server)('./public');

// Get arguments for starting the server
if (process.argv[2] !== "--showLogs") {
    console.log = function() {};
}

// Listening on port 8000
var port = 8000;

// Create server
var srv = http.createServer(function(req, res){    
    printDateTime();
    
    if (req.url.indexOf("/login") !== -1) {
        var loginUrl = req.url;
        
        // Error
        if(loginUrl.indexOf("?error=") !== -1) {
            res.end("There was an error. Error message: " + getError(loginUrl));
        }
        else {
            // Success
            if (loginUrl.indexOf("?code=") !== -1) {
                var code = getCode(loginUrl);
                
                // ClientId and secretkey for my app
                // TODO: Secret key has not to be shared.
                
                var CLIENT_ID = "your client id";
                var SECRET_KEY = "your secret key";
                
                // Get access token
                getAccessToken(CLIENT_ID, SECRET_KEY, code, function(err, accessToken) {
                    if(err) {
                        console.log(err);
                        return res.end(err);
                    }
                    
                    console.log("Access token: " + accessToken);

                    verify(accessToken, function(err, body) {
                        if (err) {
                            console.log("ERROR: " + err);
                            return res.end(err);
                        }
                        
                        console.log("BODY: " + body);
                        var body = JSON.parse(body);
                        res.end(JSON.stringify(body, null, 4));
                    });
                });
            }
            else {                
                // Unkown problem. So, give a feedback to user
                res.end("Unkown problem. Send this URL to developer: " + loginUrl);
            }
        }
    }
    
    if (req.url === "/") {
        file.serve(req, res);
    }    
}).listen(port);

console.log("Listening on " + port);

/**
 *  Get error from URL
 */
function getError(url) {
    return url.substring(url.indexOf("?error=") + 7); 
}

/**
 * Get login code
 */
function getCode(url) {
    return url.substring(url.indexOf("?code=") + 6); 
}

/**
 * Print date time function
 */
function printDateTime() {
    var date = new Date();
    
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    
    console.log("New connection: " + hour + ":" + min + ":" + sec);
}

/**
 * Get access token
 */
function getAccessToken(clientId, secretKey, code, callback) {
    var url =  "https://github.com/login/oauth/access_token?client_id=" + 
                clientId + "&redirect_uri=http://localhost:8000/oauth_redirect&" + 
                "client_secret=" + secretKey + "&code=" + code;

    request.post(url, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var accessToken = body.substring(body.indexOf("=") + 1, body.indexOf("&"));
            
            if (accessToken.indexOf("error") !== -1) {
                callback("Invalid temp code.");
            }
            
            callback(null, accessToken);
        }
        else {
            callback(err);
        }
    });
}

/*
 * Verify
 */
function verify(accessToken, callback) {
    var url = "https://api.github.com/user?access_token=" + accessToken;
    
    request(url, function(err, res, body) {
        if (!err && res.statusCode == 200) {
            callback(null, body);
        }
        else {
            callback(err);
        }
    });
}