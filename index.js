// Dependnecies
var Geocoder = require("node-geocoder").getGeocoder("google");

/**
 * AddressToGeocode
 * Converts a string representing an address to geocode data.
 *
 * @name AddressToGeocode
 * @function
 * @param {String} address The searched location
 * @param {Function} callback The callback function
 * @return {Object} AddressToGeocode function
 */
var AddressToGeocode = function (address, callback) {
    Geocoder.geocode({
        address: address
    }, function(err, guess) {
        if (err) { return callback(err); }
        callback(null, AddressToGeocode.handleLocation(guess));
    });
    return AddressToGeocode;
};

/**
 * handleLocation
 *
 * @name handleLocation
 * @function
 * @param {Array} guess Locations returned by Geocoder
 * @return {Object} An object containing `lat` and `lng` fields.
 */
AddressToGeocode.handleLocation = function (guess) {
    if (!guess || !guess.length) {
        return {};
    }
    return {
        lat: guess[0].latitude,
        lng: guess[0].longitude
    };
};

module.exports =  AddressToGeocode;
