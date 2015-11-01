
// Dependencies
var pdf = require('pdfcrowd');

// Configs
var config = require("./config")
  , client = new pdf.Pdfcrowd(config.username, config.apiKey)
  ;

// Save to file
var callback = pdf.saveToFile("1123.pdf");
callback.end = function () {
    console.log("File saved successfully.");
}

callback.error = function (error, status) {
    console.log(">? ERROR::", error, status);
}

client.convertURI('google.com', callback);
