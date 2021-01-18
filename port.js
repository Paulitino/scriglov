const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
port = new SerialPort("/dev/tty.DSDTECHHC-05-DevB", { baudRate: 9600 })

var app = require('express')();

var http = require('http').createServer(app);

var error = false;
const parser = new Readline()

let result;


  port.pipe(parser)
  parser.on('data', function (data) {
    str = data.toString(); //Convert to string
    var elem = str.split(' ');
    var json = {'thumb': parseInt(elem[0], 10),
     'index': parseInt(elem[1], 10),
     'major' : parseInt(elem[2], 10),
     'annular': parseInt(elem[3], 10),
     'pinky': parseInt(elem[4], 10),
     'other' : parseInt(elem[5], 10),
     'gyro' : parseInt(elem[6], 10)
    }
    result = json
  })
    error = {'thumb': 'error',
     'index': "error",
     'major' : "error",
     'annular': "error",
     'pinky': "error",
     'other' : "error",
     'gyro' : "error"
    }


app.get('/', function(req, res){
    res.send(result);
  });
  
  http.listen(3000, function(){
    console.log('listening on *:3000');
  });

