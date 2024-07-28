const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Word = require('../models/wordsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllWords = catchAsync(async (req, res, next) => {
  const words = await Word.find();

  res.status(200).json({
    status: 'success',
    results: words.length,
    data: {
      words,
    },
  });
});

exports.getWord = catchAsync(async (req, res, next) => {
  const word = await Word.findById(req.params.id).populate('userId');

  if (!word) {
    return next(new AppError('No word found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    results: word.length,
    data: {
      word,
    },
  });
});

exports.createWord = catchAsync(async (req, res, next) => {
  const decoded = await promisify(jwt.verify)(
    req.cookies.jwt,
    process.env.JWT_SECRET,
  );
  const id = decoded.id;

  // const { word } = req.body;

  // const existingWord = await Word.findOne({ word });

  // if (existingWord) {
  //   return res.status(400).json({
  //     status: 'fail',
  //     message: 'Word already exists',
  //   });
  // }
  req.body.userId = id;
  // Create the new word
  console.log(req.body);
  const newWord = await Word.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      word: newWord,
    },
  });
});

exports.updateWord = catchAsync(async (req, res, next) => {
  const word = await Word.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!word) {
    return next(new AppError('No word found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      word,
    },
  });
});

exports.deleteWord = catchAsync(async (req, res, next) => {
  const word = await Word.findByIdAndDelete(req.params.id);

  if (!word) {
    return next(new AppError('No word found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
