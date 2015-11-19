// Dependencies
const jQueryPh = require("phantom-jquery");

// Constants
const HTML_FILE = __dirname + "/../index.html";

describe("check the html", () => {

    // Initial HTML
    it("the initial container text should be \"test\"", (cb) => {
        jQueryPh.open(HTML_FILE, (err, $, page, ph) => {
            expect(err).toBe(null);
            $("#container").text(bodyHtml => {
                expect(bodyHtml).toBe("Test");
                ph.exit();
                cb();
            });
        });
    });

    // After one second the HTML should be changed
    it("after 1sec the container text should be \"Hello Jasmine\"", (cb) => {
        jQueryPh.open(HTML_FILE, (err, $, page, ph) => {
            expect(err).toBe(null);
            setTimeout(() => {
                $("#container").html(bodyHtml => {
                    expect(bodyHtml).toBe("Hello Jasmine");
                    ph.exit();
                    cb();
                });
            }, 1000);
        });
    }, 10000);

    //// Test the title
    it("the page title should be \"Testing Jasmine\"", (cb) => {
        jQueryPh.open(HTML_FILE, (err, $, page, ph) => {
            expect(err).toBe(null);
            page.evaluate(function () {
                return document.title;
            }, title => {
                expect(title).toBe("Testing Jasmine");
                ph.exit();
                cb();
            });
        });
    });

    // Test click
    it("should display \"You clicked!\" when clicking the button", (cb) => {
        jQueryPh.open(HTML_FILE, (err, $, page, ph) => {
            expect(err).toBe(null);
            $(".click-me").click(function () {
                $(".result").text(function (text) {
                    expect(text).toBe("You clicked!");
                    ph.exit();
                    cb();
                });
            });
        });
    });
});
