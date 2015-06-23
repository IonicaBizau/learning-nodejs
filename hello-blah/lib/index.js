/**
 * HelloBlah
 * Displays and returns a *Hello <world>!* message.
 *
 * @name HelloBlah
 * @function
 * @param {String} world The world you want to say *Hello* to (default: `"World"`).
 * @return {String} The *Hello <world>!* message.
 */
function HelloBlah(world) {
    world = world || "World";
    var message = "Hello " + world + "!";
    console.log(message);
    return message;
}

module.exports = HelloBlah;
