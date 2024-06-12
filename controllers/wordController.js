const WordInput = require('../models/wordsModel');

exports.getAllWords = async (req, res) => {
  try {
    const words = await WordInput.find();

    res.status(200).json({
      status: 'success',
      results: words.length,
      data: {
        words,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getWord = async (req, res) => {
  try {
    const word = await WordInput.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      results: word.length,
      data: {
        word,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createWord = async (req, res) => {
  try {
    const newWord = await WordInput.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        word: newWord,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateWord = async (req, res) => {
  try {
    const word = await WordInput.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        word,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteWord = async (req, res) => {
  try {
    await WordInput.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
