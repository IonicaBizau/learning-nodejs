var fs = require("fs");
var cheerio = require('cheerio');

var html = fs.readFileSync("./htmlFile.html").toString();

// <p>Testing the jsDom NodeJS module.</p>
var $ = cheerio.load(html);

var $templ = $(".template").clone();
$templ.find(".text").text("Changed");
$templ.removeClass("template");

$(".template").after($templ);

console.log($.html());

var $templ = $("[data-key='template']").clone();
$templ.find(".text").text("Changed");
$templ.removeClass("template");

$("[data-key='template']").after($templ);

console.log($.html());
