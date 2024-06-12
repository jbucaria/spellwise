const WordInput = require('../models/wordsModel');

exports.getAllWords = (req, res) => {
  res.status(200).json({
    status: 'success',
    requested: req.requestTime,
    // data: {
    //   tours,
    // },
  });
};

exports.getWord = (req, res) => {
  console.log(req.params);
  // const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
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

exports.updateWord = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour>',
    },
  });
};

exports.deleteWord = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
