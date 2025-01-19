var Electronify = require("electronify")
  , IsThere = require("is-there")
  , Gkm = require("gkm")
  , Api = require("./api")
  ;

var app = Electronify(__dirname + "/../index.html", {
     width: 200//500
   , height: 800
   , resizable: false
   , y: 10
   , x: 35
   , frame: false
   , "skip-taskbar": true
   , "always-on-top": true
   , transparent: true
});

//app.on("ready", function () {
//    app.mainWindow.openDevTools();
//});

var isZeroX = 0
  , timer = null
  ;

Api.init(app);

Gkm.events.on('mouse.moved', function(data) {
    data = data[0].trim().split(",").map(Number);
    if (data[0] === 0) {
        if (++isZeroX === 10) {
            Api.show();
        }
    }  else {
        isZeroX = 0;
    }
    console.log(data);
});
