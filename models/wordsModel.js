const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  shortdef: {
    type: String,
  },
});

const WordInput = mongoose.model('WordInput', wordSchema);

module.exports = WordInput;
