"use strict";

class Bar {
    baz () {
        console.log("baz: ", this);
    }
}

function foo() {
    console.log("foo: ", this);
    setTimeout(() => {
        console.log("timeout: ", this);
        b.baz();
    }, 1000);
}

var obj = { bar: 42 };
var b = new Bar();
foo.apply(obj, []);
