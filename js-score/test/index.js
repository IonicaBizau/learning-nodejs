// Dependencies
var JsScore = require("../lib")
  , song = require(__dirname + "/songs/glorify")
  ;

var score = new JsScore({
    tempo: [4, 104]
  , measure: [4, 4]
  , key: JsScore.keys["Bb"]
  , tracks: song
});

score.record("./glorify.ogg");
score.play();

