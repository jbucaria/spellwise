const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.isLoggedIn);

router.get('/', viewController.home);
router.get('/login', viewController.getLogin);
router.get('/main', authController.isLoggedIn, viewController.main);
router.get('/account', authController.isLoggedIn, viewController.account);
router.get('/signup', viewController.signUp);
router.get('/submit', authController.isLoggedIn, viewController.submitWord);
// router.get('/home', viewController.home);
// router.get('/overview', viewController.overview);

module.exports = router;
