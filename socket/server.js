const SerialPort = require('serialport');
const xbee_api = require('xbee-api');
const C = xbee_api.constants;

const firebase = require('firebase');
const firebaseConfig = {
  apiKey: "AIzaSyAiY3bwulQUtLDgwXkolunJFDjG8gmRMoQ",
  authDomain: "spaceinvaders-4e5a9.firebaseapp.com",
  databaseURL: "https://spaceinvaders-4e5a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spaceinvaders-4e5a9",
  storageBucket: "spaceinvaders-4e5a9.appspot.com",
  messagingSenderId: "861620168064",
  appId: "1:861620168064:web:0f43262878120e69948d65"
};

firebase.initializeApp(firebaseConfig)

//var storage = require("./storage")
require('dotenv').config()

const SERIAL_PORT = process.env.SERIAL_PORT;

var xbeeAPI = new xbee_api.XBeeAPI({
  api_mode: 1
});

let serialport = new SerialPort(SERIAL_PORT, {
  baudRate: parseInt(process.env.SERIAL_BAUDRATE) || 9600,
}, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

serialport.on("open", function () {
  var databdd;
  function readUserData() {

    firebase.database().ref('testvalue').child("value").once('value')
      .then(function(snapshot) {
        databdd = snapshot.val()
        return databdd
      })
  }

  setInterval(() => {
    //console.log(databdd)
    readUserData()
    var frame_obj = {
      type: C.FRAME_TYPE.ZIGBEE_TRANSMIT_REQUEST,
      destination64: "0013A20041C3475C",
      data: "#"+ databdd +"$"//"#05$"
    };
    xbeeAPI.builder.write(frame_obj);
  }, 100)
});

// All frames parsed by the XBee will be emitted here

// storage.listSensors().then((sensors) => sensors.forEach((sensor) => console.log(sensor.data())))

xbeeAPI.parser.on("data", function (frame) {

  //on new device is joined, register it

  //on packet received, dispatch event
  // let dataReceived = String.fromCharCode.apply(null, frame.data);
  if (C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET === frame.type) {
    //console.log("C.FRAME_TYPE.ZIGBEE_RECEIVE_PACKET");
    let dataReceived = String.fromCharCode.apply(null, frame.data);
    //console.log(dataReceived);

    firebase.database().ref('testvalue').child("direction").set(dataReceived, function(error) {
      if (error) {
        // The write failed...
        console.log("Failed with error: " + error)
      } else {
        // The write was successful...
        //console.log("success")
      }
    })
  }

  if (C.FRAME_TYPE.NODE_IDENTIFICATION === frame.type) {
    let dataReceived = String.fromCharCode.apply(null, frame.nodeIdentifier);
    console.log("NODE_IDENTIFICATION", dataReceived);
    //storage.registerSensor(frame.remote64)

  } else if (C.FRAME_TYPE.ZIGBEE_IO_DATA_SAMPLE_RX === frame.type) {

    console.log("ZIGBEE_IO_DATA_SAMPLE_RX")
    console.log(frame.analogSamples.AD0)
    //storage.registerSample(frame.remote64,frame.analogSamples.AD0 )

  } else if (C.FRAME_TYPE.REMOTE_COMMAND_RESPONSE === frame.type) {
    let data = String.fromCharCode.apply(null, frame.commandData)
    console.log("REMOTE_COMMAND_RESPONSE", data)
  } else {
    //console.debug(frame);
    let dataReceived = String.fromCharCode.apply(null, frame.commandData)
    //console.log(dataReceived);
  }

});
