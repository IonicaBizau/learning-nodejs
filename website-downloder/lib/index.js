// Dependencies
var Request = require("request")
  , Fs = require("fs")
  , Streamp = require("streamp")
  , Ul = require("ul")
  , IsThere = require("is-there")
  , Cheerio = require("cheerio")
  ;

// Constants
const INDEX_FILE = "/index.html";

function WDownloader(options) {
    var self = this;
    if (self.constructor !== WDownloader) {
        return new WDownloader(options);
    }
    self.dest = options.dest || options.domain;
    self.paths = options.paths || ["/"];
    self.domain = options.domain;
}

WDownloader.prototype._d = function (url, dest, callback) {

    if (typeof dest === "function") {
        callback = dest;
        dest = this.dest + url;
    }

    if (url.charAt(0) !== "/") {
        // TODO Download other domain things
        return callback();
    }

    dest = Streamp.writable(dest);
    Request(this.domain + url).pipe(dest);
    dest.on("error", function (err) {
        // TODO
    });
};

WDownloader.prototype.createPath = function (path, content, callback) {
    var self = this;
    Fs.writeFile(self.dest + path + "/index.html", content, callback);
};

WDownloader.prototype.downloadPage = function (path, callback) {
    var self = this;
    Request(self.domain + path, function (err, res, body) {
        if (err) { return callback(err); }
        // TODO What happens if the body is empty?
        if (!body) { return callback(); }
        var $ = Cheerio.load(body);

        // Collect images
        var $img = $("img");
        $img.each(function () {
            var $this = $(this);
            self._d($this.attr("src"), function (err) {
                console.log("> Downloaded...");
            });
        });

        // CSS
        $("link").each(function () {
            var $this = $(this)
              , href = $this.attr("href")
              ;

            self._d(href, function () {

            });
        });

        self.createPath(path, body, function () {

        });
    });
};

WDownloader.prototype.download = function (dest, callback) {
    var self = this;
    self.dest = dest;
    Fs.mkdir(dest, function (err) {
        if (err) { return callback(err); }
        self.downloadPage(self.paths[0], function (err) {
            debugger
        });
    });
};

module.exports = WDownloader;
