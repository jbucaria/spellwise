const WordInput = require('../models/wordsModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.id || !req.body.shortdef) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

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

exports.createWord = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
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
