"use strict";

const metaRemarkable = require('meta-remarkable');

let text = `---
Title: Hello World
Author: Johnny B.
Tags:
    - hello
    - world
---

## Hello World
This is your blog post.`;

var md = new metaRemarkable();
var res = md.render(text);
debugger
console.log(res.meta); // the parsed yaml->json
console.log(res.html); // the parsed md->html
