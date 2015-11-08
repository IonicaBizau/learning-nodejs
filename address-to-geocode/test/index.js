// My Location
var myLocation = "New York";

// Handler to output data
var handler = function (err, location) {
    if (err) { throw err; }
    console.log(location);
};

require("../index")
    (myLocation, handler)
    ("Paris", handler)
  ;
