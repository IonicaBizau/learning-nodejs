var ScoreScanner = require("../lib");

var score = new ScoreScanner(__dirname + "/foo.png");
score.scan(function (err, data) {
    debugger
});
