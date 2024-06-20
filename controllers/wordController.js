const WordInput = require('../models/wordsModel');
const AppError = require('../public/utils/appError');
const catchAsync = require('../public/utils/catchAsync');

exports.getAllWords = catchAsync(async (req, res, next) => {
  const words = await WordInput.find();

  res.status(200).json({
    status: 'success',
    results: words.length,
    data: {
      words,
    },
  });
});

exports.getWord = catchAsync(async (req, res, next) => {
  const word = await WordInput.findById(req.params.id);

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
  const newWord = await WordInput.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      word: newWord,
    },
  });
});

exports.updateWord = catchAsync(async (req, res, next) => {
  const word = await WordInput.findByIdAndUpdate(req.params.id, req.body, {
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
  const word = await WordInput.findByIdAndDelete(req.params.id);

  if (!word) {
    return next(new AppError('No word found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
