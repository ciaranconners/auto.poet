var poet = require('./poem-generation/writePoem.js');
var express = require('express');
var bodyParser = require('body-parser');
var Poem = require('./db/models/Poem');
var db = require('./db/config');
var mongoose = require('mongoose');
var app = express();

var nodemailer = require('nodemailer');

app.use(express.static(__dirname + '/public'));

var jsonParser = bodyParser.json();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/compose', function(req, res) {
  var lines = parseInt(req.query.param1);
  poet.writePoem(lines, function(result) {
    res.status(200).json(result);
    console.log('GET: poem sent to client');
  });
});

app.get('/retrieve', function(req, res) {
  var userEmail = req.query.email;
  res.sendStatus(200);

  Poem.find().exec(function(err, found) {

    if (err) {
      console.error(err);
    } else {
      var toSend = '';
      for (let x of found) {
        toSend += x.poem.join('\r\n') + '\r\n \r\n \r\n \r\n \r\n';
      }


      console.log('toSend', toSend);
      console.log('userEmail', userEmail);
      smtpTrans = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: "ciaranconners@gmail.com",
            pass: "Easter2016"
          }
        });
        smtpTrans.sendMail({
          from: 'ciaranconners@gmail.com',
          to: userEmail,
          subject: 'auto.poet',
          text: toSend
        }, function(err) {
            if (err) {
              console.error(err);
            } else {
              console.log('mail sent');
            }
        });
    }
  });
});

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



