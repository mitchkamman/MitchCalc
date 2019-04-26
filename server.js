var express = require('express');
var app = express();
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("app listening at http://%s:%s", host, port)
 })
var io = require('socket.io').listen(server);
var path = require('path');

app.use(express.static(__dirname+'/public'));
app.get('/', function (req, res) {
   if (req.url == "/"){
      res.sendFile(path.join(__dirname+'/index.html'));
   }
   else{
      res.sendFile(path.join(__dirname+req.url))
   }
   
})

io.on("connection", function(socket) {
    socket.on("sendCalc", function(sent_msg, callback) {
        io.sockets.emit("update messages", sent_msg);
        callback();
    });
});
