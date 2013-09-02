var pdf = require('pdfcrowd');
var config = require("./config");
var client = new pdf.Pdfcrowd(config.username, config.apiKey);

var callback = pdf.saveToFile("1123.pdf");
callback.end = function () {
    console.log("File saved successfully.");
}

callback.error = function (error, status) {
    console.log(">? ERROR::", error, status);
}

client.convertURI('http://aievadfasdfhaskdjfhaskdjea.net', callback);
