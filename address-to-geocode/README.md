# address-to-geocode
A test using node-geocode module

## Installation
Run the following commands to download and install the application:

```sh
$ git clone https://github.com/IonicaBizau/address-to-geocode.git address-to-geocode
$ cd address-to-geocode
$ npm install
```

## Example

```js
// My Location
var myLocation = "New York";

// Handler to output data
var handler = function (err, location) {
    if (err) { throw err; }
    console.log(location);
};

require("../index")
    (myLocation, handler)
    ("Paris", handler)
  ;
```

## Documentation
### `AddressToGeocode(address, callback)`
Converts a string representing an address to geocode data.

#### Params:
* **String** *address* The searched location
* **Function** *callback* The callback function

#### Return:
* **Object** AddressToGeocode function

### `AddressToGeocode.handleLocation(guess)`
A function that handles the location. This can be overriden creating your own handler.

#### Params:
* **Array** *guess* Locations returned by Geocoder

#### Return:
* **Object** An object containing `lat` and `lng` fields.

## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
