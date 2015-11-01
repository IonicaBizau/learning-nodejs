// Dependencies
var Fs = require("fs");

// Create the write stream
var log = Fs.createWriteStream("log.txt", {"flags": "a"})
  , count = 0
  , timer = null
  ;

// Write data
timer = setInterval(function () {
    if (count < 10) {
        console.log("Count:", count);
        return log.write((++count).toString());
    }
    log.end("END");
    clearInterval(timer);
}, 500);

