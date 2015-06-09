var http = require('http');
var fs = require('fs');


http.createServer(requestHandler).listen(8080);


function requestHandler(request,response) {
    // console.log(request.url);
    // console.log("METHOD: " + request.method);
    if(request.method === "GET"){
        fs.readdir(__dirname + "/" + request.url, function(err, files) {
         
        if (err) {
            response.statusCode = 500;
            response.end("A problem occurred." + "\n" + JSON.stringify(err));
            return;
        }

        var itemsProcessed = [];
        var itemsStillToProcess = files.length;

        // console.dir(files);

        if(!files.length) {
            respondToTheUser(request, response, itemsProcessed);      
            return;
        }
        
        for (var i in files) {
            (function(i) {
                fs.stat("." + request.url + "/" + files[i], function(err, stats) {
                              
                    --itemsStillToProcess;
                              
                    if (err) {
                        // console.error("Hey developer, here is somthing fishy");
                        // console.error(err);
                        if (itemsStillToProcess === 0) {
                             respondToTheUser(response, itemsProcessed);   
                        }
                        return;
                    }

                    var obj = {
                        name: files[i],
                        isDir: stats.isDirectory()
                    };
                    itemsProcessed.push(obj);

                    if (itemsStillToProcess === 0) {
                         respondToTheUser(request, response, itemsProcessed);   
                    }
                });
            })(i);
        }
        });
    }
    else{

        var header = "";
        var alreadyContent = false;
        var stream = null;
        var fileName = "";
        
        request.on("data", function(data){
            // here we are always processing headers
            header += data.toString();
            
            // we found the header/content separator
            if (data.toString().indexOf("\n\n")) {
                alreadyContent = true;
                console.log("we found the header/content separator");
                //return;
            }
            
	    // console.log(alreadyContent.toString());
	    
            if (alreadyContent) {               
                // here we have all the headers concatenated
  		// console.log(header);
  		var indexSub = header.indexOf("filename=\"")+10;
                fileName = header.substring(indexSub);
                fileName = fileName.substring(0, fileName.indexOf("\""));
       		// console.log("Filename2: " + fileName);
   		// console.log("alreadyContent = true");
		
  		// console.log(fileName);
                // varianta 2 cu stream
                if (!stream) {
                    var path = __dirname + request.url + fileName;
                    // console.log("PATH: " + path);
            	    stream = fs.createWriteStream(path);
            	    // console.log("the writestream was created");
                }
                
                var firstEmptyRow = 0;
		var lastEmptyRow = 0;
		                
                var content = data.toString();
		var lines = content.split("\n");
		
		var str = lines[3];
				
                for(var i in lines){
                	// console.log("i = " + i + " line = " + lines[i]);
                	if(lines[i] == str){
		        	firstEmptyRow = i;
		        	break;
                	}
                }

		for(var i = lines.length-1; i>=0; i--){
			if(lines[i] == str){
				lastEmptyRow = i;
				break;
			}
		}		
		// console.log(firstEmptyRow);
		// console.log(lastEmptyRow);

		content = "";
		for(var i = firstEmptyRow; i<lastEmptyRow; i++){
	 		content+=lines[i].replace("\n", "");
		}
                stream.write(content.trim());
//                return;
            }
            

            

        
            request.on("end", function(data){
                stream.end();
                var htmlContent = 
                "<html>"+
                "<body onload=\"window.setInterval(function(){history.go(-2)}, 3000)\">Thank you for upload. You will be redirected in 3 seconds.</body>" +
                "</html>"
                response.end(htmlContent);
            });
        });
    }
}



function respondToTheUser(req, res, items) {
    var currentPath = __dirname + req.url;
        var out = "<html><br/><h1 style=\"font-size: 15px\">Index of " + currentPath + "</h1><dl>";
    out+="<dd><a href=\"#\" onclick=\"history.go(-1)\">Go back</a></dd>"
    
    
        for(var i in items){
        if(items[i].isDir === true)
            out += "<dd><img style=\"margin-top: 3px;  height: 32px\" src=\"http://findicons.com/files/icons/1938/xp_icandy_1/128/closed_folder_yellow.png\" ><a href='" + items[i].name + "/'>" + items[i].name + "</a></dd>";
        else
            out += "<dd><img style=\"margin-top: 3px; margin-rigth: 15px;\" src=\"http://www.iconhot.com/icon/png/devine/32/file-3.png\" >" + items[i].name + "</dd>";
        }


        out += "</dl>" +
        // HTML FORM FOR FILE UPLOAD
        "<br><br><form action='" + req.url + "' method=\"post\" enctype=\"multipart/form-data\">"+
        "<input type=\"file\" name=\"uploadFile\">"+
        "<input type=\"submit\" value=\"Upload\" >"+
        "</form>" +
        "</html>"
        res.end(out);
}
