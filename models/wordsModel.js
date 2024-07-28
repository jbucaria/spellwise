const mongoose = require('mongoose');
const validator = require('validator');
// const User = require('./userModel');

const wordSchema = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  listName: {
    type: String,
    required: [true, 'Must provide a list name'],
  },
  word: {
    type: String,
    required: [true, 'Must provide a word'],
    validate: {
      validator: function (value) {
        return validator.isAlpha(value, 'en-US', { ignore: ' ' });
      },
      message: 'Word must only contain letters',
    },
  },
  definition: {
    type: String,
    required: [true, 'Must provide a definition'],
  },
  audio: {
    type: String,
  },
  phonetic: {
    type: String,
  },
});

//Populate User object
wordSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: 'name email',
  });
  next();
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
