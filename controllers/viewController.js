const Word = require('../models/wordsModel');
const catchAsync = require('../utils/catchAsync');

exports.main = catchAsync(async (req, res) => {
  // 1) get words from collection
  const words = await Word.find();
  // 2) Build Template

  // 3) Render template
  res.status(200).render('main', {
    title: words,
    cardsData: words,
  });
});

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.addWord = (req, res) => {
  res.status(200).render('add-word');
};
exports.account = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
    user: res.locals.user,
  });
};

exports.submitWord = (req, res) => {
  res.status(200).render('submit');
};
exports.home = (req, res) => {
  res.status(200).render('home');
};
exports.signUp = (req, res) => {
  res.status(200).render('signUp', {
    title: 'Create account',
  });
};
exports.menu = (req, res) => {
  res.status(200).render('menu', {
    title: 'Create account',
  });
};
