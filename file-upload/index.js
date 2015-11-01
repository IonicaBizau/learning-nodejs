// Dependencies
var Lien = require("lien")
  , Fs = require("fs")
  , Formidable = require("formidable")
  ;

// Constants
const DIR_UPLOADS = __dirname + "/public/uploads/";

// Init lien server
var server = new Lien({
    host: "localhost"
  , port: 9000
});

// Add page
server.page.add("/", function (lien) {
    lien.file("/index.html");
});

// Upload
server.page.add("/upload$", function (lien) {
    var form = new Formidable.IncomingForm(
        { uploadDir: DIR_UPLOADS }
    );
    form.parse(lien.req, function (err, fields, files) {
        if (!files.file) {
            return lien.end("File is missing.", 400);
        }

        Fs.rename(files.file.path, DIR_UPLOADS + files.file.name, function (err) {
            if (err) {
                return lien.end(err, 400);
            }
            lien.redirect("/");
        });
    });
});

// List
server.page.add("/upload/list", function (lien) {
    Fs.readdir(DIR_UPLOADS, function (err, files) {
        if (err) { return lien.end(err, 500); }
        files = files.filter(function (c) {
            return c !== ".gitignore";
        });

        var list = ["<ul>", files.map(function (c) {
            return ["<li>", "<a target='blank' href='/uploads/", c, "'>", c, "</a></li>"].join("");
        }).join(""), "</ul>"].join("");

        lien.end(list);
    });
});
