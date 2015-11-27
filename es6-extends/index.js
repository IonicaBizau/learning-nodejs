"use strict";

class Person {
    constructor (name) {
        this.name = name;
    }
    getName () {
        return this.name;
    }
}

class Worker extends Person {
    constructor (name, type) {
        super(name);
        this.type = type;
    }
    work () {
        console.log(this.getName() + " is working.");
        console.log(this.getName() + " is a " + this.getType() + ".");
    }
    getType () {
        return this.type;
    }
}

var w = new Worker("Johnny", "builder");
w.work();
