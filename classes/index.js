"use strict";

class Foo {
    method (name) {
        console.log("Foo: ", name);
    }
    method2 (name) {
        console.log("Foo: ", name);
    }
}

class Bar extends Foo {
    constructor () {
        super();
    }
    method (name) {
        console.log("Bar: ", name);
    }
}

var b = new Bar();
b.method("test");
b.method2("test");
