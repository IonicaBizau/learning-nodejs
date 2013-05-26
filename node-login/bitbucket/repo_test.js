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

module.exports = {

    setUp: function() {
        this.bitbucket = new BitBucket(true);
        this.repoApi = this.bitbucket.getRepoApi();
    },

//    "test: search repos" : function(finished) {
//        this.repoApi.search("php github api", function(err, repos) {
//            assert.ok(repos.length > 0);
//            assert.ok(repos[0].name !== undefined);
//            finished();
//        });
//    },
//
//    "test: show repository" : function(finished) {
//        this.repoApi.show("fjakobs", "qxoo", function(err, repo) {
//           assert.equal(repo.name, "qxoo");
//           finished();
//        });
//    },

    "test: get user repos" : function(finished) {
        this.repoApi.getUserRepos("c9test01", function(err, repos) {
            assert.equal(err, null);
            assert.ok(repos.length > 0);
            assert.ok(repos[0].name !== undefined);
            finished();
        });
    },
//
//    "test: get repo tags" : function(finished) {
//        this.repoApi.getRepoTags("fjakobs", "node", function(err, tags) {
//            assert.ok(tags["v0.1.0"] == "813b53938b40484f63e7324c030e33711f26a149");
//            finished();
//        });
//    },
//
//    "test: get repo languages" : function(finished) {
//        this.repoApi.getRepoLanguages("fjakobs", "node", function(err, languages) {
//            assert.ok(languages['C++'] != undefined);
//            finished();
//        });
//    },
//
//    "test: get repo branches" : function(finished) {
//        this.repoApi.getRepoBranches("fjakobs", "node", function(err, branches) {
//            assert.ok(branches["master"] !== undefined);
//            finished();
//        });
//    },
//
//    "test: get repo collaborators" : function(finished) {
//        this.repoApi.getRepoCollaborators("fjakobs", "node", function(err, collaborators) {
//            assert.ok(collaborators.length > 0);
//            assert.ok(!!~collaborators.toString().split(",").indexOf("fjakobs"));
//            finished();
//        });
//    },
//
//    "test: get repo contributors" : function(finished) {
//        this.repoApi.getRepoContributors("fjakobs", "node", function(err, contributors) {
//            assert.ok(contributors.length > 0);
//            assert.ok(contributors[0].login == "ry");
//            finished();
//        });
//    },
//
//    "test: get repo non-github contributors" : function(finished) {
//        this.repoApi.getRepoContributors("fjakobs", "node", true, function(err, contributors) {
//            assert.ok(contributors.length > 0);
//            assert.ok(contributors[0].login == "ry");
//            finished();
//        });
//    },
//
//    "test: get repo watchers" : function(finished) {
//        this.repoApi.getRepoWatchers("fjakobs", "node", function(err, watchers) {
//            assert.ok(watchers.length > 0);
//            assert.ok(!!~watchers.toString().split(",").indexOf("fjakobs"));
//            finished();
//        });
//    }

};

!module.parent && require("asyncjs").test.testcase(module.exports).exec();