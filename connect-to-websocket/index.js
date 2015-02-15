var socket = require('socket.io-client')('http://localhost:8080');
socket.on('connect', function(){
    console.log(">> Connect");
});
socket.on('welcome', function(data){
    console.log(data);
});
socket.on('disconnect', function(){
    console.log(">> Disconnect>");
});
