/**
 * Copyright 2010 Ajax.org B.V.
 *
 * This product includes software developed by
 * Ajax.org B.V. (http://www.ajax.org/).
 *
 * Author: Fabian Jaokbs <fabian@ajax.org>
 */

var util = require('util');
var AbstractApi = require("./abstract_api").AbstractApi;

/**
 * API wrapper for http://confluence.atlassian.com/display/BBDEV/SSH+Keys
 */
var SshApi = exports.SshApi = function(api) {
    this.$api = api;
};

util.inherits(SshApi, AbstractApi);

(function() {

    /**
     * List all public SSH keys on the account
     */
    this.getKeys = function(callback) {
        this.$api.get("ssh-keys/", null, null, callback);
    };

    /**
     * Add a public SSH key on the account
     */
    this.addKey = function(key, callback) {
        this.$api.post("ssh-keys/", {key: key}, null, callback);
    };
    
    /**
     * Delete a public SSH key on the account
     */
    this.deleteKey = function(pk, callback) {
        this.$api["delete"]("ssh-keys/" + pk, null, null, callback);
    };

}).call(SshApi.prototype);