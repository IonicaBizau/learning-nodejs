/**
 * Copyright 2010 Ajax.org B.V.
 *
 * This product includes software developed by
 * Ajax.org B.V. (http://www.ajax.org/).
 *
 * Author: Fabian Jaokbs <fabian@ajax.org>
 */

var assert = require("assert");
var async = require("asyncjs");
var BitBucket = require("./index").BitBucket;
var secrets = require("./secrets");


module.exports = {

    setUp: function() {
        this.bitbucket = new BitBucket(true);
        this.bitbucket.authenticatePassword(secrets.username, secrets.password);
        this.userApi = this.bitbucket.getUserApi();
    },

    "test: get data of authenticated user" : function(finished) {
        this.userApi.getUserData(secrets.username, function(err, data) {
            assert.equal(err, null);
            assert.equal(data.user.username, secrets.username);
            assert.ok("repositories" in data);
            finished();
        });
    }
};

!module.parent && async.test.testcase(module.exports).exec();