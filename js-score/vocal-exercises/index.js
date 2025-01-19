var baudio = require("baudio");

var tau = Math.PI * 2;

var melody = [
    440,
    466.16,
    493.88,
    523.25,
    554,
    587.33,
    622.25,
    659.25,
    698.46,
    739.99,
    783.99,
    830.61,
    880.00
];

var b = baudio(function (t) {

    var n = t * 0.3 % 3 + 1;
    var f = Math.sin(tau * tau / ((n * 6 % 1 + 0.5) * 2));
    var drums = Math.sin(tau * n * f);
    var now = 0;
    now = drums;
    var note = melody[Math.floor((t * 0.3) % melody.length)];

    now += sawtooth(note) + sawtooth(note + 3) + square(note);

    function sin (freq) {
        return Math.sin(tau * t * freq);
    }

    function square (freq) {
        return Math.sin(tau * t * freq) < 0 ? -1 : 1;
    }

    function sawtooth (freq) {
        return t % (1 / freq) * freq * 2 - 1;
    }

    return now;
});

b.play();
