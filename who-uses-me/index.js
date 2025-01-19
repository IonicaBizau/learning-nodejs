var UserPacks = require("npm-pkgs")
  , PackageJson = require("package-json")
  , GetDependents = require("npm-get-dependents")
  , SameTime = require("same-time")
  , OneByOne = require("one-by-one")
  , Logger = require("bug-killer")
  , Typpy = require("typpy")
  , LimitIt = require("limit-it")
  ;

function isDifferentMaintainer(input) {
    if (Typpy(input, Array)) {
        return isDifferentMaintainer(input[0]);
    }
    return !input.maintainers.filter(function (c) {
        return c.name === "ionicabizau"
    }).length;
}

UserPacks("ionicabizau", function (err, packs) {
    SameTime(packs.map(function (c) {
        return function (cb) {
            OneByOne([
                GetDependents.bind(null, c.name)
              , function (nx, deps) {
                    if (deps.length) {
                        //console.log(c.name + " :: " + deps.join(", "));
                    }
                    var limiter = new LimitIt(1);
                    SameTime(deps.map(function (c) {
                        return function (done) {
                            limiter.add(function (c, callback) {
                                PackageJson(c, function (err, data) {
                                    done(err, data);
                                });
                            }, [c], done);
                        }
                    }), function (err, pks) {
                        debugger
                        if (err) {
                            Logger.log(err, "error");
                            return nx(err);
                        }
                        pks.map(function (cc) {
                            if (isDifferentMaintainer(cc)) {
                                Logger.log(c.name + "->" + cc.name + " :: " + cc.maintainers[0].name);
                            }
                        });
                        nx(err, pks);
                    });
                }
            ], cb);
        }
    }), function (err, data) {
        debugger
    });
});
