// Dependencies
var cheerio = require("cheerio")
  , readFile = require("read-utf8")
  ;

// Read the HTML file
var html = readFile("./htmlFile.html");

// <p>Testing the jsDom NodeJS module.</p>
var $ = cheerio.load(html);

// Apend some html
$("p").append("<span>Appending...</span>");
console.log($.html());
console.log("------------------------------");

// Create an input
var input = $("<input>");
input.val("Test");
input.attr("type", "text");
$("p").after(input);

console.log($.html());
console.log("Wow, going to ★ Star the cheerio repository.");

// How to clone
var $templ = $(".template").clone();
$templ.find(".text").text("Changed");
$templ.removeClass("template");

$(".template").after($templ);

console.log($.html());

// Clone another template
var $templ = $("[data-key='template']").clone();
$templ.find(".text").text("Changed");
$templ.removeClass("template");

$("[data-key='template']").after($templ);

console.log($.html());
