var PNG = require('pngjs').PNG;
var fs = require('fs');
var GetPortatives = require("./portative");
var GetBubbles = require("./bubbles");

function ScoreScanner(path) {
    this.path = path;
}

ScoreScanner.prototype.scan = function(callback) {
    fs.createReadStream(this.path).pipe(new PNG({
        filterType: 4
    })).on('parsed', function() {

        var img = this
          , pixels = img.data
          ;

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;

                // invert color
                var r = this.data[idx];
                var g = this.data[idx + 1];
                var b = this.data[idx + 2];

                this.data[idx] = this.data[idx + 1] = this.data[idx + 2] = (r + g + b) / 3 > 200 ? 255 : 0;

                // and reduce opacity
                //this.data[idx + 3] = this.data[idx + 3] >> 1;
            }
        }

        // Scanning
        var portatives = GetPortatives(this);
        var bubbles = GetBubbles(this, portatives);

        // Coloring
        portatives.forEach(function (cPort) {
            cPort.forEach(function (cLine) {
                for (var x = 0; x < img.width; x++) {
                    var idx = (img.width * cLine.y + x) << 2;
                    pixels[idx] = 255;
                    pixels[idx + 1] = 0;
                    pixels[idx + 2] = 0;
                }
            });
        });

        bubbles.forEach(function (cBubble) {
            for (var y = cBubble.y1; y < cBubble.y2; ++y) {
                for (var x = cBubble.x1; x < cBubble.x2; ++x) {
                    var idx = (img.width * y + x) << 2;
                    pixels[idx] = 0;
                    pixels[idx + 1] = 255;
                    pixels[idx + 2] = 0;
                }
            }
        });


        this.pack().pipe(fs.createWriteStream('out.png'));
    });
};

module.exports = ScoreScanner;
