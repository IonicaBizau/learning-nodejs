var mongo = require("mongodb");

var db = new mongo.Db("stream", new mongo.Server("localhost", 27017), { w: 1 });

function checkError(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
}

db.open(function(err, db) {

    checkError(err);

    db.collection("item", function(err, collection) {

        checkError(err);

        collection.remove(function(err) {
        
            checkError(err);

            var SIZE = 200000;
            var count = 0;

            for (var i = 0; i < SIZE; i++) {
                var item = {
                    name: "Gabriel Petrovay " + (i + 1),
                    number: i,
                    randomString: random(25)
                };
                collection.insert(item, function() {
                    console.log("Inserted " + count);
                    if (++count  === SIZE) {
                        db.close();
                    }
                });
            }
        });
    });

});


function random(length) {

    if (typeof length !== 'number' || length < 1) {
        length = 10;
    }

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible[Math.floor(Math.random() * possible.length)];
    }

    return text;
}

