// Dependencies
var $ = require("jquerygo");

// Constants
const HTML_FILE = __dirname + "/../index.html";

// Configs
$.config.debug = false;

describe("check the html", () => {

    // Initial HTML
    it("the initial container text should be \"test\"", (cb) => {
        $.visit(HTML_FILE, () => {
            $("#container").text(bodyHtml => {
                expect(bodyHtml).toBe("Test");
                cb();
                $.close();
            });
        });
    });

    // After one second the HTML should be changed
    it("after 1sec the container text should be \"Hello Jasmine\"", (cb) => {
        debugger
        $.visit(HTML_FILE, () => {
            debugger
            setTimeout(() => {
                debugger
                $("#container").html(bodyHtml => {
                debugger
                    expect(bodyHtml).toBe("Hello Jasmine");
                    $.close();
                    cb();
                });
            }, 1000);
        });
    }, 10000);

    //// Test the title
    //it("the page title should be \"Testing Jasmine\"", () => {
    //    $.visit(HTML_FILE, () => {
    //        $.getPage(page => {
    //            page.evaluate(() => {
    //                return document.title;
    //            }, title => {
    //                console.log(">>>>", title);
    //                expect(title).toBe("Testing Jasmine");
    //            });
    //        });
    //    });
    //});
});
