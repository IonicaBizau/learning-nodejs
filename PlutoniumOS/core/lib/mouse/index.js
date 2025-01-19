// Dependencies
var Robot = require("robotjs");

var Mouse = module.exports = {};

Mouse.get = function () {
    return Robot.getMousePos();
};

Mouse.move = function (x, y) {
    return Robot.moveMouse(x, y);
};
