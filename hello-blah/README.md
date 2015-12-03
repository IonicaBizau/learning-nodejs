# blah-test [![Support this project][donate-now]][paypal-donations]

Testing the new version of blah.

## Installation

```sh
$ npm i --save blah-test
```

## Example

```js
// Require the library file
var HelloBlah = require("blah-test");

// Call the function exported by library
HelloBlah();
HelloBlah("Blah");
```

## Documentation

### `HelloBlah(world)`
Displays and returns a *Hello <world>!* message.

#### Params
- **String** `world`: The world you want to say *Hello* to (default: `"World"`).

#### Return
- **String** The *Hello <world>!* message.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2013#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
