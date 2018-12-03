
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

let pageNumber = 1;

app.use(express.static('public'))

app.get('/', function(req, res){
  //console.log(req);
  res.sendFile(__dirname + `/page${pageNumber}.html`);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    io.emit('pageChange', 'page2.html');
    pageNumber = 2;
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
