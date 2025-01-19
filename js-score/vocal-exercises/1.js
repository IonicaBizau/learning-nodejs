var baudio = require("baudio");
var melody = [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
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
var rhythm = [3];
var xrhythm = [1, 3, 6, 3, 1, 3, 6, 12, 6, 24, 1, 3, 6, 3, 6, 3, 6, 3, 6, 12, 3, 1, 6, 6, 6, 6, 3, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 24];
var phase = [1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3];
var d = snare(),
    e = snare();

var tau = Math.PI * 2;

var b = baudio(function(t) {
    var m = melody[Math.floor(t * 1.5) % melody.length];
    var r = rhythm[Math.floor(t * 3) % rhythm.length];
    var q = xrhythm[Math.floor(t * 3) % xrhythm.length];
    var p = t > 24 ? phase[Math.floor(t * r) % phase.length] : 1;

    return synth(m) * (t > 8) // or 82 -- DRONE PITCH
        + d(t % (1 / r / 2)) * 0.5 * (t > 4) + e(t % (1 / q)) * 0.5;

    function synth(x) {
        return 0;
        return saw(x) * 0.7 // SYNTH VOL.
            + saw(x + x / m * p) * 0.5 * (t > 12) + sin(x * 3 + saw(1 / x / 10)) * 0.2 * (t > 16) + sin(x * 4 + x / m * p) * 0.1 * (t > 20) + sin(x * 5 + 1 / 2) * 0.05 * (t > 24) + saw(x * 7 + 1) * 0.1 * (t > 24);
    }

    function sin(x) {
        return Math.sin(2 * Math.PI * t * x)
    }

    function saw(x) {
        return 1 - t % (1 / x) * x * 2
    }
});

function snare() {
    var low0 = lowpass(30);
    var low1 = lowpass(80);
    var low2 = lowpass(10);

    return function(t) {
        return low0(snare(80, t)) * 4 // SNARE TAMBRE + VOL
            + low1(snare(40, t + 1 / 60)) * 7 + low2(snare(15, t + 1 / 30)) * 5;

        function snare(n, o) {
            var scalar = Math.max(0, 0.95 - (o * n) / ((o * n) + 1));
            return sin(sin(sin(1303) * 139) * 4217) * scalar;
        }

        function sin(x) {
            return Math.sin(2 * Math.PI * t * x)
        }
    };

    function lowpass(n) {
        var value = 0;
        return function(x) {
            return value += (x - value) / n
        }
    }
}

b.play();
