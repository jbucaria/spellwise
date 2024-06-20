const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, 'New word required'],
    unique: true,
  },
  def: {
    type: String,
  },
});

const WordInput = mongoose.model('WordInput', wordSchema);

module.exports = WordInput;
