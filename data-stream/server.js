var http = require("http");

var mongo = require("mongodb");

var db = new mongo.Db("stream", new mongo.Server("localhost", 27017), { w: 1 });
var collection = null;

db.open(function(err, db) {

    if (err) {
        process.exit(1);
    }

    db.collection("item", function(err, col) {
        collection = col;
    });
});

http.createServer(function(req, res) {

    if (!collection) {
        res.write("Try again later!");
        res.end();
        return;
    }

    if(req.url.indexOf("/page") !== -1){ //the url conatains "page"
	var pageId = parseInt(extractNumbers(req.url));
	
	var cursor = collection.find().skip(pageId*20).limit(20);
	
	var nextButton = "<a href=\"" + (pageId+1).toString() + "\"><button>Next</button></a>";
	var backButton = "<a href=\"" + (pageId-1).toString() + "\"><button>Back</button></a>";
	var pageButtons = nextButton;
	if(pageId > 1)
		pageButtons = backButton + nextButton;

        res.write("<html><body>");
        res.write(pageButtons);
        
        res.write("<h1>Page number: " + pageId.toString() + "</h1>");
	res.write("<ol>");
		    
	var itemId = 0;
		    
        cursor.each(function(err, item) {
		
		if (item == null) {
			res.write("</ol>");      	        	
		        res.write(pageButtons);
			res.write("</body></html>");
			res.end();
		}
	
		res.write("<li>");
		res.write(JSON.stringify(item));
		res.write("</li>");
	});
    }
    else{
	    switch (req.url) {

		// **********************************************************************
		case "/array":
		    collection.find().toArray(function(err, docs) {

		        if (err) {
		            res.write("Cound not read from collection: item");
		            res.end();
		            return;
		        }

		        res.writeHead(200, { "Content-Type": "text/plain" });

		        for (var i in docs) {
		            res.write(JSON.stringify(docs[i]));
		        }

		        res.end();
		    });
		    break;
	    
		// **********************************************************************
		case "/cursor/":

		    var cursor = collection.find().limit(20);

		    res.writeHead(200, { "Content-Type": "text/html" });
		    // Next button
		    var nextButton = "<a href=\"page/1\"><button>Next</button></a>";
		    
		    res.write(nextButton);
		    res.write("<ul>");
		    
		    var itemId = 0;
		    
		    cursor.each(function(err, item) {

		        if (item == null) {
		            res.end();
		        }
	      	        res.write("<li>");
		        res.write(JSON.stringify(item));
		        if(itemId != 19){
	      	        	res.write("</li>");
	      	        	itemId++;
	      	        }
	      	        else{
	      	        	res.write("</li></ul>");      	        	
	       		        // Next button
				res.write(nextButton);
	      	        }
		    });



		    break;

		// **********************************************************************
		default: 
		    res.writeHead(200, { "Content-Type": "text/html" });
		    res.end("<ul><li><a href='/array/'>Array</a> (slow)</li><li><a href='/cursor/'>Cursor</a> (fast)</li></ul>");
	    }
    }

}).listen(8080);


function extractNumbers(str) {
	var out = str;
	out = out.substring(out.indexOf("page/")+5);
	try{
	var i = parseInt(out);
	}
	catch(err){
	out = 0;
	}
	return out;
}
