const express = require('express');
const wordController = require('../controllers/wordController');

const router = express.Router();

// router.param('id', wordController.checkId);

router
  .route('/')
  .get(wordController.getAllWords)
  .post(wordController.checkBody, wordController.createWord);

router
  .route('/:id')
  .get(wordController.getWord)
  .patch(wordController.updateWord)
  .delete(wordController.deleteWord);

module.exports = router;
