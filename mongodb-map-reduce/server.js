var http = require("http");
var mongo = require("mongodb");

// Database config
var firstCol = "col_one";
var reduceCol = "col_two";

// Mongo server
var server = mongo.Server("127.0.0.1", 27017);
var db = new mongo.Db("test", server, { safe: true });

// Open database
db.open(function(err, db) {
    if (err) {
        process.exit(1);
    }
});

// Create server
var srv = http.createServer(function(req, res){
    // Write the content of col_one
    res.write("ITEMS FROM test DB, collection: " + firstCol + "\n");
    
    // Print items from col_one
    printItems(firstCol, res, function(err, collection) {
        if (err) { return res.end("Something went wrong.:("); }
        
        // Start reduce function
        var mapFunction1 = function() {
            emit(this.cust_id, this.price);
        };
        
        var reduceFunction1 = function(keyCustId, valuesPrices) {
            return Array.sum(valuesPrices);
        };
        
        collection.mapReduce(
            mapFunction1,
            reduceFunction1,
            { out: reduceCol }, 
            
            function() {    
                // Show the items from second collection
                res.write("ITEMS FROM test DB, collection: " + reduceCol + "\n");
                printItems(reduceCol, res, function(err) {
                    if (err) { return res.end("Something went wrong.:("); }  
                    res.end();
                });
            }
        );
    });
}).listen(8080);

function printItems(collection, res, callback) {
    db.collection(collection, function(err, col) {
        if(err) { return callback(err) }
        
        col.find().toArray(function(err, item) {
            if(err) { return callback(err) }
            
            res.write(JSON.stringify(item, null, 4) + "\n\n");
                
            callback(null, col);
        });
    });
}

