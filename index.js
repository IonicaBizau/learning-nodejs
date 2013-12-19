var npm = require("npm");
npm.load({
    loaded: false,
    prefix: "./tests/node_modules"
}, function (err) {
  // catch errors
  npm.commands.install(createNpmDependenciesArray('./tests/package'), function (er, data) {
    // log the error or data
  });
  npm.on("log", function (message) {
    // log the progress of the installation
    console.log(message);
  });
});

function createNpmDependenciesArray (packageFilePath) {
    var p = require(packageFilePath);
    if (!p.dependencies) return [];
    
    var deps = [];
    for (var mod in p.dependencies) {
        deps.push(mod + "@" + p.dependencies[mod]);
    }

    return deps;
}
