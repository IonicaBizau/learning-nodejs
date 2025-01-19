var phantom = require('phantom');

phantom.create(function (ph) {
    ph.createPage(function (page) {
        page.set("onResourceReceived", function (response) {
            console.log(response.url);
        });
        page.open("http://google.com", function (status) {
            page.evaluate(function () { return document.title; }, function (result) {
                console.log('Page title is ' + result);
                ph.exit();
            });
        });
    });
});
