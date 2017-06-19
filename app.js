var poet = require('./poem-generation/writePoem.js');
var express = require('express');
var app  = express();

// on the client => something to click that will send this request to the compose endpoint:

app.get('/compose', function(req, res) {
    poet.writePoem(14, function(result) {
      res.status(200).json(result);
      console.log('poem sent to client');
    });
});

// compose sends the text up to the client
// if the user hits save, then the client
// sends the text back to the server and:

app.post('/save', function(req, res) {
  // the text is thrown in the database
});

module.exports = app;

  // poet.writePoem(14);
  // fs.readFile('poem.txt', function(err, file) {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     var toSend = file.toString().split('\n');
  //     res.status(200).json(toSend);
  //   }
  // });