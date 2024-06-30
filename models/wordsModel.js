const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    requried: [true, 'Must provide a word'],
  },
  fl: {
    type: String,
    required: [true, 'Must provide Part of Speech'],
  },
  definition: {
    type: String,
    required: [true, 'Must provide a definition'],
  },
});

const WordInput = mongoose.model('WordInput', wordSchema);

module.exports = WordInput;
