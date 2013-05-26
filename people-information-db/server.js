var http = require("http");
var mongo = require("mongodb");
var formidable = require("formidable");
var html = require("./html.js");


// Mongo server
var server = mongo.Server("127.0.0.1", 27017);
var db = new mongo.Db('peopleInformationDb', server, { safe: true });

// Open database
db.open(function(err, db) {
    if (err) {
        process.exit(1);
    }

    db.collection("col_one", function(err, col) {
        collection = col;
    });
});

// Create server
var srv = http.createServer(function(req, res){
    if (!collection) {
        res.write("Try again later!");
        res.end();
        return;
    }

    // GET
    if(req.method === "GET"){
        // Add data page
        if(req.url == "/add"){
            res.end(html.createForm());
        }
        
        // Edit data page
        if(req.url.indexOf("edit?id=") !== -1){
            extractEditId(req.url, function(id){
                collection.findOne({"_id" : mongo.ObjectID(id)}, function(err, item) {
                    if(err) return res.end("An error ocured.");
                    // Correct id
                    if(item){
                        res.end(html.createForm(item));
                    }
                    // Wrong id
                    else{
                        res.end("An error ocured.");
                    }
		        });
            });
        }
        
        // Delete data page
        if(req.url.indexOf("delete?id=") !== -1){
            extractEditId(req.url, function(id){
                collection.findOne({"_id" : mongo.ObjectID(id)}, function(err, item) {
                    if(err) return res.end("An error ocured.");
                    
                    // Correct id
                    if(item){
                        res.end(html.createDeleteForm(item));
                    }
                    // Wrong id
                    else{
                        res.end("An error ocured.");
                    }
    	        });
            });
        }
        
        // Default page
        var items = null;
        collection.find().toArray(function(err, docs) {
            items = docs;
            res.end("<html><body>" + html.createTable(items) + "</body></html>");
        });
    }
    // POST
    else{
        // Data added
        if(req.url === "/add"){
            var form = new formidable.IncomingForm();
            var fields = null;
                
            form.parse(req, function(err, fields) {
                var objectToInsert = {
                "firstName" : fields.firstName,
                "lastName" : fields.lastName,
                "age" : fields.age,
                "gender" : fields.gender,
                };
                        
                collection.insert(objectToInsert, function(){
                    res.end(html.createThankYouMessage());
                });
            });
        }
        
        // Data edited
        if(req.url.indexOf("edit?id=") !== -1){
            var form = new formidable.IncomingForm();
            var fields = null;
                
            form.parse(req, function(err, fields) {
                var objectToEdit = {
                    $set: {
                        "firstName" : fields.firstName,
                        "lastName" : fields.lastName,
                        "age" : fields.age,
                        "gender" : fields.gender
                    }
                };
                
                extractEditId(req.url, function(id){
                    collection.update({"_id":mongo.ObjectID(id)}, objectToEdit, function(){
                        res.end(html.createThankYouMessage());
                    });
                });
            });
        }
        
        // Data deleted
        if(req.url.indexOf("delete?id=") !== -1){
            var form = new formidable.IncomingForm();
                    
            extractEditId(req.url, function(id){
                collection.remove({"_id":mongo.ObjectID(id)}, function(){
                    res.end(html.createThankYouMessage());
                });
            });
        }
    }
}).listen(8080);

// Extract ID function
function extractEditId(url, callback){
    var result = url.substring(url.indexOf("?id=") + 4);
    callback(result);
}
