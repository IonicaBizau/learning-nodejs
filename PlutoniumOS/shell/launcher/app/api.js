var LauncherApp = module.exports = {};

var app = null;
LauncherApp.init = function (a) {
    app = a;
};

LauncherApp.show = function () {
    app.mainWindow.webContents.executeJavaScript("window.fnShow();");
    app.mainWindow.show();
};

LauncherApp.hide = function () {
    var y = 10
      , x = 35
      , interval = setInterval(function () {
          console.log(x);
            app.mainWindow.setPosition(--x, y);
            if (x === -35) {
                clearInterval(interval);
            }
        }, 100)
      ;
};
