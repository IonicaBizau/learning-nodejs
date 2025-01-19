module.exports = function (img) {
    var pixels = img.data
      , portatives = []
      , red = []
      ;

    for (var y = 0; y < img.height; y++) {
        var isPort = true;
        var bw = {
            b: 0
          , w: 0
        };
        for (var x = 0; x < img.width; x++) {
            var idx = (img.width * y + x) << 2;
            if (pixels[idx] === 255) {
                ++bw.w;
            } else {
                ++bw.b;
            }
        }
        if (bw.b > img.width / 2) {
            red.push(y);
        }
    }

    var intervals = [];

    var cInterval = { s: -1, e: -1 };
    red.forEach(function (c, i) {
        if (cInterval.s === -1) {
            cInterval.s = c;
        }
        if (c - red[i - 1] > 2 || i === red.length - 1) {
            cInterval.e = i === red.length - 1 ? c : red[i - 1];
            intervals.push(cInterval);
            cInterval = { s: c, e: -1 };
        }
    });

    intervals.forEach(function (cInt) {
        var middle = Math.round((cInt.s + cInt.e) / 2);
        portatives.push({
            y: middle
        });
    });

    var res = [];
    for (var i = 0; i < portatives.length / 5; ++i) {
        res.push(portatives.slice(i * 5, (i + 1) * 5));
    }

    return res;
};
