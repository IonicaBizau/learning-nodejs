var Url = require("url");
var querystring = require("querystring");
var BitBucket = require("./bitbucket").BitBucket;
var OAuth = require("oauth").OAuth; 
var request = require('request');

// This file should be edited with the key and secret.
var secrets = require("./secrets");

var bitbucket = new BitBucket(true);
var repo = bitbucket.getRepoApi();
var PORT = secrets.port;

var oauth = new OAuth(
    "https://bitbucket.org/api/1.0/oauth/request_token/", //requestUrl, 
    "https://bitbucket.org/api/1.0/oauth/access_token/", //accessUrl, 
    secrets.bitbucket.clientId, //consumerKey, 
    secrets.bitbucket.secret, //consumerSecret,
    "1.0", //version, 
    "http://localhost:" + PORT + "/bitbucket/callback", //authorize_callback,
    'HMAC-SHA1' //signatureMethod, 
);

function getOAuthRequestToken(callback) {
    oauth.getOAuthRequestToken(callback);
}

/**
 * Callback params: error, result, redirectUrl
 */
function login(oauthToken, oauthTokenSecret, accessToken, callback) {          
    // redirect to bitbucket if there is no access token
    if (!accessToken) {
        var redirectUrl = oauth.signUrl("https://bitbucket.org/api/1.0/oauth/authenticate/", oauthToken, oauthTokenSecret, "GET"); 
            
        callback(null, redirectUrl);
        return;
    }
    
    bitbucket.getEmailApi().getAll(function (err, emails) {
        if (err) {
            callback(err);
            return;
        }

        bitbucket.getSshApi().getKeys(function (err, keys) {
            if (err) {
                callback(err);
                return;
            }
            
            callback(null, JSON.stringify(emails));
        });
    });
}

function auth(oauthToken, oauthTokenSecret, query, callback) {
    oauth.getOAuthAccessToken(oauthToken, oauthTokenSecret, query.oauth_verifier, 
        function(err, oauth_access_token, oauth_access_token_secret, results) {
        if (err) {
            callback(err);
            return;
        }
    
        // authenticate API
        bitbucket.authenticateOAuth(oauth, oauth_access_token, oauth_access_token_secret);

        callback(null, oauth_access_token);
    });
}

/**
 * Get user data for Bitbucket 
 * @param {Object} username
 * @param {Object} callback
 */
function getUserData(email, callback) {
    request("https://api.bitbucket.org/1.0/users/" + email, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var all = JSON.parse(body);
            var user = all.user;
            
            user.public_repos = all.repositories.length;
            user.login = user.username;
            user.name = user.display_name;
            
            var avatar = user.avatar;
            avatar = avatar.substring(0, avatar.length - 2) + "80";
           
            delete user.display_name;{ $unset : { field : 1} }
            delete user.first_name;
            delete user.last_name;
            delete user.is_team;
            delete user.resource_uri;
            delete user.username;
            delete user.avatar;
            
            user.avatar_url = avatar;
            user.email = email;
            user.type = "Bitbucket";
            
            callback(null, user);
            return;
        }
        
        callback(error);
    });
}

exports.login = login;
exports.getUserData = getUserData;
exports.getOAuthRequestToken = getOAuthRequestToken;
exports.auth = auth;