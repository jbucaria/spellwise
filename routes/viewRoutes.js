const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewController.overview);
router.get('/login', viewController.getLogin);
router.get('/add', viewController.addWord);
router.get('/submit', authController.protect, viewController.submitWord);
router.get('/home', viewController.home);
router.get('/signup', viewController.signUp);

module.exports = router;
