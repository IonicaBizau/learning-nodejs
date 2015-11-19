var LimitIt = require("limit-it");

//  2
//
//
//  0      3   4   5      6
//  ^--------------$
//         ^----------------$
//             ^   -------------...
//
var l = new LimitIt(2);

function foo (input, cb) {
    setTimeout(function() {
        cb("Hello " + input, 42);
    }, 4000);
}

function bar(input, callback) {
    if (typeof input === "string") {
        l.add(foo, ["World"], callback);
    } else {
        l.add(foo, ["Mars"], callback);
    }
    //setTimeout(function() {
    //    l.add(foo, ["Mars"], callback);
    //}, 2000);
}

bar([], function (c, magicNumber) {
    console.log(c, magicNumber);
});

bar("foo", function (c, magicNumber) {
    console.log(c, magicNumber);
});

