exports.get = function (callback) {
    callback(null,  process.env.WALLPAPER || __dirname + "/default.png");
};
