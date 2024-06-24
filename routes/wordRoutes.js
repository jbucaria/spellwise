const express = require('express');
const wordController = require('../controllers/wordController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', wordController.checkId);

router
  .route('/')
  .get(authController.protect, wordController.getAllWords)
  .post(wordController.createWord);

router
  .route('/:id')
  .get(wordController.getWord)
  .patch(wordController.updateWord)
  .delete(wordController.deleteWord);

module.exports = router;
