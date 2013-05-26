// Include the node modules
var http = require("http");
var static = require("node-static");
var Url = require("url");
var querystring = require("querystring");
var request = require("request");

var bitbucket = require("./bitbucket-login.js");
var github = require("./github-login.js");
var user = require("./user");

var secrets = require("./secrets");

// GITHUB data
var GITHUB_CLIENT_ID = secrets.github.clientId;
var GITHUB_SECRET_KEY = secrets.github.secretKey;
var GITHUB_LOGIN_PATH = secrets.github.path;

// Bitbucket data
var BITBUCKET_CLIENT_ID = secrets.bitbucket.clientId;
var BITBUCKET_SECRET_KEY = secrets.bitbucket.secret;
var BITBUCKET_LOGIN_PATH = secrets.bitbucket.path;

var PORT = secrets.port;

// for demo purposes use one global variable
// in production this has to be stored in a user session
// TODO: User sesion
var accessData = {
    "type": "", // "github" or "bitbucket"
    "accessToken": "",
    "email": ""
};

var oauthTok = "", oauthTokSecret = "";

// Node static: public folder
var public = new(static.Server)("./public");

// Open database
var collection;
user.init(function(err, col) {
    if (err) {
    	console.log(err);
        process.exit(1);
    }
    
    collection = col;
});

// Create http server    
http.createServer(function (req, res) {
    // The database was not finished opening...
    if (!collection) {
        res.end("Try again later!");
        return;
    }
    
    // Logout link
    if (req.url === "/logout") {
        removeAccessData(res);
        return;
    }
    
    // Delete account
    if (req.url === "/delete") {
        user.delete(collection, accessData.email, function(err) {
            if (err) {
                res.end(err);
                return;
            }
            
            removeAccessData(res);
        });
        return;
    }
    
      //////////////////
     // BITBUCKET LOGIN
    //////////////////

    if (req.url === BITBUCKET_LOGIN_PATH) {
        // Get oauthToken and oauthToken secret
        bitbucket.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret) {
            oauthTok = oauthToken;
            oauthTokSecret = oauthTokenSecret;
            
            if (error) {
                public.serveFile("/error.html", 500, {}, req, res);
                return;
            }
            
            // Get redirect url
            bitbucket.login(oauthTok, oauthTokSecret, null, function(err, redirectUrl) {
                if (err) {
                    public.serveFile("/error.html", 500, {}, req, res);
                    return;
                }
                    
                redirect(res, redirectUrl);
            });
        });
        return;
    }

    if (req.url.indexOf("/bitbucket/callback") !== -1) {
        var url = Url.parse(req.url);
        var path = url.pathname;
            
        var query = querystring.parse(url.query);        

        bitbucket.auth(oauthTok, oauthTokSecret, query, function (err, accessToken) {            
            if (err) {
                public.serveFile("/error.html", 500, {}, req, res);
                return;
            }
                
            accessData.type = "bitbucket";
            accessData.accessToken = accessToken;
            
            // Register user in database
            getData(function(err, data) {
                var data = JSON.parse(data);
                
                accessData.email = data.email;
                
                var newUser = user.create(data);
                
                // Register the new user
                user.register(collection, newUser, function(err) {
                    if (err) {
                        res.end(err);
                        return;
                    }
                    
                    redirect(res, "/profile.html");
                });
            });
        });

        return;
    }

      ///////////////
     // GITHUB LOGIN
    ///////////////

    // The user chose to signIn with Github
    if (req.url === GITHUB_LOGIN_PATH) {
        var githubUrl = "https://github.com/login/oauth/authorize?client_id=" + 
            GITHUB_CLIENT_ID + "&redirect_uri=http://localhost:" + 
            PORT + GITHUB_LOGIN_PATH + "/callback";

        redirect(res, githubUrl);
        return;
    }
        
    // Callback after accept/deny access
    if (req.url.indexOf(GITHUB_LOGIN_PATH + "/callback") !== -1) {        
        registerGithub(req, res);
            
        return;
    }
        
    // Serve file from public folder
    if (req.url === "/" && accessData.accessToken !== "") {
        redirect(res, "/profile.html");
        return;    
    }

      /////////////////////////////
     // GETTING DATA FROM DATABASE
    /////////////////////////////

    if (req.url === "/getUserProfileData") {
        getUserProfileData(req, res, accessData.email);
        return;
    }

    // Github/Bitbucket link for ajax
    if (req.url.indexOf("/getData?email=") !== -1) {
        getUserProfileData(req, res);
        return;
    }

      ///////////////////////////////////
     // AJAX POST REQUESTS FOR EDIT DATA
    ///////////////////////////////////
    if (req.url === "/revokeAccess") {
    	if (req.method === "POST") {
    		var postData = "";
    		
    		req.on("data", function(data) {
    			postData += data;
    		});
    		
    		req.on("end", function() {
    			var data = querystring.parse(postData);
							
    			// "github" || "bitbucket"
    			var type = data.type;
    			
    			user.revokeAccessFor(collection, type, accessData.email, function(err) {
    				if (err) {
    					res.end(err);
    					return;
    				}

    				res.end();
    			});
    		});
    		
    		return;
    	}
    	
    	res.end("You have to post here something...");
    	return;
    }
    
    if (req.url === "/edit_profile") {
        if (req.method === "POST") {
            var postData = "";
            
            req.on("data", function(data) {
                postData += data;
            });
            
            req.on("end", function() {
                var data = querystring.parse(postData);
                var name = data.name;
                
                var possibleNames = [
                    "street",
                    "zip",
                    "location"
                ];                
                
                var index = possibleNames.indexOf(name);
                
                if (index < 0) {
                    res.writeHead(500);
                    res.end("Invalid edit.");
                    return;
                }

                user.update(collection, accessData.email, name, data.value, function(err) {
                    if (err) {
                        res.writeHead(500);
                        res.end(err);
                        return;
                    }
                    
                    res.writeHead(200);
                    res.end();
                });
            });
            return;
        }
        
        res.end("You have to post here something...\nRequest method is " + req.method);
        return;
    }


    // Serve files from public directory
    public.serve(req, res, function (err) {
        if (err) {
            public.serveFile("/404.html", 404, {}, req, res);
        }
    });
}).listen(PORT);
console.log("Listening on " + PORT);

function removeAccessData(res) {
    accessData.type = "";
    accessData.accessToken = "";
    accessData.email = "";
    redirect(res, "/");
}

/**
 * Redirect to url function
 * @param {Object} res
 * @param {Object} url
 */
function redirect(res, url) {
    res.writeHead(303, {
        Location: url
    });
        
    res.end();
}


/**
 * Get user profile data 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} email - optional
 */
function getUserProfileData(req, res, email) {
    var emailSelector;
    
    if (!email) {
        var emailSelector = "?email=";
        email = req.url.substring(req.url.indexOf(emailSelector) + emailSelector.length);
    }

    if (!email) {
        res.end("Error: email address is missing.");
        return;
    }
        
    // Get user info from database
    user.get(collection, email, function(err, info) {
        if (err) {
            res.end(err);
            return;
        }

        res.end(JSON.stringify(info, null, 4));
    });
}

/**
 * Register from Github
 * @param {Object} req
 * @param {Object} res
 */
function registerGithub(req, res) {
    github.scanUrl(req.url, function(err, code) {
        if (err) {
            res.end(err);
            return; 
        }
            
        github.getAccessToken(
            GITHUB_CLIENT_ID, 
            GITHUB_SECRET_KEY, 
            code, 
            "http://localhost:" + PORT + "/login/github/callback", 
            function(err, accessToken) {
                
            if (err) {
                res.end(err);
                return;
            }
                
            accessData.type = "github";
            accessData.accessToken = accessToken;
            
            // Register it in database
            getData(function(err, data) {
                if (err) {
                    res.end("Error: " + err);
                    return;
                }

                var data = JSON.parse(data);
                var newUser = user.create(data);
                
                accessData.email = newUser.email;
                
                // Register the new user
                user.register(collection, newUser, function(err) {
                    if (err) {
                        res.end(err);
                        return;
                    }
                    
                    redirect(res, "/profile.html");
                });
            });
        });
    });
}

/**
 * Get user data for ajax call
 * @param {Object} callback
 * 
 * user data:
 * {
 *     email: string,
 *     name: string (display name),
 *     username: string,
 *     public_repos: int,
 *     avatar_url: string,
 *     type: string ("Bitbucket" or "Github")
 * }
 */
function getData(callback) {
    if (accessData.type) {
        if (accessData.type === "github") {
            github.verify(accessData.accessToken, function(err, data) {
                if (err) {
                    callback(err);
                    return;
                }
                
                data = JSON.stringify(data, null, 4);

                callback(null, data);
            });        
        }
        else {
            bitbucket.login(oauthTok, oauthTokSecret, accessData.accessToken, function(err, emails) {
                if (err) {
                    callback(err);
                    return;
                }
                
                emails = JSON.parse(emails);
                var email = emails[0].email;
                
                bitbucket.getUserData(email, function (err, data) {
                    if (err) {
                        callback(err);
                        return;
                    }

                    data = JSON.stringify(data, null, 4);
    
                    callback(null, data);
                });    
            });
        }
    }
    else {
        callback("You are not logged in.");
    }
}