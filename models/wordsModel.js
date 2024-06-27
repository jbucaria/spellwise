const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: String,
  fl: {
    type: String,
  },
  definition: {
    type: String,
  },
});

const WordInput = mongoose.model('WordInput', wordSchema);

module.exports = WordInput;
