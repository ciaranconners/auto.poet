var poet = require('./poem-generation/writePoem.js');
var express = require('express');
var bodyParser = require('body-parser');
var Poem = require('./db/models/Poem');
var db = require('./db/config');
var mongoose = require('mongoose');
var app  = express();

app.use(express.static(__dirname + '/public'));

var jsonParser = bodyParser.json();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// on the client => something to click that will send this request to the compose endpoint:

app.get('/compose', function(req, res) {
    var lines = parseInt(req.query.param1);
    //console.log(lines);
    poet.writePoem(lines, function(result) {
      res.status(200).json(result);
      console.log('GET: poem sent to client');
    });
});

// compose sends the text up to the client
// if the user hits save, then the client
// sends the text back to the server and:

app.post('/save', jsonParser, function(req, res) {
  console.log('POST: saving poem');
  res.sendStatus(201);
  Poem.findOne({poem: JSON.parse(req.body.poem)}).exec(function(err, found) {
    if (found) {
      console.log('poem already in the DB');
    } else {
       var newPoem = new Poem({poem: JSON.parse(req.body.poem)});
  newPoem.save(function(err){
    if (err) {
      console.error(err);
    } else {
      console.log('poem saved');
    }
  });
    }
  });





});

module.exports = app;

