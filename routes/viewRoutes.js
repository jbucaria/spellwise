const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/login', viewController.getLogin);
router.get('/add', viewController.addWord);
router.get('/submit', viewController.submitWord);
router.get('/account', viewController.account);
router.get('/home', viewController.home);
router.get('/signin', viewController.signIn);

module.exports = router;
