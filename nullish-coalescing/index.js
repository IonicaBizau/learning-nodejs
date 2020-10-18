"use strict";

const exampleData = {
  ringBearer: "Frodo Baggins",
  wizard: "Gandalf",
  sauronWins: false
};

/*
  Nullish Coalescing is a way to try and assign the value of a variable but also
  including a backup option in case the variable is null/undefined. Instead of 
  having to include "if" statements everywhere, you can simply use either
  the "||" or "??" syntax.
  Let's look at the difference between the two.
*/

// prints "Frodo Baggins" to the console
console.log(exampleData.ringBearer);

// prints "no elf found" because the first variable is undefined
console.log(exampleData.elf || "no elf found");

// prints "no elf found" because the first variable is undefined
console.log(exampleData.elf ?? "no elf found");

//
console.log("Sauron won. True or false?");
console.log(exampleData.sauronWins || "we do not know");

//
console.log("Sauron won. True or false?");
console.log(exampleData.sauronWins ?? "we do not know");

/*
  As you can see by what's printed to the console, there is a slight difference in
  how "||" and "??" are evaluated.
  "||" will return the second option if the first variable evaluates to null, undefined, OR a falsy value.
  "??" on the other hand, will return the second option only if the first variable evalutes
  to null or undefined. If the first variable is simply falsy (boolean false, NaN, etc) it will still
  return it.
*/