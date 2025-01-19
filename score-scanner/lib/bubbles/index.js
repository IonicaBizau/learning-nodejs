module.exports = function (img, portatives) {

    var pixels = img.data
      , bubbles = []
      ;

    portatives.forEach(function (cPortative) {
        var height = cPortative[1].y - cPortative[0].y
          , width = height + 2
          ;

        function checkBubble(x1, y1, x2, y2) {
            var area = (x2 - x1) * (y2 - y1)
              , b = 0
              ;

            for (var y = y1; y < y2; ++y) {
                for (var x = x1; x < x2; ++x) {
                    var idx = (img.width * y + x) << 2;
                    if (pixels[idx] === 0) {
                        ++b;
                    }
                }
            }

            var proc = b / area;
            if (x1 > 0.21 * img.width && proc > 0.7) {
                return true;
            }
            if (proc > 0.86) {
                return true;
            } else {
                return false;
            }
        }

        cPortative.forEach(function (cLine) {
            var top = cLine.y - height
              , mid = cLine.y - height / 2
              ;

            console.log(top, mid);
            for (var x = 0; x < img.width; ++x) {
                var found = false;
                if (checkBubble(x, top, x + width, top + height)) {
                    bubbles.push({
                        x1: x,
                        y1: top,
                        x2: x + width,
                        y2: top + height
                    });
                    found = true;
                }
                if (checkBubble(x, mid, x + width, mid + height)) {
                    bubbles.push({
                        x1: x,
                        y1: mid,
                        x2: x + width,
                        y2: mid + height
                    });
                    found = true;
                }
                if (found) {
                    x += width;
                }
            }
        });
    });

    return bubbles;
};
