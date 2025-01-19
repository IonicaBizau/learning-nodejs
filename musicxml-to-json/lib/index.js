var ParseXML = require("xml2js").parseString
  , Fs = require("fs")
  , Ul = require("ul")
  ;

const KEY_SIGNS = {
    flats: [
        "C"
      , "F"
      , "Bb"
      , "Eb"
      , "Ab"
      , "Db"
      , "Gb"
      , "Cb"
    ]
  , sharps: [
        "C"
      , "G"
      , "D"
      , "A"
      , "E"
      , "B"
      , "F#"
      , "C#"
    ]
};

function MusicXmlToJSON(path, callback) {
    Fs.readFile(path, "utf-8", function (err, data) {
        if (err) { return callback(err); }
        ParseXML(data, function (err, result) {
            if (err) { return callback(err); }

            var tracks = []
              , part = result["score-partwise"].part
              , key = parseInt(part[0].measure[0].attributes[0].key[0].fifths[0])
              , song = {
                    tracks: tracks,
                    measure: {
                        type: parseInt(part[0].measure[0].attributes[0].time[0]["beat-type"][0])
                      , beats: parseInt(part[0].measure[0].attributes[0].time[0].beats[0])
                    },
                    key: key > 0 ? KEY_SIGNS.sharps[key] : KEY_SIGNS.flats[Math.abs(key)]
                }
              ;

              var sop = { notes: [] };
            part.forEach(function (cPart) {
                cPart.measure.forEach(function (cMeasure) {
                    var lastPosition = null;
                    var keys = [];
                    cMeasure.note.forEach(function (cNote, i) {
                        cNote = cMeasure.note[i] = Ul.merge(cNote, {
                            $: { "default-x": -1 }
                        });

                        if (cNote.$["default-x"] === lastPosition) {
                        } else {
                            lastPosition = cNote.$["default-x"];
                         //   keys.pop();
                            keys = [];
                            if (cNote.pitch) {
                                keys.push(cNote.pitch[0].step[0] + cNote.pitch[0].octave[0]);
                            }
                            sop.notes.push({
                                k: keys,
                                d: parseInt(cNote.duration) / (128 * (song.measure.beats / song.measure.type)),
                                l: true
                            });
                            return;
                        }

                        if (cNote.pitch) {
                            keys.push(cNote.pitch[0].step[0] + cNote.pitch[0].octave[0]);
                        }
                    });
                    //for (var c = cMeasure.note.length - 1; c >= 0; --c) {
                    //    var cTrack = tracks[cMeasure.note.length - 1 - c] = tracks[cMeasure.note.length - 1 - c] || {
                    //        notes: []
                    //    };

                    //};
                });
            });

            song.tracks = [sop];
            callback(null, song);
        });
    });
}

module.exports = MusicXmlToJSON;
