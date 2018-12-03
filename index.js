const leapjs      = require('leapjs');
const controller  = new leapjs.Controller({enableGestures: true});

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

let pageNumber = 1;


// To serve static content:
// https://expressjs.com/en/starter/static-files.html
// 
// app.use(express.static('public'))

app.get('/', function(req, res){
  //console.log(req);
  res.sendFile(__dirname + `/public/page${pageNumber}.html`);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    io.emit('pageChange', 'reloadPage');
    pageNumber = 2; 
  });

  setTimeout(function () {
    pageNumber = 2;
    io.emit('pageChange', 'reloadPage');
  }, 4000);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});




// Setup LeapMotion connection:

console.log('Setting up Leap Motion');

controller.on('deviceFrame', function(frame) {
  // loop through available gestures
  for(var i = 0; i < frame.gestures.length; i++){
    var gesture = frame.gestures[i];
    var type    = gesture.type;          

    switch( type ){

      case "circle":
        if (gesture.state == "stop") {
          console.log('circle');
        }
        break;

      case "swipe":
        if (gesture.state == "stop") {
          console.log('swipe');
        }
        break;

      case "screenTap":
        if (gesture.state == "stop") {
          console.log('screenTap');
        }
        break;

      case "keyTap":
        if (gesture.state == "stop") {
          console.log('keyTap');
        }
        break;

      }
    }
});

controller.connect();

console.log('Connected to Leap Motion');
