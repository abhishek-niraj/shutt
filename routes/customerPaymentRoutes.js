const express = require('express');
const paymentAuthorization = require('../auth/paymentAuth');
const customerPaymentController = require('../controller/customerPaymentController');
const router = express.Router();

router
  .route('/')
  .post(
    paymentAuthorization.isValidPrice,
    customerPaymentController.addCustomerPayment
  );

module.exports = router;
