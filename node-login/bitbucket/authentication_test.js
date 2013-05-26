/**
 * Copyright 2010 Ajax.org B.V.
 *
 * This product includes software developed by
 * Ajax.org B.V. (http://www.ajax.org/).
 *
 * Author: Fabian Jaokbs <fabian@ajax.org>
 */

var assert = require("assert");
var BitBucket = require("./index").BitBucket;
var secrets = require("./secrets");

module.exports = {

    setUp: function() {
        this.bitbucket = new BitBucket(true);
        this.repoApi = this.bitbucket.getRepoApi();
    },

//    "test: show user without authentification should have no 'plan'" : function(finished) {
//        test.userApi.show(username, function(err, user) {
//            assert.equal(user.plan, undefined);
//                finished();
//        });
//    },
//
//    "test: show user with authentification should have a 'plan'" : function(finished) {
//        test.github.authenticateToken(username, token);
//        test.userApi.show(username, function(err, user) {
//            assert.ok(user.plan !== undefined);
//            finished();
//        });
//    },

    // test disabled because I don't want to see my password on github :-)
    "test: authenticate using username and password should show private repose" : function(finished) {
        this.bitbucket.authenticatePassword(secrets.username, secrets.password);
        this.repoApi.getUserRepos(secrets.username, function(err, repos) {
            console.log(repos)
            assert.ok(repos.filter(function(repo) { return repo.is_private; }).length > 0);
            finished();
        });
    },

//    "test: authenticate using username and wrong password" : function(finished) {
//        this.bitbucket.authenticatePassword(username, "1234");
//        this.userApi.show(username, function(err, user) {
//            assert.ok(err !== undefined);
//            finished();
//        });
//    },

//    "test: authenticate with bad token" : function(finished) {
//        this.github.authenticateToken(username, "bad-token");
//        this.userApi.show(username, function(err, user) {
//            assert.ok(err !== undefined);
//            finished();
//        });
//    }
};

!module.parent && require("asyncjs").test.testcase(module.exports).exec();