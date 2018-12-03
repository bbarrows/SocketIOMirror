const Cylon = require("cylon");

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

let pageNumber = 1;
let socketIOConn = null;

function updatePage(page) {
    if (socketIOConn) {
        console.log('Sending SocketIO msg to update page');
        pageNumber = page; 
        io.emit('pageChange', 'reloadPage');        
    } else {
        console.log('No SocketIO connection to update page with.');
    }
}

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

  /*
  setTimeout(function () {
    pageNumber = 2;
    io.emit('pageChange', 'reloadPage');
  }, 4000);
  */
  socketIOConn = io;

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});




// Setup LeapMotion connection:

console.log('Setting up Leap Motion');

Cylon.robot({
  connections: {
    leapmotion: { adaptor: 'leapmotion' }
  },

  devices: {
    leapmotion: { driver: 'leapmotion' }
  },


  work: function(my) {
    my.leapmotion.on("frame", function(frame) {
    // console.log("frame")


  // loop through available gestures
  for(var i = 0; i < frame.gestures.length; i++){
    var gesture = frame.gestures[i];
    var type    = gesture.type;          
    // console.log(type);
      
    switch( type ){

      case "circle":
        if (gesture.state == "stop") {
          console.log('circle');
        }
        break;

      case "swipe":
        if (gesture.state == "stop") {
          console.log('swipe');
          if(pageNumber ==1) {
            updatePage(2);
          } else {
            updatePage(1);
          }
          
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
  }
}).start();

console.log('Connected to Leap Motion');
