"use strict";

var Cylon = require("cylon");

// Drivers at:
//
// https://www.leapmotion.com/setup/desktop/



// For RPI:
// Also follw GPIO instructions from:
// https://cylonjs.com/documentation/platforms/raspberry-pi/
// Also see my project
// https://github.com/bbarrows/LeapMotionTwillioText/blob/master/index.js
// There I use the OSX/ leapmotion driver 
// With packages:
//    "cylon": "^1.3.0",
//    "cylon-firmata": "^0.24.0",
//    "cylon-gpio": "^0.30.1",
//    "cylon-i2c": "^0.26.1",
//    "cylon-leapmotion": "^0.21.0",
//
/*


Cylon.robot({
  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    led: { driver: 'led', pin: 11 }
  },


*/

// For OSX
/*
Cylon.robot({
  connections: {
    leapmotion: { adaptor: 'leapmotion' }
  },

  devices: {
    leapmotion: { driver: 'leapmotion' }
  },
*/


Cylon.robot({
  connections: {
    leapmotion: { adaptor: 'leapmotion' }
  },

  devices: {
    leapmotion: { driver: 'leapmotion' }
  },


  work: function(my) {
    my.leapmotion.on("frame", function(frame) {
      console.log("frame")


  // loop through available gestures
  for(var i = 0; i < frame.gestures.length; i++){
    var gesture = frame.gestures[i];
    var type    = gesture.type;          
    console.log(type);
      
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
  }
}).start();