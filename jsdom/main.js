var jsdom = require("jsdom");
var fs = require("fs");

var html = fs.readFileSync("./htmlFile.html").toString();

jsdom.env({
    html: html,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
        var $ = window.$;

        $("p").append("<span>Appending...</span>");

        console.log($("body").html());
        console.log("--------------");

        var input = $("<input>");
        input.val("Test");
        input.attr("type", "text");

        $("p").after(input);
        console.log($("body").html());

        console.log("Wow, going to ★ Star the jsdom repository.");
    }
});
