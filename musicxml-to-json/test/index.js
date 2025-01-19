var MusicXmlToJSON = require("../lib")
  , JsScore = require("../../js-score/lib")
  , Fs = require("fs")
  ;

MusicXmlToJSON(__dirname + "/1.xml", function (err, data) {
    data.key = JsScore.keys[data.key];
    data.tempo = [16, 60];
    Fs.writeFile("./foo.json", JSON.stringify(data, null, 4), function (err, data) {
    });
    var score = new JsScore(data);
    score.play();
});
