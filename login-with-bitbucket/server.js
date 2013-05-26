var http = require("http");
var Url = require("url");
var querystring = require("querystring");
var BitBucket = require("./bitbucket").BitBucket;
var OAuth = require("oauth").OAuth;

// This file should be edited with the key and secret.
var secrets = require("./bitbucket/secrets");

var bitbucket = new BitBucket(true);
var repo = bitbucket.getRepoApi();
var PORT = process.env.PORT || 7878;

var oauth = new OAuth(
    "https://bitbucket.org/api/1.0/oauth/request_token/", //requestUrl, 
    "https://bitbucket.org/api/1.0/oauth/access_token/", //accessUrl, 
    secrets.oauth.clientId, //consumerKey, 
    secrets.oauth.secret, //consumerSecret,
    "1.0", //version, 
    "http://localhost:" + PORT + "/bitbucket/callback", //authorize_callback,
    'HMAC-SHA1' //signatureMethod, 
);

console.log("-----------------");
console.log("OAuth: ");
console.log(JSON.stringify(oauth, null, 4));
console.log("-----------------");

// for demo purposes use one global access token
// in production this has to be stored in a user session
var accessToken = "";

function getOAuthRequestToken(callback) {
    oauth.getOAuthRequestToken(callback)
}

getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
    console.log(arguments)
    
    http.createServer(function(req, res) {
        var url = Url.parse(req.url);
        var path = url.pathname;
        
        console.log(url);
        
        var query = querystring.parse(url.query);
        
        if (path == "/") {
            
            // redirect to bitbucket if there is no access token        
            if (!accessToken) {
                res.writeHead(303, {
                    Location: oauth.signUrl("https://bitbucket.org/api/1.0/oauth/authenticate/", oauthToken, oauthTokenSecret, "GET")                               
                });
                res.end();
                
                console.log("> Auth...");
                
                return;
            }
            
            var onError = function (err) {
                res.writeHead(500);
                res.end(JSON.stringify(err));
            };
                                
            // use API
            bitbucket.getEmailApi().getAll(function (err, emails) {
                if (err) return onError(err);
                
                bitbucket.getSshApi().getKeys(function (err, keys) {
                    if (err) return onError(err);
                    
                    res.writeHead(200);
                    res.end("Emails: " + JSON.stringify(emails) + ", Keys: " + keys.length);
                });
            });
            
            return;
        } 
        // URL called by bitbucket after authenticating
        else if (path.match(/^\/bitbucket\/callback\/?$/)) {
            // upgrade the code to an access token
            oauth.getOAuthAccessToken(oauthToken, oauthTokenSecret, query.oauth_verifier, function(err, oauth_access_token, oauth_access_token_secret, results) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end(err + "");
                    return;
                }
                
                accessToken = oauth_access_token;
                
                // authenticate API
                bitbucket.authenticateOAuth(oauth, oauth_access_token, oauth_access_token_secret);
                console.log("accessToken", accessToken);
                  
                //redirect back
                res.writeHead(303, {
                    Location: "/"
                });
                res.end();
            });
            return;
        }
            
        res.writeHead(404);
        res.end("404 - Not found");   
    }).listen(PORT, "0.0.0.0");
    
    console.log("listening at http://localhost:" + PORT);
});
    