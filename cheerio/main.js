var fs = require("fs");
var cheerio = require('cheerio');

var html = fs.readFileSync("./htmlFile.html").toString();

// <p>Testing the jsDom NodeJS module.</p>
var $ = cheerio.load(html);

$("p").append("<span>Appending...</span>");
console.log($.html());

var input = $("<input>");
input.val("Test");
input.attr("type", "text");
$("p").after(input);

console.log("------------------------------");
console.log($.html());
console.log("Wow, going to ★ Star the cheerio repository.");
