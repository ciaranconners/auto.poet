var db = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poemSchema = new Schema({
  poem: []
});

var Poem = mongoose.model('Poem', poemSchema);

module.exports = Poem;
