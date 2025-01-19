// Dependencies
var Ul = require("ul")
  , BAudio = require("baudio")
  , MusicNotes = require("music-notes")
  , Instruments = require("music-instruments")
  ;

const SHARPS = [
          [ "F", "F#" ]
        , [ "C", "C#" ]
        , [ "G", "G#" ]
        , [ "D", "D#" ]
        , [ "A", "A#" ]
        , [ "E", "E#" ]
        , [ "B", "B#" ]
    ]
    , FLATS = [
          [ "B", "Bb" ]
        , [ "E", "Eb" ]
        , [ "A", "Ab" ]
        , [ "D", "Db" ]
        , [ "G", "Gb" ]
        , [ "C", "Cb" ]
        , [ "F", "Fb" ]
    ]
    ;

function JsScore(options) {

    var self = this;

    var last = null;
    options = Ul.merge(options, {
        tempo: {
            quarter: 120
        }
      , measure: [4, 4]
      , key: JsScore.keys.C
      , tracks: []
      , bau: function (t) {

            var sound = 0
              , i = 0
              , ii = 0
              , tracks = self.options.tracks
              , cTrack = null
              , cNote = null
              , sec = t
              , maxEnd = -1
              , sin = Instruments.organ
              ;

            for (; i < tracks.length; ++i) {
                sec = t;

                cTrack = tracks[i];
                maxEnd = cTrack.notes.slice(-1)[0].e;
                sec = sec % maxEnd;

                cNote = null;
                for (ii = 0; ii < cTrack.notes.length; ++ii) {
                    if (sec >= cTrack.notes[ii].s && sec < cTrack.notes[ii].e) {
                        cNote = cTrack.notes[ii];
                    }
                }

                if (!cNote.l && cNote.e - sec < 0.01) {
                    sound = 0;
                    break;
                }

                cNote.k.forEach(function (c) {
                    sound += sin(c.f, t);
                });
            }

            return sound;
        }
    });

    // Normalize the tracks and notes
    options.tracks.forEach(function (cTrack, i) {
        options.tracks[i] = cTrack = Ul.merge(cTrack, {
            notes: [],
            repeat: false,
            durations: []
        });
        var at = 0;
        cTrack.notes.forEach(function (cNote, ii) {

            cTrack.notes[ii] = cNote = Ul.merge(cNote, {
                c: false // crown
              , d: 1 / 4 // duration
              , k: []    // notes
              , l: false // legato
            });

            // Absolute time
            cNote.at = cNote.d * options.tempo[0] * (60 / options.tempo[1]);

            // Start
            cNote.s = Ul.merge(cTrack.notes[ii - 1], { e: 0 }).e;

            // End
            cNote.e = (at += cNote.at);

            // Fix the keys
            cNote.k.forEach(function (cKey, iii) {

                var cKey = typeof cKey === "string" ? {
                    n: cKey
                } : cKey;

                // Normalize the note
                cKey = cNote.k[iii] = Ul.merge(cKey, {
                    f: -1      // frequency
                  , o: cKey.n  // original note
                  , n: cKey.n  // note
                  , b: false   // becar
                });

                options.key.forEach(function (cK) {
                    // TODO Will this work for all cases?
                    cKey.n = cKey.n.replace(cK[0], cK[1]);
                });

                cKey.f = MusicNotes.get(cKey.n);
            });
        });
    });

    self.options = options;
    self._baudio = BAudio(self.options.bau);
    self.record = function (file) {
        self._baudio.record(file);
    };
}

JsScore.prototype.play = function () {
    this._baudio.play();
};

// Keys
JsScore.keys = {
    "Cb": FLATS
  , "Gb": FLATS.slice(0, 6)
  , "Db": FLATS.slice(0, 5)
  , "Ab": FLATS.slice(0, 4)
  , "Eb": FLATS.slice(0, 3)
  , "Bb": FLATS.slice(0, 2)
  , F: FLATS.slice(0, 1)
  , C: []
  , G: SHARPS.slice(0, 1)
  , D: SHARPS.slice(0, 2)
  , A: SHARPS.slice(0, 3)
  , E: SHARPS.slice(0, 4)
  , B: SHARPS.slice(0, 5)
  , "F#": SHARPS.slice(0, 6)
  , "C#": SHARPS
};

// Object.keys(JsScore.keys).forEach(function (k) {
//     var n = JsScore.keys[k]
//       , cKey = JsScore.keys[k] = {}
//       ;
//
//     n.forEach(function (c) {
//         cKey[c[0]] = c[1];
//     });
// });

module.exports = JsScore;
