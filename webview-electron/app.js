// Dependencies
var Electronify = require("electronify");

// Create the app
var app = Electronify(__dirname + "/index.html");

// This is the dev tools for debugging our app
// I will show you now how to open the dev tools of the web view window
app.on("ready", function () {
    app.mainWindow.webContents.openDevTools();
});
