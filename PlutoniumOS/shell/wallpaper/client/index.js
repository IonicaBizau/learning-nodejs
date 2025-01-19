
setTimeout(function() {

    debugger
var Remote = require('remote')
  , Wallpaper = Remote.require("./wallpaper")
  ;

Wallpaper.get(function (err, data) {
    document.getElementById("wallpaper").setAttribute("src", data);
});
}, 1000);
