var Plutonium = require("plutonium-core")
  , Resolution = Plutonium.Resolution
  , Messager = require("messager")
  , Abs = require("abs")
  , Electronify = require("electronify")
  ;

const LAUNCHER_PATH = Abs("~/.plutonium/shell/launcher.sock")
var res = Resolution.get();

var launcherClient = Messager.Client(LAUNCHER_PATH);
launcherClient.on("error", function (err) {
    console.log(err);
});

var app = Electronify(__dirname + "/../index.html", {
    width: res[0]
  , height: res[1]
  , resizable: false
  , frame: false
  , type: "desktop"
});
app.on("ready", function () {
    app.mainWindow.on("focus", function () {
        launcherClient.send("activateWindow");
    });
});
