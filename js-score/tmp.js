var baudio = require('baudio');
var melody = [
    5, 3, 1, 3, 5, 5, 5, 5, 3, 3, 3, 3, 5, 8, 8, 8,
    5, 3, 1, 3, 5, 5, 5, 5, 3, 3, 5, 3, 1, 1, 1, 1
];
var b = baudio(function (t) {
    var m = melody[Math.floor(t * 4 % melody.length)]
    return sin(441 * Math.pow(2, m / 12)) * sin(2);
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
});
b.play();
