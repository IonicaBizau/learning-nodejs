"use strict";

const showdown = require("showdown");


let converter = new showdown.Converter();

console.log(converter.makeHtml(`
## Hello World
Hey

\`\`\`js
console.log(42);
\`\`\`
`));
