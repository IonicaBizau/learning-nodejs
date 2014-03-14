// dependencies
var Assert = require('assert')
  , GoogleApis = require('googleapis')
  , authData = {
        email: "ionica.bizau@jillix.com"
      , keyFile: __dirname + "/keyFile.pem"
      , key: null
      , scopes: ["https://www.googleapis.com/auth/admin.directory.group"]
    }
  ;

// set jwt data
var jwt = new GoogleApis.auth.JWT(
    authData.email
  , authData.keyFile
  , authData.key
  , authData.scopes
);

jwt.GAPI = function(opts, callback) {

    console.log("GAPI Options: ", opts);

    // set auth data
    Assert.equal(authData.email, opts.iss);
    Assert.equal(authData.keyFile, opts.keyFile);
    Assert.equal(authData.scopes.join(" "), opts.scope);

    // async callback
    setTimeout(function() {
      callback(null);
    }, 0);

    // return an object containing getToken function
    return {
        getToken: function(opt_callback) {
            console.log("Inside of getToken handler.");
            opt_callback(null, 'initial-access-token');
        }
    }
};

// authorize
jwt.authorize(function (err, data) {

    // output error
    if (err) {
        console.log("Error: ", err);
        return;
    }

    // set credentials
    Assert.equal('initial-access-token', jwt.credentials.access_token);
    Assert.equal('jwt-placeholder', jwt.credentials.refresh_token);

    console.log("JWT Credentials: ", jwt.credentials);
});
