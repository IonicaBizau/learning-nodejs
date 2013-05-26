// Require http, node static
var http = require("http");
var request = require("request");

// Callback: error, code 
function scanUrl(url, callback) {
    // Error
    if(url.indexOf("?error=") !== -1) {
        callback("There was an error. Error message: " + getError(url));
        return;
    }
    else
    // Code
    if (url.indexOf("?code=") !== -1) {
        var code = getCode(url);
        callback(null, code); 
        return;
    }
    else {
        callback("Unknown url. It this a mistake? Message the developer with this link: " + url);
        return;
    }
}   

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
 * Get access token
 */
function getAccessToken(clientId, secretKey, code, callbackUrl, callback) {
    
    var url =  "https://github.com/login/oauth/access_token?client_id=" + 
                clientId + "&redirect_uri=" + callbackUrl + "&client_secret=" 
                + secretKey + "&code=" + code;

    request.post(url, function (err, res, body) {
        
        if (!err && res.statusCode == 200) {
            var accessToken = body.substring(body.indexOf("=") + 1, body.indexOf("&"));
                        
            if (accessToken.indexOf("error") !== -1) {
                callback("Invalid temp code.");
                return;
            }
            
            callback(null, accessToken);
            return;
        }
        
        callback(err);
    });
}

/*
 * Verify
 */
function verify(accessToken, callback) {
    var url = "https://api.github.com/user?access_token=" + accessToken;
    
    request(url, function(err, res, data) {
        if (!err && res.statusCode == 200) {
            data = JSON.parse(data);
            
            deleteData(data);
            
            data.type = "Github";
            
            callback(null, data);
        }
        else {
            callback(err);
        }
    });
}

function deleteData(object) {
    delete object.id;
    delete object.gravatar_id;
    delete object.url;
    delete object.html_url;
    delete object.followers_url;
    delete object.following_url;
    delete object.gists_url;
    delete object.starred_url;
    delete object.subscriptions_url;
    delete object.organizations_url;
    delete object.repos_url;
    delete object.events_url;
    delete object.received_events_url;
    delete object.type;
    delete object.company;
    delete object.blog;
    delete object.location;
    delete object.hireable;
    delete object.bio;
    delete object.followers;
    delete object.following;
    delete object.created_at;
    delete object.updated_at;
    delete object.public_gists;
}

exports.scanUrl = scanUrl;
exports.verify = verify;
exports.getAccessToken = getAccessToken;