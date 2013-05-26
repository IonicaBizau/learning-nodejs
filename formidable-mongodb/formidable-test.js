var formidable = require('formidable'),
    http = require('http'),
    util = require('util')
    static = require('node-static');

var file = new(static.Server)('./public');
    

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
  }

  req.on('end', function(){
            file.serve(req, res);
        });
}).listen(8080);
