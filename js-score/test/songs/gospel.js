var Ul = require("ul");

var m1 = [
    {
        k: ["G4", "C5", "E5"]
      , d: 1 / 4
      , l: true
    },
    {
        k: ["A4", "C5", "F5", "Eb5"]
      , d: 1 / 8
      , l: true
    }
]

var tracks = [
    { notes: m1 },
    { notes: [
        {
            k: ["Bb4"]
          , d: 1 / 64
          , l: true
        },
        {
            k: ["C5"]
          , l: true
          , d: 63 / 64
        },
        {
            k: ["Eb5"]
          , d: 4 / 6
          , l: true
        },
        {
            k: ["C5"]
          , d: 6 / 48
          , l: true
        },
        {
            k: ["Bb4"]
          , d: 2 / 48
          , l: true
        }
    ]}
];

module.exports = tracks;
