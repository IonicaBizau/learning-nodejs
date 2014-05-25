var Overlap   = require ("overlap")
  , JAsciimo  = require ("jasciimo").Figlet
  , Couleurs  = require ("couleurs")
  , ImageToAscii = require ("image-to-ascii")
  , myImage = new ImageToAscii ({
        resize: {
            height: "100%"
          , width:  "50%"
        }
      , colored: true
      , multiplyWidth:1
    })
  ;


myImage.convert("./jo.png", function(err, converted) {
    console.log(converted);
    setTimeout(function () {

        var words = [
                "Today".rgb(227, 32, 32)
              , "is".rgb(227, 165, 32)
              , "a".rgb(220, 227, 32)
              , "special".rgb(110, 227, 32)
              , "day".rgb(32, 136, 227) + "!"
            ]
          , i = -1
          , interval = setInterval(function () {
                var w = words[++i];
                if (!w) {
                    clearInterval(interval);
                    return setTimeout(function () {
                        JAsciimo.write("Happy", "starwars", function(happy) {
                            JAsciimo.write("Birthday", "Cricket", function(birthday) {
                                JAsciimo.write("Jo  Luijten", "Basic", function(name) {
                                    console.log(
                                        Overlap({
                                            // happy birthday
                                            who: Overlap({
                                                who: happy
                                              , with: birthday
                                              , where: {
                                                    x: 10
                                                  , y: 4
                                                }
                                            })
                                                // name
                                          , with: name
                                          , where: {
                                                x: 20
                                              , y: 13
                                            }
                                        })
                                    )
                                });
                            });
                        });
                    }, 1000);
                }
                console.log(w)
            }, 700)
          ;
    }, 3000)
});
