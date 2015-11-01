Cheerio
=======

```sh
cd cheerio
npm i
node main.js
```

## How to use

```js
// Include cheerio
var cheerio = require("cheerio");

// Load some HTML
var $ = cheerio.load("<body></body>");

// Append a new element
$("body").append("<span>hi</span>");

// Output the final HTML
console.log($.html());
// => "<body><span>hi</span></body>"
```

## Resources

Big thanks to the [Cheerio project](https://github.com/MatthewMueller/cheerio#readme)!
