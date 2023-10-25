const express = require('express');
const customerController = require('../controller/customerController');
const router = express.Router();

router.route('/signup').post(customerController.signUp);
router.route('/login').post(customerController.login);
module.exports = router;
