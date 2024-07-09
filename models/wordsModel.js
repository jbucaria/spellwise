const mongoose = require('mongoose');
const validator = require('validator');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    requried: [true, 'Must provide a word'],
    validate: [validator.isAlpha, 'Word must only contain letters'],
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

const WordInput = mongoose.model('words', wordSchema);

module.exports = WordInput;
