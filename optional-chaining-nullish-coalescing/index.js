"use strict";

const exampleData = {
  team: {
    players: {
      bob: {
        name: 'bob'
      }
    }
  }
};

/*
  NOTE: MUST BE USING VERSION 14+!!! (or Typescript)
  Optional chaining allows you to try and access properties of an object without risking
  an error being thrown in your application. Instead of throwing a value, the assignment
  will simply be "undefined".
  Simply add a "?" after any fields that might be null/undefined.
*/

console.log(exampleData.team?.players?.bob?.name); // prints "bob" to the console
console.log(exampleData.team?.players?.jim?.name); // prints "undefined" to the console

