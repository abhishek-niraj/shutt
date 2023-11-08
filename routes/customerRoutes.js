const express = require('express');
const customerController = require('../controller/customerController');
const authorization = require('../auth/verifyToken');
const router = express.Router();

router.route('/signup').post(customerController.signUp);
router.route('/login').post(customerController.login);
router
  .route('/updateDetails')
  .post(authorization.checkUser, customerController.updateCustomerDetails);
router.route('/send-otp').post(customerController.sendOtp);
module.exports = router;
