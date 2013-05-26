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

var pubkey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC2YuevRJKTVUAjbUvGCi+rhEAdxc8CGXSiq3JwY0EpUXmD89UFSTr1XI+i3Bq5di/kAJhdI3mqiipN1+3LP7HZsd3sFuY9mb5wbZLwHrBvjEhTsOgxFEzyCm87K8OT2uuazsG2uHL/VT0E2o2Ttu2HEu6k3yrx+3ZcPTKJVOdT0tJ5nIobbpgfv3CHmbvdskqSTq1vefh2je8yeiQYMIFsdJ7ApZEmLtGwEIMEVFNSgBJauRQS6qDmI9D1oVV7h5zPNW1qCR1sjsPyb6jxQS2+N63duY0qZuA8C6h2zX+TneY1iSRJcgniAjds2alNH2MJTxl+toIjXvviA7hsVJCD c9@c9.io";

module.exports = {

    setUpSuite : function(next) {
        this.setUpApi();
        this.deleteAllKeys(next);
    },

    setUp: function() {
        this.setUpApi();
    },

    setUpApi: function() {
        this.bitbucket = new BitBucket(true);
        this.bitbucket.authenticatePassword(secrets.username, secrets.password);
        this.sshApi = this.bitbucket.getSshApi();
    },

    deleteAllKeys: function(callback) {
        var self = this;
        this.sshApi.getKeys(function(err, keys) {
            if (err) return callback(err);

            async.forEach(keys, function(key, next) {
                self.sshApi.deleteKey(key.pk);
            }, callback);
        });
    },

    "test: get all ssh keys" : function(finished) {
        var self = this;
        this.sshApi.addKey(pubkey, function(err, key) {
            assert.equal(err, null);
            self.sshApi.getKeys(function(err, keys) {
                assert.equal(err, null);
                assert.ok(keys.length > 0);
                assert.ok(keys[0].key == pubkey);
                assert.ok(keys[0].pk !== undefined);

                // cleanup
                self.sshApi.deleteKey(keys[0].pk, finished);
            });
        });
    },

    "test: delete/add ssh key" : function(finished) {
        var self = this;
        this.sshApi.addKey(pubkey, function(err, key) {
            assert.equal(err, null);
            assert.ok(key.key == pubkey);

            // cleanup
            self.sshApi.deleteKey(key.pk, finished);
        });
    },

    "test: adding and existing key should return an error" : function(finished) {
        var self = this;
        this.sshApi.addKey(pubkey, function(err, key) {
            self.sshApi.addKey(pubkey, function(err) {
                assert.ok(err.msg.match(/Someone has already registered that SSH key/));

                // cleanup
                self.sshApi.deleteKey(key.pk, finished);
            });
        });
    }
};

!module.parent && async.test.testcase(module.exports).exec();