var http = require("http");
var static = require('node-static');
var mongo = require('mongodb');
var formidable = require('formidable');

// Mongo server
var server = mongo.Server("127.0.0.1", 27017);
var db = new mongo.Db('peopleInformationDb', server, { safe: true });

// Node static: public_html folder
var file = new(static.Server)('./public');

// Create server
var srv = http.createServer(function(req, res){
    if(req.method === "GET"){
        req.on('end', function(){
            file.serve(req, res);
        });
    }
    else{       
        var form = new formidable.IncomingForm();
        var fieldsInformation = null;
        form.parse(req, function(err, fields) {
            fieldsInformation = fields;
        });   
        
        db.open(function(err, db) {
            if (err) return res.end("A problem ocured. Try again later.");
                    
            db.collection("col_one", function(err, myCol) {
                if (err) return res.end("A problem ocured. Try again later.");
                
                var objectToInsert = {
                    "firstName" : fieldsInformation.firstName,
                    "lastName" : fieldsInformation.lastName,
                    "age" : fieldsInformation.age,
                    "gender" : fieldsInformation.gender,
                };
                
                myCol.insert(objectToInsert, function(){
                    res.end("Successfully saved.");
                    db.close();
                });
            });
        });
    }
});

srv.listen(8080);
