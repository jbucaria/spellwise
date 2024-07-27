const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(authController.isLoggedIn);

router.get('/', viewController.home);
router.get('/login', viewController.getLogin);
router.get('/signup', viewController.signUp);
router.get('/forgotPassword', viewController.forgotPassword);

router.get('/resetPassword/:token', viewController.resetPassword);

router.get('/main', authController.isLoggedIn, viewController.main);
router.get('/account', authController.isLoggedIn, viewController.account);

module.exports = router;
