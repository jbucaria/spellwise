const mongoose = require('mongoose');
const validator = require('validator');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    requried: [true, 'Must provide a word'],
    validate: [validator.isAlpha, 'Word must only contain letters'],
  },
  definition: {
    type: [String],
    required: [true, 'Must provide a definition'],
  },
  audio: {
    type: String,
  },
  phonetic: {
    type: String,
  },
});

const WordInput = mongoose.model('words', wordSchema);

module.exports = WordInput;
