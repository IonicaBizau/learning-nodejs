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

var RepoApi = exports.RepoApi = function(api) {
    this.$api = api;
};

util.inherits(RepoApi, AbstractApi);

(function() {

//    /**
//     * Search repos by keyword
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  $query            the search query
//     */
//    this.search = function(query, callback)
//    {
//        this.$api.get(
//            'repos/search/' + encodeURI(query),
//            null, null,
//            this.$createListener(callback, "repositories")
//        );
//    };
//
//    /**
//     * Get extended information about a repository by its username and repo name
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  username         the user who owns the repo
//     * @param {String}  repo             the name of the repo
//     */
//    this.show = function(username, repo, callback)
//    {
//        this.$api.get(
//            'repos/show/' + encodeURI(username) + "/" + encodeURI(repo),
//            null, null,
//            this.$createListener(callback, "repository")
//        );
//    };

    /**
     * Get the repositories of a user
     * http://confluence.atlassian.com/display/BBDEV/Repositories
     *
     * @param {String}  username         the username
     */
    this.getUserRepos = function(username, callback)
    {
        this.$api.get(
            'users/' + encodeURI(username),
            null, null,
            this.$createListener(callback, "repositories")
        );
    };

//    /**
//     * Get the tags of a repository
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  username         the username
//     * @param {String}  repo             the name of the repo
//     */
//    this.getRepoTags = function(username, repo, callback)
//    {
//        this.$api.get(
//            'repos/show/' + encodeURI(username) + "/" + encodeURI(repo) + "/tags",
//            null, null,
//            this.$createListener(callback, "tags")
//        );
//    };
//
//    /**
//     * Get the branches of a repository
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  username         the username
//     * @param {String}  repo             the name of the repo
//     */
//    this.getRepoBranches = function(username, repo, callback)
//    {
//        this.$api.get(
//            'repos/show/' + encodeURI(username) + "/" + encodeURI(repo) + "/branches",
//            null, null,
//            this.$createListener(callback, "branches")
//        );
//    };
//
//    /**
//     * Get the languages of a repository
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  username         the username
//     * @param {String}  repo             the name of the repo
//     */
//    this.getRepoLanguages = function(username, repo, callback)
//    {
//        this.$api.get(
//            'repos/show/' + encodeURI(username) + "/" + encodeURI(repo) + "/languages",
//            null, null,
//            this.$createListener(callback, "languages")
//        );
//    };
//
//    /**
//     * Get the collaborators of a repository
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  username         the username
//     * @param {String}  repo             the name of the repo
//     */
//    this.getRepoCollaborators = function(username, repo, callback)
//    {
//        this.$api.get(
//            'repos/show/' + encodeURI(username) + "/" + encodeURI(repo) + "/collaborators",
//            null, null,
//            this.$createListener(callback, "collaborators")
//        );
//    };
//
//    /**
//     * Get the contributors of a repository
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  username         the username
//     * @param {String}  repo             the name of the repo
//     * @param {Boolean} anon             retreive non-github contributors
//     */
//    this.getRepoContributors = function(username, repo, anon, callback)
//    {
//        if (typeof(anon) == 'function') {
//            callback = anon;
//            anon = '';
//        }
//        else {
//            anon = '/anon';
//        }
//        this.$api.get(
//            'repos/show/' + encodeURI(username) + "/" + encodeURI(repo) + "/contributors" + anon,
//            null, null,
//            this.$createListener(callback, "contributors")
//        );
//    };
//
//    /**
//     * Get the watchers of a repository
//     * http://develop.github.com/p/repo.html
//     *
//     * @param {String}  username         the username
//     * @param {String}  repo             the name of the repo
//     */
//    this.getRepoWatchers = function(username, repo, callback)
//    {
//        this.$api.get(
//            'repos/show/' + encodeURI(username) + "/" + encodeURI(repo) + "/watchers",
//            null, null,
//            this.$createListener(callback, "watchers")
//        );
//    };

}).call(RepoApi.prototype);