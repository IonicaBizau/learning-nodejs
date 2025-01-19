const Electronify = require("electronify");

Electronify(`${__dirname}/../index.html`, {
     width: 580
   , height: 200
   , y: 1600
   , x: 1820
   , transparent: true
   , frame: false
   , resizable: false
   , "skip-taskbar": true
});
