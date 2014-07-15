// Dependnecies
var Geocoder = require("node-geocoder").getGeocoder("google");
var myLocation = "New York";

// Get location
Geocoder.geocode({
    address: myLocation
}, function(err, guess) {
    if (err) { throw err; }
    if (!guess || !guess.length) {
        return console.error("No location found");
    }

    console.log(myLocation + ": (" + guess[0].latitude + ", " + guess[0].longitude + ")");
    console.log("----");
    console.log("Results:", guess);
});


