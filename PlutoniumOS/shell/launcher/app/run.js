var Spawn = require("child_process").spawn
  , Opn = require("opn")
  ;

module.exports = function (input) {
    if (input.app) {
        Spawn(input.app);
    }

    if (input.url) {
        Opn(input.url);
    }
};
