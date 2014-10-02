// Dependencies
var Statique = require("statique")
  , Http = require('http')
  ;

// Create server
Http.createServer(new Statique({
    root: __dirname + "/receiver"
}).setRoutes({
    "/": "/html/index.html"
}).serve).listen(8000);

Http.createServer(new Statique({
    root: __dirname + "/sender"
}).setRoutes({
    "/": "/html/index.html"
}).serve).listen(9000);
