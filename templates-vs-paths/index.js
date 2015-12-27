var Benchtable = require('benchtable');
var Path = require("path")

var suite = new Benchtable();

// add functions
suite
  .addFunction('templates', function(s) { return `${__dirname}/path/to/foo.js`; })
 .addFunction('paths', function(s) { return __dirname + "/path/to/foo.js"; })
 .addFunction('concat', function(s) { return __dirname.concat("/path/to/foo.js"); })
 .addFunction('join', function(s) { return Path.join(__dirname, "path/to/foo.js"); })

 .addInput("foo")

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  console.log(this.table.toString());
})

// run async
.run({ 'async': false });
