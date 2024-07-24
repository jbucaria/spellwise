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

exports.account = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
    user: res.locals.user,
  });
};

exports.home = (req, res) => {
  res.status(200).render('home');
};

exports.signUp = (req, res) => {
  res.status(200).render('signUp', {
    title: 'Create account',
  });
};

exports.forgotPassword = (req, res) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot Password',
  });
};

exports.resetPassword = (req, res) => {
  res.status(200).render('resetPassword', {
    title: 'Reset Password',
  });
};
