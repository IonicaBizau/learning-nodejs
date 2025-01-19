var Ul = require("ul");

var m1 = {
    s: [{
        k: ["F4"],
        d: 1 / 2
    }, {
        k: ["F4"]
    }, {
        k: ["F4"],
        l: true
    }, {
        k: ["E4"]
    }, {
        k: ["F4"]
    }, {
        k: ["G4"],
        l: true
    }, {
        k: ["A4"]
    }, {
        k: ["G4"]
    }, {
        k: ["F4"],
        d: 3 / 4
    }],
    a: [{
        k: ["C4"],
        d: 1 / 2
    }, {
        k: ["C4"]
    }, {
        k: ["C4"],
        d: 1 / 2
    }, {
        k: ["C4"]
    }, {
        k: ["D4"],
        l: true
    }, {
        k: ["C4"]
    }, {
        k: ["C4"]
    }, {
        k: ["A3"],
        d: 3 / 4
    }],
    t: [{
        k: ["A3"],
        d: 1 / 2
    }, {
        k: ["A3"]
    }, {
        k: ["G3"],
        d: 1 / 2
    }, {
        k: ["C4"]
    }, {
        k: ["F3"],
        d: 1 / 2
    }, {
        k: ["E3"]
    }, {
        k: ["F3"],
        d: 3 / 4
    }],
    b: [{
        k: ["F3"],
        d: 1 / 2
    }, {
        k: ["F3"]
    }, {
        k: ["C3"],
        d: 1 / 2
    }, {
        k: ["A2"]
    }, {
        k: ["B2"],
        l: true
    }, {
        k: ["C3"]
    }, {
        k: ["C3"]
    }, {
        k: ["F2"],
        d: 3 / 4
    }]
};

var m2 = {
    s: [{
        k: ["A4"],
        d: 1 / 2
    }, {
        k: ["A4"]
    }, {
        k: ["A4"],
        l: true
    }, {
        k: ["G4"]
    }, {
        k: ["A4"]
    }, {
        k: ["C5"],
        l: true
    }, {
        k: ["B4"]
    }, {
        k: ["A4"]
    }, {
        k: ["A4"]
    }, {
        k: ["G4"],
        d: 1 / 2
    }],
    a: [{
        k: ["F4"],
        d: 1 / 2
    }, {
        k: ["F4"]
    }, {
        k: ["F4"],
        l: true
    }, {
        k: ["E4"],
    }, {
        k: ["F4"]
    }, {
        k: ["G4"],
        d: 1 / 2
    }, {
        k: ["F4"]
    }, {
        k: ["F4"]
    }, {
        k: ["E4"],
        d: 1 / 2
    }],
    t: [{
        k: ["C4"],
        d: 1 / 2
    }, {
        k: ["C4"]
    }, {
        k: ["C4"],
        d: 1 / 2
    }, {
        k: ["C4"]
    }, {
        k: ["C4"],
        d: 1 / 2
    }, {
        k: ["C4"]
    }, {
        k: ["C4"]
    }, {
        k: ["C4"],
        d: 1 / 2
    }],
    b: [{
        k: ["F3"],
        d: 1 / 2
    }, {
        k: ["F3"]
    }, {
        k: ["F3"]
      , l: true
    }, {
        k: ["C3"]
    }, {
        k: ["F3"]
    }, {
        k: ["E3"]
      , d: 1 / 2
    }, {
        k: ["F3"]
    }, {
        k: ["C3"],
    }, {
        k: ["C3"],
        d: 1 / 2
    }]
};

var m3 = {
    s: m2.s,
    a: [{
        k: ["F4"],
        d: 1 / 2
    }, {
        k: ["G4"]
    }, {
        k: ["F4"],
        l: true
    }, {
        k: ["E4"],
    }, {
        k: ["F4"]
    }, {
        k: ["D4"],
        d: 1 / 2
    }, {
        k: ["D4"]
    }, {
        k: ["C4"]
    }, {
        k: ["C4"],
        d: 1 / 2
    }],
    t: [{
        k: ["C4"],
        d: 1 / 2
    }, {
        k: ["C#4"]
    }, {
        k: ["D4"],
        d: 1 / 2
    }, {
        k: ["A3"]
    }, {
        k: ["A3"],
        l: true
    }, {
        k: ["G3"],
    }, {
        k: ["F3"]
    }, {
        k: ["F3"]
    }, {
        k: ["E3"],
        d: 1 / 2
    }],
    b: [{
        k: ["F3"],
        d: 1 / 2
    }, {
        k: ["E3"]
    }, {
        k: ["D3"],
        d: 1 / 2
    }, {
        k: ["D3"]
    }, {
        k: ["B2"]
      , d: 1 / 2
    }, {
        k: ["B2"]
    }, {
        k: ["C3"]
    }, {
        k: ["C3"],
        d: 1 / 2
    }]
};

var m4 = {
    s: [
        {
            k: ["G4"]
          , d: 1 / 2
        }
      , {
            k: ["A4"]
        }
      , {
            k: ["B4"]
          , l: true
        }
      , {
            k: ["A4"]
        }
      , {
            k: ["G4"]
        }
      , {
            k: ["A4"]
          , d: 1 / 2
        }
      , {
            k: ["B4"]
        }
      , {
            k: ["C5"]
          , d: 3 / 4
        }
        // ---
      , {
            k: ["D5"]
          , d: 1 / 2
        }
      , {
            k: ["D5"]
        }
      , {
            k: ["C5"]
          , l: true
        }
      , {
            k: ["B4"]
        }
      , {
            k: ["A4"]
        }
      , {
            k: ["B4"]
          , l: true
        }
      , {
            k: ["A4"]
        }
      , {
            k: ["G4"]
        }
      , {
            k: ["F4"]
          , d: 3 / 4
        }
    ],
    a: [
        {
            k: ["E4"]
          , d: 1 / 2
        }
      , {
            k: ["F#4"]
        }
      , {
            k: ["G4"]
          , l: true
        }
      , {
            k: ["F4"]
        }
      , {
            k: ["E4"]
        }
      , {
            k: ["F4"]
          , d: 1 / 2
        }
      , {
            k: ["F4"]
        }
      , {
            k: ["E4"]
          , d: 3 / 4
        }
        // ---
      , {
            k: ["F4"]
          , d: 1 / 2
        }
      , {
            k: ["G4"]
        }
      , {
            k: ["G4"]
          , d: 1 / 2
        }
      , {
            k: ["F4"]
        }
      , {
            k: ["D4"]
        }
      , {
            k: ["F4"]
        }
      , {
            k: ["E4"]
        }
      , {
            k: ["C4"]
          , d: 3 / 4
        }
    ],
    t: [
        {
            k: ["C4"]
          , d: 1 / 2
        }
      , {
            k: ["C4"]
        }
      , {
            k: ["D4"]
          , l: true
        }
      , {
            k: ["C4"]
        }
      , {
            k: ["C4"]
        }
      , {
            k: ["C4"]
          , d: 1 / 2
        }
      , {
            k: ["D4"]
        }
      , {
            k: ["G3"]
          , d: 3 / 4
        }
        // ---
      , {
            k: ["B3"]
          , d: 1 / 2
        }
      , {
            k: ["B3"]
        }
      , {
            k: ["C4"]
          , d: 1 / 2
        }
      , {
            k: ["C4"]
        }
      , {
            k: ["B3"]
          , l: true
        }
      , {
            k: ["C4"]
        }
      , {
            k: ["C4"]
        }
      , {
            k: ["A3"]
          , d: 3 / 4
        }
    ],
    b: [
        {
            k: ["C3"]
          , l: true
        }
      , {
            k: ["B2"]
        }
      , {
            k: ["A2"]
        }
      , {
            k: ["G2"]
          , l: true
        }
      , {
            k: ["A2"]
        }
      , {
            k: ["C3"]
        }
      , {
            k: ["F3"]
          , l: true
        }
      , {
            k: ["E3"]
        }
      , {
            k: ["D3"]
        }
      , {
            k: ["C3"]
          , d: 3 / 4
        }
        // ---
      , {
            k: ["B2"]
          , d: 1 / 2
        }
      , {
            k: ["G3"]
        }
      , {
            k: ["E3"]
          , d: 1 / 2
        }
      , {
            k: ["F3"]
        }
      , {
            k: ["G2"]
          , l: true
        }
      , {
            k: ["A2"]
          , l: true
          , d: 1 / 8
        }
      , {
            k: ["B2"]
          , l: true
          , d: 1 / 8
        }
      , {
            k: ["C3"]
        }
      , {
            k: ["F3"]
          , d: 3 / 4
        }
    ]
};


var s = Ul.clone({ notes: m1.s.concat(m2.s).concat(m1.s).concat(m3.s).concat(m4.s) })
  , a = Ul.clone({ notes: m1.a.concat(m2.a).concat(m1.a).concat(m3.a).concat(m4.a) })
  , t = Ul.clone({ notes: m1.t.concat(m2.t).concat(m1.t).concat(m3.t).concat(m4.t) })
  , b = Ul.clone({ notes: m1.b.concat(m2.b).concat(m1.b).concat(m3.b).concat(m4.b) })
  ;

var tracks = [
    s
  , a
  , t
  , b
];

module.exports = tracks;
