// Dependencies
var WDownloader = require("../lib");

// Download Google index page
var google = new WDownloader({
    routes: ["/"],
    domain: "http://localhost:9000"
});

google.download(__dirname + "/localhost", function (err) {
    console.log(err || "Downloaded Google.com");
});
