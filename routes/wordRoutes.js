const express = require('express');
const wordController = require('../controllers/wordController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/your-endpoint', wordController.setActiveList);
router.get('/active-list', wordController.getActiveList);

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
