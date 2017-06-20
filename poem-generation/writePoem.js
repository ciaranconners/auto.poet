var poetry = require('./poetry.js').poetry;
var fs = require('fs');
var querystring = require('querystring');
var req = require('request');

// generating a random poem is easy and can be a fun feature of the site;
// but having a desktop interface to cull these associations is my goal

// random.org query object:

var poet = {};

var getRandomIndex = function(dataset, callback) {
  var max = dataset.length - 1;
  var queryStringParams = {
    num: 1,
    min: 0,
    max: max,
    col: 1,
    base: 10,
    format: 'plain',
    rnd: 'new'
  };

  var query = querystring.stringify(queryStringParams);
  var url = 'https://www.random.org/integers/?' + query;
  var randomIdx = '';

  req.get(url)
    .on('error', function(err) {console.error(err);})
    .on('data', function(chunk) {
      randomIdx += chunk;
    })
    .on('end', function() {
      callback(randomIdx);
    });
};

poet.writePoem = function(numberOfLines, callback) {
  var result = []; // promise.all on the array

  for (let i = 0; i < numberOfLines; i++) {
    getRandomIndex(poetry, function(data) {
      var index = parseInt(data);
      getRandomIndex(poetry[index].text, function(data2) {
        if (poetry[index].text === undefined) {
          console.log('better try again');
        }
        var index2 = parseInt(data2);
        result.push(poetry[index].text[index2]);
        if (result.length === numberOfLines) {
          callback(result);
        }
      });
    });
  }
};

// getRandomIndex([1, 2, 3], function(idx) {console.log(idx);});

module.exports = poet;