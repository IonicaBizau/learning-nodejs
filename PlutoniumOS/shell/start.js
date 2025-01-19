var Electroner = require("electroner")
  , Messager = require("messager")
  , Fs = require("fs")
  , IsThere = require("is-there")
  , Abs = require("abs")
  ;

const LAUNCHER_PATH = __dirname + "/launcher/app"
    , WALLPAPER_PATH = __dirname + "/wallpaper/app"
    , SERVER_PATH = Abs("~/.plutonium/shell/main.sock")
    ;

if (IsThere(SERVER_PATH)) {
    Fs.unlinkSync(SERVER_PATH);
}

var server = Messager.Server(SERVER_PATH);
server.on("ready", function () {
    console.log("Plutonium Shell server is ready.");
    Electroner(LAUNCHER_PATH, {
        "enable-transparent-visuals": true
      , "disable-gpu": true
    });
});
server.on("launcherReady", function () {
    Electroner(WALLPAPER_PATH);
});
