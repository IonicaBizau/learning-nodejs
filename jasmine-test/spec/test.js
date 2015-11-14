const IsThere = require("is-there")
    , Reporter = require("jasmine2-reporter").Jasmine2Reporter
    ;

jasmine.getEnv().addReporter(new Reporter());

describe("check the application files", () => {
    it("should find the index.html file", () => {
        expect(IsThere("index.html")).toBe(true);
    });
    it("should find the js/main.js file", () => {
        expect(IsThere("js/main.js")).toBe(true);
    });
});
